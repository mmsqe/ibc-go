package e2e

import (
	"context"
	"github.com/cosmos/ibc-go/v3/e2e/e2efee"
	"github.com/cosmos/ibc-go/v3/e2e/testsuite"
	"github.com/strangelove-ventures/ibctest/ibc"
	"github.com/strangelove-ventures/ibctest/test"
	"github.com/stretchr/testify/suite"
	"testing"
	"time"
)

func TestFeeMiddlewareTestSuite(t *testing.T) {
	suite.Run(t, new(FeeMiddlewareTestSuite))
}

type FeeMiddlewareTestSuite struct {
	testsuite.E2ETestSuite
}

func (s *FeeMiddlewareTestSuite) TestFeeMiddlewareAsyncMultipleSenders() {
	t := s.T()
	ctx := context.TODO()

	srcChain, dstChain := s.GetChains()

	relayer, srcChainChannelInfo := s.CreateRelayerAndChannel(ctx, e2efee.FeeMiddlewareChannelOptions())

	startingTokenAmount := int64(10_000_000)

	srcChainSenderOne := s.CreateUserOnSourceChain(ctx, startingTokenAmount)
	srcChainSenderTwo := s.CreateUserOnSourceChain(ctx, startingTokenAmount)
	dstChainWallet := s.CreateUserOnDestinationChain(ctx, startingTokenAmount)

	t.Run("Relayer wallets can be recovered", s.AssertRelayerWalletsCanBeRecovered(ctx, relayer))

	srcRelayerWallet, dstRelayerWallet, err := s.GetRelayerWallets(relayer)
	t.Run("Relayer wallets can be fetched", func(t *testing.T) {
		s.Req.NoError(err)
	})

	s.Req.NoError(test.WaitForBlocks(ctx, 10, srcChain, dstChain), "failed to wait for blocks")

	t.Run("Register Counter Party Payee", s.AssertCounterPartyPayeeCanBeRegistered(ctx, dstChain, dstRelayerWallet.Address, srcRelayerWallet.Address, srcChainChannelInfo.Counterparty.PortID, srcChainChannelInfo.Counterparty.ChannelID))
	t.Run("Verify Counter Party Payee", s.AssertCounterPartyPayeeCanBeVerified(ctx, dstChain, dstRelayerWallet.Address, srcChainChannelInfo.Counterparty.ChannelID, srcRelayerWallet.Address))
	t.Run("Test fee middleware with multiple senders", func(t *testing.T) {

		chain1WalletToChain2WalletAmount := ibc.WalletAmount{
			Address: dstChainWallet.Bech32Address(dstChain.Config().Bech32Prefix), // destination address
			Denom:   srcChain.Config().Denom,
			Amount:  10000,
		}

		var srcTx ibc.Tx

		t.Run("Test IBC transfer", func(t *testing.T) {
			t.Run("Send IBC transfer", func(t *testing.T) {
				var err error
				srcTx, err = srcChain.SendIBCTransfer(ctx, srcChainChannelInfo.ChannelID, srcChainSenderOne.KeyName, chain1WalletToChain2WalletAmount, nil)
				s.Req.NoError(err)
				s.Req.NoError(srcTx.Validate(), "source ibc transfer tx is invalid")
			})

			expected := startingTokenAmount - chain1WalletToChain2WalletAmount.Amount - srcChain.GetGasFeesInNativeDenom(srcTx.GasSpent)
			t.Run("Verify tokens have been escrowed", s.AssertSourceChainNativeBalance(ctx, srcChainSenderOne, expected))
		})

		t.Run("Test Packet Fees", func(t *testing.T) {

			recvFee := int64(50)
			ackFee := int64(25)
			timeoutFee := int64(10)

			t.Run("Pay packet fee", func(t *testing.T) {

				t.Run("Before paying packet fee there should be no incentivized packets", s.AssertEmptyPackets(ctx, srcChain, srcChainChannelInfo.PortID, srcChainChannelInfo.ChannelID))

				t.Run("Paying packet fee should succeed", func(t *testing.T) {
					s.Req.NoError(e2efee.PayPacketFee(ctx, srcChain, srcChainSenderOne.KeyName, srcChainChannelInfo.PortID, srcChainChannelInfo.ChannelID, 1, recvFee, ackFee, timeoutFee))
					// wait so that incentivised packets will show up
					time.Sleep(2 * time.Second)
				})

				t.Run("Paying packet fee with second sender should succeed", func(t *testing.T) {
					s.Req.NoError(e2efee.PayPacketFee(ctx, srcChain, srcChainSenderTwo.KeyName, srcChainChannelInfo.PortID, srcChainChannelInfo.ChannelID, 1, recvFee, ackFee, timeoutFee))
					// wait so that incentivised packets will show up
					time.Sleep(2 * time.Second)
				})

				// TODO: query method not umarshalling json correctly yet.
				//t.Run("After paying packet fee there should be incentivized packets", func(t *testing.T) {
				//	packets, err := srcChain.QueryPackets(ctx, "transfer", "channel-0")
				//	req.NoError(err)
				//	req.Len(packets.IncentivizedPackets, 1)
				//})

				expecteUserOneBal := startingTokenAmount - chain1WalletToChain2WalletAmount.Amount - srcChain.GetGasFeesInNativeDenom(srcTx.GasSpent) - recvFee - ackFee - timeoutFee
				t.Run("Balance from first sender should be lowered by sum of recv ack and timeout and IBC transfer amount", s.AssertSourceChainNativeBalance(ctx, srcChainSenderOne, expecteUserOneBal))

				expectedUserTwoBal := startingTokenAmount - recvFee - ackFee - timeoutFee
				t.Run("Balance from second sender should be lowered by sum of recv ack and timeout (not IBC transfer amount)", s.AssertSourceChainNativeBalance(ctx, srcChainSenderTwo, expectedUserTwoBal))
			})

			t.Run("Start relayer", func(t *testing.T) {
				s.StartRelayer(relayer)
			})

			s.Req.NoError(test.WaitForBlocks(ctx, 5, srcChain, dstChain), "failed to wait for blocks")

			t.Run("Packets should have been relayed", s.AssertEmptyPackets(ctx, srcChain, srcChainChannelInfo.PortID, srcChainChannelInfo.ChannelID))

			// once the relayer has relayed the packets, the timeout fee should be refunded.
			gasFee := srcChain.GetGasFeesInNativeDenom(srcTx.GasSpent)
			senderOneExpectedBal := startingTokenAmount - chain1WalletToChain2WalletAmount.Amount - gasFee - ackFee - recvFee
			t.Run("Verify timeout fee is refunded on successful relay of packets for first sender", s.AssertSourceChainNativeBalance(ctx, srcChainSenderOne, senderOneExpectedBal))

			senderTwoExpectedBal := startingTokenAmount - ackFee - recvFee
			t.Run("Verify timeout fee is refunded on successful relay of packets for second sender", s.AssertSourceChainNativeBalance(ctx, srcChainSenderTwo, senderTwoExpectedBal))
		})
	})
}

func (s *FeeMiddlewareTestSuite) TestFeeMiddlewareAsyncSingleSender() {
	t := s.T()
	ctx := context.TODO()

	srcChain, dstChain := s.GetChains()

	relayer, srcChainChannelInfo := s.CreateRelayerAndChannel(ctx, e2efee.FeeMiddlewareChannelOptions())

	startingTokenAmount := int64(10_000_000)

	srcChainWallet := s.CreateUserOnSourceChain(ctx, startingTokenAmount)
	dstChainWallet := s.CreateUserOnDestinationChain(ctx, startingTokenAmount)

	t.Run("Relayer wallets can be recovered", func(t *testing.T) {
		s.Req.NoError(s.RecoverRelayerWallets(ctx, relayer))
	})

	srcRelayerWallet, dstRelayerWallet, err := s.GetRelayerWallets(relayer)
	t.Run("Relayer wallets can be fetched", func(t *testing.T) {
		s.Req.NoError(err)
	})

	s.Req.NoError(test.WaitForBlocks(ctx, 10, srcChain, dstChain), "failed to wait for blocks")

	t.Run("Register Counter Party Payee", func(t *testing.T) {
		s.Req.NoError(e2efee.RegisterCounterPartyPayee(ctx, dstChain, dstRelayerWallet.Address, srcRelayerWallet.Address, srcChainChannelInfo.Counterparty.PortID, srcChainChannelInfo.Counterparty.ChannelID))
		// give some time for update
		time.Sleep(time.Second * 5)
	})

	t.Run("Verify Counter Party Payee", func(t *testing.T) {
		address, err := e2efee.QueryCounterPartyPayee(ctx, dstChain, dstRelayerWallet.Address, srcChainChannelInfo.Counterparty.ChannelID)
		s.Req.NoError(err)
		s.Req.Equal(srcRelayerWallet.Address, address)
	})

	chain1WalletToChain2WalletAmount := ibc.WalletAmount{
		Address: dstChainWallet.Bech32Address(dstChain.Config().Bech32Prefix), // destination address
		Denom:   srcChain.Config().Denom,
		Amount:  10000,
	}

	var srcTx ibc.Tx
	t.Run("Send IBC transfer", func(t *testing.T) {
		var err error
		srcTx, err = srcChain.SendIBCTransfer(ctx, srcChainChannelInfo.ChannelID, srcChainWallet.KeyName, chain1WalletToChain2WalletAmount, nil)
		s.Req.NoError(err)
		s.Req.NoError(srcTx.Validate(), "source ibc transfer tx is invalid")
	})

	t.Run("Verify tokens have been escrowed", func(t *testing.T) {
		actualBalance, err := s.GetSourceChainNativeBalance(ctx, srcChainWallet)
		s.Req.NoError(err)

		expected := startingTokenAmount - chain1WalletToChain2WalletAmount.Amount - srcChain.GetGasFeesInNativeDenom(srcTx.GasSpent)
		s.Req.Equal(expected, actualBalance)
	})

	recvFee := int64(50)
	ackFee := int64(25)
	timeoutFee := int64(10)

	t.Run("Pay packet fee", func(t *testing.T) {
		t.Run("Before paying packet fee there should be no incentivized packets", s.AssertEmptyPackets(ctx, srcChain, srcChainChannelInfo.PortID, srcChainChannelInfo.ChannelID))

		t.Run("Paying packet fee should succeed", func(t *testing.T) {
			s.Req.NoError(e2efee.PayPacketFee(ctx, srcChain, srcChainWallet.KeyName, srcChainChannelInfo.PortID, srcChainChannelInfo.ChannelID, 1, recvFee, ackFee, timeoutFee))

			// wait so that incentivised packets will show up
			time.Sleep(5 * time.Second)
		})

		// TODO: query method not umarshalling json correctly yet.
		//t.Run("After paying packet fee there should be incentivized packets", func(t *testing.T) {
		//	packets, err := srcChain.QueryPackets(ctx, "transfer", "channel-0")
		//	req.NoError(err)
		//	req.Len(packets.IncentivizedPackets, 1)
		//})
	})

	t.Run("Balance should be lowered by sum of recv ack and timeout", func(t *testing.T) {
		// The balance should be lowered by the sum of the recv, ack and timeout fees.
		actualBalance, err := s.GetSourceChainNativeBalance(ctx, srcChainWallet)
		s.Req.NoError(err)

		expected := startingTokenAmount - chain1WalletToChain2WalletAmount.Amount - srcChain.GetGasFeesInNativeDenom(srcTx.GasSpent) - recvFee - ackFee - timeoutFee
		s.Req.Equal(expected, actualBalance)
	})

	t.Run("Start relayer", func(t *testing.T) {
		s.StartRelayer(relayer)
	})

	s.Req.NoError(test.WaitForBlocks(ctx, 5, srcChain, dstChain), "failed to wait for blocks")

	t.Run("Packets should have been relayed", s.AssertEmptyPackets(ctx, srcChain, srcChainChannelInfo.PortID, srcChainChannelInfo.ChannelID))

	t.Run("Verify timeout fee is refunded on successful relay of packets", func(t *testing.T) {

		actualBalance, err := s.GetSourceChainNativeBalance(ctx, srcChainWallet)
		s.Req.NoError(err)

		gasFee := srcChain.GetGasFeesInNativeDenom(srcTx.GasSpent)
		// once the relayer has relayed the packets, the timeout fee should be refunded.
		expected := startingTokenAmount - chain1WalletToChain2WalletAmount.Amount - gasFee - ackFee - recvFee
		s.Req.Equal(expected, actualBalance)
	})
}

func (s *FeeMiddlewareTestSuite) TestFeeMiddlewareAsyncSingleSenderTimesOut() {
	t := s.T()
	ctx := context.TODO()

	srcChain, dstChain := s.GetChains()

	relayer, srcChainChannelInfo := s.CreateRelayerAndChannel(ctx, e2efee.FeeMiddlewareChannelOptions())

	startingTokenAmount := int64(10_000_000)

	srcChainWallet := s.CreateUserOnSourceChain(ctx, startingTokenAmount)
	dstChainWallet := s.CreateUserOnDestinationChain(ctx, startingTokenAmount)

	t.Run("Relayer wallets can be recovered", func(t *testing.T) {
		s.Req.NoError(s.RecoverRelayerWallets(ctx, relayer))
	})

	srcRelayerWallet, dstRelayerWallet, err := s.GetRelayerWallets(relayer)
	t.Run("Relayer wallets can be fetched", func(t *testing.T) {
		s.Req.NoError(err)
	})

	s.Req.NoError(test.WaitForBlocks(ctx, 10, srcChain, dstChain), "failed to wait for blocks")

	t.Run("Register Counter Party Payee", func(t *testing.T) {
		s.Req.NoError(e2efee.RegisterCounterPartyPayee(ctx, dstChain, dstRelayerWallet.Address, srcRelayerWallet.Address, srcChainChannelInfo.Counterparty.PortID, srcChainChannelInfo.Counterparty.ChannelID))
		// give some time for update
		time.Sleep(time.Second * 5)
	})

	t.Run("Verify Counter Party Payee", func(t *testing.T) {
		address, err := e2efee.QueryCounterPartyPayee(ctx, dstChain, dstRelayerWallet.Address, srcChainChannelInfo.Counterparty.ChannelID)
		s.Req.NoError(err)
		s.Req.Equal(srcRelayerWallet.Address, address)
	})

	chain1WalletToChain2WalletAmount := ibc.WalletAmount{
		Address: dstChainWallet.Bech32Address(dstChain.Config().Bech32Prefix), // destination address
		Denom:   srcChain.Config().Denom,
		Amount:  10000,
	}

	var srcTx ibc.Tx
	t.Run("Send IBC transfer", func(t *testing.T) {
		var err error
		srcTx, err = srcChain.SendIBCTransfer(ctx, srcChainChannelInfo.ChannelID, srcChainWallet.KeyName, chain1WalletToChain2WalletAmount, &ibc.IBCTimeout{
			NanoSeconds: 100, // want it to timeout immediately
		})
		s.Req.NoError(err)
		s.Req.NoError(srcTx.Validate(), "source ibc transfer tx is invalid")
		time.Sleep(1 * time.Second) // cause timeout
	})

	t.Run("Verify tokens have been escrowed (relayer has not yet picked up the packet)", func(t *testing.T) {
		actualBalance, err := s.GetSourceChainNativeBalance(ctx, srcChainWallet)
		s.Req.NoError(err)

		expected := startingTokenAmount - chain1WalletToChain2WalletAmount.Amount - srcChain.GetGasFeesInNativeDenom(srcTx.GasSpent)
		s.Req.Equal(expected, actualBalance)
	})

	recvFee := int64(50)
	ackFee := int64(25)
	timeoutFee := int64(10)

	t.Run("Pay packet fee", func(t *testing.T) {
		t.Run("Before paying packet fee there should be no incentivized packets", s.AssertEmptyPackets(ctx, srcChain, srcChainChannelInfo.PortID, srcChainChannelInfo.ChannelID))

		t.Run("Paying packet fee should succeed", func(t *testing.T) {
			s.Req.NoError(e2efee.PayPacketFee(ctx, srcChain, srcChainWallet.KeyName, srcChainChannelInfo.PortID, srcChainChannelInfo.ChannelID, 1, recvFee, ackFee, timeoutFee))

			// wait so that incentivised packets will show up
			time.Sleep(5 * time.Second)
		})

		// TODO: query method not umarshalling json correctly yet.
		//t.Run("After paying packet fee there should be incentivized packets", func(t *testing.T) {
		//	packets, err := srcChain.QueryPackets(ctx, "transfer", "channel-0")
		//	req.NoError(err)
		//	req.Len(packets.IncentivizedPackets, 1)
		//})
	})

	t.Run("Balance should be lowered by sum of recv ack and timeout", func(t *testing.T) {
		// The balance should be lowered by the sum of the recv, ack and timeout fees.
		actualBalance, err := s.GetSourceChainNativeBalance(ctx, srcChainWallet)
		s.Req.NoError(err)

		expected := startingTokenAmount - chain1WalletToChain2WalletAmount.Amount - srcChain.GetGasFeesInNativeDenom(srcTx.GasSpent) - recvFee - ackFee - timeoutFee
		s.Req.Equal(expected, actualBalance)
	})

	t.Run("Start relayer", func(t *testing.T) {
		s.StartRelayer(relayer)
	})

	s.Req.NoError(test.WaitForBlocks(ctx, 5, srcChain, dstChain), "failed to wait for blocks")

	t.Run("Funds recv and ack should be refunded as the packet timed out", func(t *testing.T) {
		actualBalance, err := s.GetSourceChainNativeBalance(ctx, srcChainWallet)
		s.Req.NoError(err)

		expected := startingTokenAmount - srcChain.GetGasFeesInNativeDenom(srcTx.GasSpent) - timeoutFee
		s.Req.Equal(expected, actualBalance)
	})
}

//  When packet is incentivized from single sender AND counterparty payee address is not set AND token transfer succeeds, then recv fees are refunded.
func (s *FeeMiddlewareTestSuite) TestFeeMiddlewareAsyncSingleSenderNoCounterPartyAddress() {
	t := s.T()
	ctx := context.TODO()

	srcChain, dstChain := s.GetChains()

	relayer, srcChainChannelInfo := s.CreateRelayerAndChannel(ctx, e2efee.FeeMiddlewareChannelOptions())

	startingTokenAmount := int64(10_000_000)

	srcChainWallet := s.CreateUserOnSourceChain(ctx, startingTokenAmount)
	dstChainWallet := s.CreateUserOnDestinationChain(ctx, startingTokenAmount)

	t.Run("Relayer wallets can be recovered", func(t *testing.T) {
		s.Req.NoError(s.RecoverRelayerWallets(ctx, relayer))
	})

	//srcRelayerWallet, dstRelayerWallet, err := s.GetRelayerWallets(relayer)
	//t.Run("Relayer wallets can be fetched", func(t *testing.T) {
	//	req.NoError(err)
	//})

	s.Req.NoError(test.WaitForBlocks(ctx, 10, srcChain, dstChain), "failed to wait for blocks")

	chain1WalletToChain2WalletAmount := ibc.WalletAmount{
		Address: dstChainWallet.Bech32Address(dstChain.Config().Bech32Prefix), // destination address
		Denom:   srcChain.Config().Denom,
		Amount:  10000,
	}

	var srcTx ibc.Tx
	t.Run("Send IBC transfer", func(t *testing.T) {
		var err error
		srcTx, err = srcChain.SendIBCTransfer(ctx, srcChainChannelInfo.ChannelID, srcChainWallet.KeyName, chain1WalletToChain2WalletAmount, nil)
		s.Req.NoError(err)
		s.Req.NoError(srcTx.Validate(), "source ibc transfer tx is invalid")
	})

	t.Run("Verify tokens have been escrowed", func(t *testing.T) {
		actualBalance, err := s.GetSourceChainNativeBalance(ctx, srcChainWallet)
		s.Req.NoError(err)

		expected := startingTokenAmount - chain1WalletToChain2WalletAmount.Amount - srcChain.GetGasFeesInNativeDenom(srcTx.GasSpent)
		s.Req.Equal(expected, actualBalance)
	})

	recvFee := int64(50)
	ackFee := int64(25)
	timeoutFee := int64(10)

	t.Run("Pay packet fee", func(t *testing.T) {
		t.Run("Before paying packet fee there should be no incentivized packets", s.AssertEmptyPackets(ctx, srcChain, srcChainChannelInfo.PortID, srcChainChannelInfo.ChannelID))

		t.Run("Paying packet fee should succeed", func(t *testing.T) {
			s.Req.NoError(e2efee.PayPacketFee(ctx, srcChain, srcChainWallet.KeyName, srcChainChannelInfo.PortID, srcChainChannelInfo.ChannelID, 1, recvFee, ackFee, timeoutFee))

			// wait so that incentivised packets will show up
			time.Sleep(5 * time.Second)
		})

		// TODO: query method not umarshalling json correctly yet.
		//t.Run("After paying packet fee there should be incentivized packets", func(t *testing.T) {
		//	packets, err := srcChain.QueryPackets(ctx, "transfer", "channel-0")
		//	req.NoError(err)
		//	req.Len(packets.IncentivizedPackets, 1)
		//})
	})

	t.Run("Balance should be lowered by sum of recv ack and timeout", func(t *testing.T) {
		// The balance should be lowered by the sum of the recv, ack and timeout fees.
		actualBalance, err := s.GetSourceChainNativeBalance(ctx, srcChainWallet)
		s.Req.NoError(err)

		expected := startingTokenAmount - chain1WalletToChain2WalletAmount.Amount - srcChain.GetGasFeesInNativeDenom(srcTx.GasSpent) - recvFee - ackFee - timeoutFee
		s.Req.Equal(expected, actualBalance)
	})

	t.Run("Start relayer", func(t *testing.T) {
		s.StartRelayer(relayer)
	})

	s.Req.NoError(test.WaitForBlocks(ctx, 5, srcChain, dstChain), "failed to wait for blocks")

	t.Run("Packets should have been relayed", s.AssertEmptyPackets(ctx, srcChain, srcChainChannelInfo.PortID, srcChainChannelInfo.ChannelID))

	t.Run("Verify timeout fee and recv fee are refunded on successful relay of packets when there is no counter party address", func(t *testing.T) {

		actualBalance, err := s.GetSourceChainNativeBalance(ctx, srcChainWallet)
		s.Req.NoError(err)

		gasFee := srcChain.GetGasFeesInNativeDenom(srcTx.GasSpent)
		// once the relayer has relayed the packets, the timeout fee should be refunded.
		expected := startingTokenAmount - chain1WalletToChain2WalletAmount.Amount - gasFee - ackFee
		s.Req.Equal(expected, actualBalance)
	})
}
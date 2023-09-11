package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	capabilitytypes "github.com/cosmos/cosmos-sdk/x/capability/types"

	"github.com/cosmos/ibc-go/v7/modules/apps/27-interchain-accounts/controller/types"
	icatypes "github.com/cosmos/ibc-go/v7/modules/apps/27-interchain-accounts/types"
	clienttypes "github.com/cosmos/ibc-go/v7/modules/core/02-client/types"
	channeltypes "github.com/cosmos/ibc-go/v7/modules/core/04-channel/types"
	host "github.com/cosmos/ibc-go/v7/modules/core/24-host"
)

// SendTx takes pre-built packet data containing messages to be executed on the host chain from an authentication module and attempts to send the packet.
// The packet sequence for the outgoing packet is returned as a result.
// If the base application has the capability to send on the provided portID. An appropriate
// absolute timeoutTimestamp must be provided. If the packet is timed out, the channel will be closed.
// In the case of channel closure, a new channel may be reopened to reconnect to the host chain.
//
// Deprecated: this is a legacy API that is only intended to function correctly in workflows where an underlying application has been set.
// Prior to to v6.x.x of ibc-go, the controller module was only functional as middleware, with authentication performed
// by the underlying application. For a full summary of the changes in v6.x.x, please see ADR009.
// This API will be removed in later releases.
// SendTx defines a rpc handler for MsgSendTx
func (k Keeper) SendTx(goCtx context.Context, msg *types.MsgSendTx) (*types.MsgSendTxResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	portID, err := icatypes.NewControllerPortID(msg.Owner)
	if err != nil {
		return nil, err
	}

	// the absolute timeout value is calculated using the controller chain block time + the relative timeout value
	// this assumes time synchrony to a certain degree between the controller and counterparty host chain
	absoluteTimeout := uint64(ctx.BlockTime().UnixNano()) + msg.RelativeTimeout
	seq, err := k.sendTx(ctx, msg.ConnectionId, portID, msg.PacketData, absoluteTimeout)
	if err != nil {
		return nil, err
	}

	return &types.MsgSendTxResponse{Sequence: seq}, nil
}

func (k Keeper) sendTx(ctx sdk.Context, connectionID, portID string, icaPacketData icatypes.InterchainAccountPacketData, timeoutTimestamp uint64) (uint64, error) {
	activeChannelID, found := k.GetOpenActiveChannel(ctx, connectionID, portID)
	if !found {
		return 0, sdkerrors.Wrapf(icatypes.ErrActiveChannelNotFound, "failed to retrieve active channel on connection %s for port %s", connectionID, portID)
	}

	chanCap, found := k.scopedKeeper.GetCapability(ctx, host.ChannelCapabilityPath(portID, activeChannelID))
	if !found {
		return 0, sdkerrors.Wrapf(capabilitytypes.ErrCapabilityNotFound, "failed to find capability: %s", host.ChannelCapabilityPath(portID, activeChannelID))
	}

	if uint64(ctx.BlockTime().UnixNano()) >= timeoutTimestamp {
		return 0, icatypes.ErrInvalidTimeoutTimestamp
	}

	if err := icaPacketData.ValidateBasic(); err != nil {
		return 0, sdkerrors.Wrap(err, "invalid interchain account packet data")
	}

	sequence, err := k.ics4Wrapper.SendPacket(ctx, chanCap, portID, activeChannelID, clienttypes.ZeroHeight(), timeoutTimestamp, icaPacketData.GetBytes())
	if err != nil {
		return 0, err
	}

	return sequence, nil
}

// OnTimeoutPacket removes the active channel associated with the provided packet, the underlying channel end is closed
// due to the semantics of ORDERED channels
func (k Keeper) OnTimeoutPacket(ctx sdk.Context, packet channeltypes.Packet) error {
	return nil
}

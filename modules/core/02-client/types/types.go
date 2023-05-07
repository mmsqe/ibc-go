package types

import codectypes "github.com/cosmos/cosmos-sdk/codec/types"

// ClientStateMsg is an interface that defines methods for getting and setting the client state of a message.
type ClientStateMsg interface {
	// GetClientState returns the byte slice representation of the client state included in the message.
	// Returns nil if the client state is not set.
	GetClientState() []byte

	// SetClientState sets the client state in the message to the given value.
	SetClientState(state *codectypes.Any)
}

// GetClientState returns the byte slice representation of the client state included in the create client message.
// Returns nil if the client state is not set.
func (m *MsgCreateClient) GetClientState() []byte {
	if m.ClientState == nil {
		return nil
	}
	return m.ClientState.Value
}

// SetClientState sets the client state in the create client message to the given value.
func (m *MsgCreateClient) SetClientState(state *codectypes.Any) {
	m.ClientState = state
}

// GetClientState returns the byte slice representation of the client state included in the upgrade client message.
// Returns nil if the client state is not set.
func (m *MsgUpgradeClient) GetClientState() []byte {
	if m.ClientState == nil {
		return nil
	}
	return m.ClientState.Value
}

// SetClientState sets the client state in the upgrade client message to the given value.
func (m *MsgUpgradeClient) SetClientState(state *codectypes.Any) {
	m.ClientState = state
}

// ConsensusStateMsg is an interface that defines methods for getting and setting the consensus state of a message.
type ConsensusStateMsg interface {
	// GetConsensusState returns the byte slice representation of the consensus state included in the message.
	// Returns nil if the consensus state is not set.
	GetConsensusState() []byte

	// SetConsensusState sets the consensus state in the message to the given value.
	SetConsensusState(state *codectypes.Any)
}

// GetConsensusState returns the byte slice representation of the consensus state included in the create client message.
// Returns nil if the consensus state is not set.
func (m *MsgCreateClient) GetConsensusState() []byte {
	if m.ConsensusState == nil {
		return nil
	}
	return m.ConsensusState.Value
}

// SetConsensusState sets the consensus state in the create client message to the given value.
func (m *MsgCreateClient) SetConsensusState(state *codectypes.Any) {
	m.ConsensusState = state
}

// GetConsensusState returns the byte slice representation of the consensus state included in the upgrade client message.
// Returns nil if the consensus state is not set.
func (m *MsgUpgradeClient) GetConsensusState() []byte {
	if m.ConsensusState == nil {
		return nil
	}
	return m.ConsensusState.Value
}

// SetConsensusState sets the consensus state in the upgrade client message to the given value.
func (m *MsgUpgradeClient) SetConsensusState(state *codectypes.Any) {
	m.ConsensusState = state
}
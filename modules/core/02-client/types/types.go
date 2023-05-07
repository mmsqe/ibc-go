package types

import codectypes "github.com/cosmos/cosmos-sdk/codec/types"

// Signer is an interface that defines a method for getting the address of the account that signed a message.
type Signer interface {
	// GetSigner returns the address of the account that signed the message.
	GetSigner() string
}

// GetSigner returns the address of the account that signed the message to create a client.
func (m *MsgCreateClient) GetSigner() string {
	return m.Signer
}

// GetSigner returns the address of the account that signed the message to update a client.
func (m *MsgUpdateClient) GetSigner() string {
	return m.Signer
}

// GetSigner returns the address of the account that signed the message to upgrade a client.
func (m *MsgUpgradeClient) GetSigner() string {
	return m.Signer
}

// GetSigner returns the address of the account that submitted the misbehaviour evidence.
func (m *MsgSubmitMisbehaviour) GetSigner() string {
	return m.Signer
}

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

// HeaderMsg is an interface that defines methods for getting and setting the header of a message.
type HeaderMsg interface {
	// GetHeader returns the byte slice representation of the header included in the message.
	// Returns nil if the header is not set.
	GetHeader() []byte

	// SetHeader sets the header in the message to the given value.
	SetHeader(header *codectypes.Any)
}

// GetHeader returns the byte slice representation of the header included in the update client message.
// Returns nil if the header is not set.
func (m *MsgUpdateClient) GetHeader() []byte {
	if m.Header == nil {
		return nil
	}
	return m.Header.Value
}

// SetHeader sets the header in the update client message to the given value.
func (m *MsgUpdateClient) SetHeader(header *codectypes.Any) {
	m.Header = header
}

// MisbehaviourMsg is an interface that defines methods for getting and setting the misbehaviour in a message.
type MisbehaviourMsg interface {
	// GetMisbehaviour returns the byte slice representation of the misbehaviour included in the message.
	// Returns nil if the misbehaviour is not set.
	GetMisbehaviour() []byte

	// SetMisbehaviour sets the misbehaviour in the message to the given value.
	SetMisbehaviour(misbehaviour *codectypes.Any)
}

// GetMisbehaviour returns the byte slice representation of the misbehaviour included in the submit misbehaviour message.
// Returns nil if the misbehaviour is not set.
func (m *MsgSubmitMisbehaviour) GetMisbehaviour() []byte {
	if m.Misbehaviour == nil {
		return nil
	}
	return m.Misbehaviour.Value
}

// SetMisbehaviour sets the misbehaviour in the submit misbehaviour message to the given value.
func (m *MsgSubmitMisbehaviour) SetMisbehaviour(misbehaviour *codectypes.Any) {
	m.Misbehaviour = misbehaviour
}

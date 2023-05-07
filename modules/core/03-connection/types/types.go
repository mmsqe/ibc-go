package types

import codectypes "github.com/cosmos/cosmos-sdk/codec/types"

// Signer is an interface that defines a method for getting the address of the account that signed a message.
type Signer interface {
	// GetSigner returns the address of the account that signed the message.
	GetSigner() string
}

// GetSigner returns the address of the account that signed the message to initialize a connection.
func (m *MsgConnectionOpenInit) GetSigner() string {
	return m.Signer
}

// GetSigner returns the address of the account that signed the message to try opening a connection.
func (m *MsgConnectionOpenTry) GetSigner() string {
	return m.Signer
}

// GetSigner returns the address of the account that signed the message to acknowledge a connection opening attempt.
func (m *MsgConnectionOpenAck) GetSigner() string {
	return m.Signer
}

// GetSigner returns the address of the account that signed the message to confirm a connection opening.
func (m *MsgConnectionOpenConfirm) GetSigner() string {
	return m.Signer
}

// GetClientState returns the byte slice representation of the client state included in the connection open try message.
// Returns nil if the client state is not set.
func (m *MsgConnectionOpenTry) GetClientState() []byte {
	if m.ClientState == nil {
		return nil
	}
	return m.ClientState.Value
}

// SetClientState sets the client state in the connection open try message to the given value.
func (m *MsgConnectionOpenTry) SetClientState(state *codectypes.Any) {
	m.ClientState = state
}

// GetClientState returns the byte slice representation of the client state included in the connection open acknowledgement message.
// Returns nil if the client state is not set.
func (m *MsgConnectionOpenAck) GetClientState() []byte {
	if m.ClientState == nil {
		return nil
	}
	return m.ClientState.Value
}

// SetClientState sets the client state in the connection open acknowledgement message to the given value.
func (m *MsgConnectionOpenAck) SetClientState(state *codectypes.Any) {
	m.ClientState = state
}

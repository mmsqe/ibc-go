package types

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

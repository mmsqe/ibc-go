package types

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

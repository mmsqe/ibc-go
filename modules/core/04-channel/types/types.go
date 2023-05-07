package types

// Signer is an interface that defines a method for getting the address of the account that signed a message.
type Signer interface {
	// GetSigner returns the address of the account that signed the message.
	GetSigner() string
}

// GetSigner returns the address of the account that signed the message to initialize a channel.
func (m *MsgChannelOpenInit) GetSigner() string {
	return m.Signer
}

// GetSigner returns the address of the account that signed the message to try opening a channel.
func (m *MsgChannelOpenTry) GetSigner() string {
	return m.Signer
}

// GetSigner returns the address of the account that signed the message to acknowledge a channel opening attempt.
func (m *MsgChannelOpenAck) GetSigner() string {
	return m.Signer
}

// GetSigner returns the address of the account that signed the message to confirm a channel opening.
func (m *MsgChannelOpenConfirm) GetSigner() string {
	return m.Signer
}

// GetSigner returns the address of the account that signed the message to initialize a channel close.
func (m *MsgChannelCloseInit) GetSigner() string {
	return m.Signer
}

// GetSigner returns the address of the account that signed the message to confirm a channel close.
func (m *MsgChannelCloseConfirm) GetSigner() string {
	return m.Signer
}

// GetSigner returns the address of the account that signed the message to receive a packet.
func (m *MsgRecvPacket) GetSigner() string {
	return m.Signer
}

// GetSigner returns the address of the account that signed the message to acknowledge receipt of a packet.
func (m *MsgAcknowledgement) GetSigner() string {
	return m.Signer
}

// GetSigner returns the address of the account that signed the message to indicate a packet timeout.
func (m *MsgTimeout) GetSigner() string {
	return m.Signer
}

// GetSigner returns the address of the account that signed the message to indicate a packet timeout on close.
func (m *MsgTimeoutOnClose) GetSigner() string {
	return m.Signer
}

import crypto from 'crypto'

export const encryptWithPublicKey = (publicKey, message) => {
  const bufferMessage = Buffer.from(message, 'utf-8')

  return crypto.publicEncrypt(publicKey, bufferMessage)
}

export const encryptWithPrivateKey = (publicKey, message) => {
  const bufferMessage = Buffer.from(message, 'utf-8')

  return crypto.privateEncrypt(publicKey, bufferMessage)
}

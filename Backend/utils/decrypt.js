import crypto from 'crypto'

export const decryptWithPrivateKey = (privateKey, message) => {
  const bufferMessage = Buffer.from(message, 'utf-8')

  return crypto.privateDecrypt(privateKey, bufferMessage)
}

export const decryptWithPublicKey = (publicKey, message) => {
  const bufferMessage = Buffer.from(message, 'utf-8')

  return crypto.publicDecrypt(publicKey, bufferMessage)
}

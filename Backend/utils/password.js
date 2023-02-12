import { randomBytes, pbkdf2Sync } from 'crypto'

export const GenerateSalt = async () => {
  return await randomBytes(16).toString('hex')
}

export const GeneratePassword = async (password, salt) => {
  return await pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
}

export const ValidatePassword = async (password, hash, salt) => {
  const latestHash = await pbkdf2Sync(
    password,
    salt,
    10000,
    512,
    'sha512'
  ).toString('hex')
  return hash === latestHash
}

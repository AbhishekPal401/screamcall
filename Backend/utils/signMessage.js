import crypto from 'crypto'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { encryptWithPrivateKey } from './encrypt.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const hash = crypto.createHash('sha256')

const data = {
  id: 1,
  name: 'dawdawdawd',
  lastname: 'dawdawdawd',
  password: 'dawdawdawd',
}

const stringData = JSON.stringify(data)

const logdata = hash.update(stringData)

const hashedData = hash.digest('hex')

const senderPrivateKey = fs.readFileSync(
  __dirname + '/id_rsa_private.pem',
  'utf-8'
)

const signedMessage = encryptWithPrivateKey(senderPrivateKey, hashedData)

const dataToSend = {
  algorithm: 'sha256',
  originalData: data,
  signedMessage: signedMessage,
}

export default dataToSend

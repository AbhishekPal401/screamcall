import crypto from 'crypto'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { decryptWithPublicKey } from './decrypt.js'
import data from './signMessage.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const hash = crypto.createHash(data.algorithm)

const hashedOriginalData = hash
  .update(JSON.stringify(data.originalData))
  .digest('hex')

const publicKey = fs.readFileSync(__dirname + '/id_rsa_public.pem', 'utf-8')

const decryptedMessage = decryptWithPublicKey(publicKey, data.signedMessage)

if (hashedOriginalData === decryptedMessage.toString()) {
  console.log('successfully verified the original message')
} else {
  console.log('error on verification of  original message')
}

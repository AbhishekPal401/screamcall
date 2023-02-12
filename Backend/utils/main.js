import fs from 'fs'
import { encryptWithPublicKey, encryptWithPrivateKey } from './encrypt.js'
import { decryptWithPrivateKey, decryptWithPublicKey } from './decrypt.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const publicKey = fs.readFileSync(__dirname + '/id_rsa_public.pem', 'utf-8')

const encryptedMessage = encryptWithPublicKey(publicKey, 'some secret message')

console.log(encryptedMessage.toString())

const privateKey = fs.readFileSync(__dirname + '/id_rsa_private.pem', 'utf-8')

const orginalmessage = decryptWithPrivateKey(privateKey, encryptedMessage)

console.log(orginalmessage.toString())

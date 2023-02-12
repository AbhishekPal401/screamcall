import crypto from 'crypto'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function generateKeypair() {
  const keypair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  })

  fs.writeFileSync(__dirname + '/id_rsa_public.pem', keypair.publicKey)
  fs.writeFileSync(__dirname + '/id_rsa_private.pem', keypair.privateKey)
}

generateKeypair()

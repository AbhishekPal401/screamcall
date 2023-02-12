import User from '../models/user.model.js'
import { STATUS_CODES } from '../utils/statusCode.js'
import { sendResult } from '../utils/sendResult.js'
import { ValidatePassword } from '../utils/password.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'
import jsonwebtoken from 'jsonwebtoken'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const pathToKey = path.join(__dirname, '..', 'id_rsa_private.pem')
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8')

class UserRepository {
  async createUser({
    firstname,
    lastname,
    dob,
    gender,
    role,
    salt,
    hash,
    email,
  }) {
    const isPresent = await checkIsEmailPresent(email)
    if (isPresent) {
      return sendResult(
        STATUS_CODES.BAD_REQUEST,
        false,
        null,
        'Email id already exists'
      )
    } else {
      const userData = new User({
        firstname,
        lastname,
        dob,
        email,
        gender,
        salt,
        hash,
        role,
      })

      let userResult = await userData.save()

      delete userResult.hash
      delete userResult.salt

      return sendResult(
        STATUS_CODES.CREATED,
        true,
        userResult,
        'User created successfully'
      )
    }
  }

  async validateUser({ email, password }) {
    if (email) {
      const userData = await User.findOne({ email, active: true })

      if (userData) {
        if (userData.hash && userData.salt && password) {
          const validationResult = await ValidatePassword(
            password,
            userData.hash,
            userData.salt
          )

          if (validationResult) {
            const token = await generateToken(userData)
            const data = {
              token: token,
            }
            return sendResult(
              STATUS_CODES.CREATED,
              true,
              data,
              'Logged in successfully'
            )
          } else {
            const data = null
            return sendResult(
              STATUS_CODES.BAD_REQUEST,
              true,
              data,
              'User or email is invalid'
            )
          }
        }
      } else {
        const data = null
        return sendResult(
          STATUS_CODES.BAD_REQUEST,
          true,
          data,
          'User or email is invalid'
        )
      }
    }
  }
}

async function checkIsEmailPresent(email) {
  const userDocument = await User.findOne({
    email: email,
  })

  if (userDocument) {
    return true
  } else {
    return false
  }
}

async function generateToken(userData) {
  const _id = userData._id

  const expiresIn = `${process.env.EXPIRESIN ? process.env.EXPIRESIN : '1d'}`

  const payload = {
    sub: _id,
    iat: Math.floor(Date.now() / 1000),
  }

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: 'RS256',
  })

  return signedToken
}
export default UserRepository

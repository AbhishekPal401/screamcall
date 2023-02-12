import fs from 'fs'
import path, { dirname } from 'path'
import passport from 'passport'
import passport_jwt from 'passport-jwt'
import User from '../models/user.model.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const pathToKey = path.join(__dirname, '..', 'id_rsa_public.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8')

const JwtStrategy = passport_jwt.Strategy
const ExtractJwt = passport_jwt.ExtractJwt

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
  ignoreExpiration: false,
}

// app.js will pass the global passport object here, and this function will configure it

const passportconfig = (passport) => {
  // The JWT payload is passed into the verify callback
  passport.use(
    new JwtStrategy(options, function (jwt_payload, done) {
      // We will assign the `sub` property on the JWT to the database ID of user
      User.findOne({ _id: jwt_payload.sub }, function (err, user) {
        // This flow look familiar?  It is the same as when we implemented
        // the `passport-local` strategy
        if (err) {
          console.log(err)
          return done(err, false)
        }
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      })
    })
  )
}

export default passportconfig

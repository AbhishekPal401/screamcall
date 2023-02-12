import express from 'express'
import bodyParser from 'body-parser'
import router from './routes/v1.application.js'
import { STATUS_CODES } from './utils/statusCode.js'
import passportConfig from './config/passport.js'
import passport from 'passport'

const app = express()

passportConfig(passport)

app.use(passport.initialize())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', router)

app.all('*', (req, res, next) => {
  res.status(STATUS_CODES.NOT_FOUND).json({
    status: false,
    data: null,
    message: `Cannot find ${req.originalUrl} on this server`,
  })
})

app.use((err, req, res, next) => {
  res.status(STATUS_CODES.BAD_REQUEST).json({
    status: false,
    data: null,
    message: err.message,
  })
})

export default app

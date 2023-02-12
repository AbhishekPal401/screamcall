import express from 'express'
import joi from 'joi'
import { roles } from '../config/roles.js'
import { STATUS_CODES } from '../utils/statusCode.js'
import UserApi from '../api/user.api.js'

const router = express.Router()
const userApi = new UserApi()

const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props,
}

router.post('/register', async (req, res, next) => {
  try {
    const schema = joi.object({
      firstname: joi.string().required(),
      lastname: joi.string().required(),
      email: joi.string().email().required(),
      gender: joi.string().valid('male', 'female', 'non-binary'),
      role: joi
        .string()
        .valid(...roles)
        .required(),
      dob: joi.date().required(),
      password: joi.string().required().min(6),
    })

    const { error, value } = schema.validate(req.body, options)

    if (error) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        status: false,
        data: null,
        message: error.details[0].message.replaceAll('"', ''),
      })
    } else {
      const { firstname, lastname, password, dob, gender, role, email } =
        req.body

      const result = await userApi.registerUser({
        firstname,
        lastname,
        email,
        password,
        dob,
        gender,
        role,
      })

      res.status(result.statusCode).json({
        status: result.status,
        data: result.data,
        message: result.message,
      })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const schema = joi.object({
      email: joi.string().email().required(),

      password: joi.string().required().min(6),
    })

    const { error, value } = schema.validate(req.body, options)
    if (error) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        status: false,
        data: null,
        message: error.details[0].message.replaceAll('"', ''),
      })
    } else {
      const { email, password } = req.body

      const result = await userApi.loginUser({
        email: email,
        password: password,
      })

      res.status(result.statusCode).json({
        status: result.status,
        data: result.data,
        message: result.message,
      })
    }
  } catch (error) {
    next(error)
  }
})

export default router

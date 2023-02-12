import express from 'express'
import passport from 'passport'

import UserController from '../controllers/user.controller.js'
const router = express.Router()

router.use('/user', UserController)
router.use(
  '/protected',
  (req, res, next) => {
    passport.authenticate('jwt', (err, user, message) => {
      try {
        if (user) {
          next()
        } else {
          res.status(200).json({
            status: false,
            data: null,
            message: `${message}`,
          })
        }
      } catch (error) {
        res.status(200).json({
          status: false,
          data: null,
          message: error.message,
        })
      }
    })(req, res)
  },

  (req, res, next) => {
    res.status(200).json({
      status: true,
      data: {
        test: 'test',
      },
      message: 'You are successfully authenticated to this route!',
    })
  }
)

export default router

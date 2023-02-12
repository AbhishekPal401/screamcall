import mongoose from 'mongoose'
import { roles } from '../config/roles.js'
import validator from 'validator'

const UserSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Please enter your first name'],
    },
    lastname: {
      type: String,
      required: [true, 'Please enter your last name'],
    },
    dob: {
      type: Date,
      default: new Date(),
    },
    email: {
      type: String,
      required: [true, 'Please enter your email address.'],
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please enter a valid email address.'],
      index: true,
    },
    gender: {
      type: String,
      default: 'male',
      enum: ['male', 'female', 'non-binary'],
    },
    salt: {
      type: String,
    },
    hash: {
      type: String,
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', UserSchema)

export default User

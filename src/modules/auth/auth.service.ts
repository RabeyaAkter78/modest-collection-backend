/* eslint-disable prettier/prettier */

import config from '../../config'
import { IUser } from '../user/user.interface'
import User from '../user/user.model'
import { ILoginUser } from './auth.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async (payload: IUser) => {
  const result = await User.create(payload)
  return result
}
const login = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload.email })

  if (!user) {
    throw new Error('User not found')
  }
  const userStatus = user?.userStatus
  if (userStatus === 'inactive') {
    throw new Error('User is inactive. Please contact admin.')
  }
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  )
  if (!isPasswordMatched) {
    throw new Error('Password is incorrect')
  }
  if (!config.jwt_secret) {
    throw new Error('JWT secret is not defined in configuration')
  }
  const token = jwt.sign(
    {
      email: user.email,
      role: user.role,
    },
    config.jwt_secret,
    { expiresIn: '1d' }
  )

  const verifiedUser = {
    name: user.name,
    email: user.email,
    role: user.role,
  }

  return {
    verifiedUser,
    token,
  }
}

export const AuthService = {
  register,
  login,
}

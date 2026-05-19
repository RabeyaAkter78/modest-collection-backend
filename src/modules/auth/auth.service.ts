/* eslint-disable prettier/prettier */

import config from '../../config'
import { envVers } from '../../config/env'
import { sendEmail } from '../../utils/sendEmail'
import { IUser } from '../user/user.interface'
import User from '../user/user.model'
import { ILoginUser, IResetPassword, IChangePassword } from './auth.interface'
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

const forgetPassword = async (email: string) => {
  const isUserExists = await User.findOne({ email })
  if (!isUserExists) {
    throw new Error('User not found')
  }
  const jwtPayload = {
    userId: isUserExists._id,
    email: isUserExists.email,
    role: isUserExists.role,
  }

  const resetToken = jwt.sign(jwtPayload, config.jwt_secret!, {
    expiresIn: '1d',
  })
  const resetUILink = `${envVers.FRONTEND_URL}/reset-password?id=${isUserExists._id}&token=${resetToken}`

  sendEmail({
    to: isUserExists.email,
    subject: 'Reset Password',
    templateName:"forgetPassword",
    templateData: {
      name: isUserExists.name,
      resetUILink,
    },
  })
}

const resetPassword = async (payload: IResetPassword) => {
  let decoded;
  try {
    decoded = jwt.verify(payload.token, config.jwt_secret!) as jwt.JwtPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }

  const { userId } = decoded;
  if (userId !== payload.id) {
    throw new Error('Unauthorized request!');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  if (user.userStatus === 'inactive') {
    throw new Error('User is inactive. Please contact admin.');
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await User.findByIdAndUpdate(
    userId,
    { password: hashedPassword },
    { new: true }
  );

  return result;
};

const changePassword = async (userEmail: string, payload: IChangePassword) => {
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new Error('User not found');
  }
  if (user.userStatus === 'inactive') {
    throw new Error('User is inactive. Please contact admin.');
  }
  const isPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    user.password
  );
  if (!isPasswordMatched) {
    throw new Error('Old password is incorrect');
  }
  
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await User.findByIdAndUpdate(
    user._id,
    { password: hashedPassword },
    { new: true }
  );

  return result;
};

export const AuthService = {
  register,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
};

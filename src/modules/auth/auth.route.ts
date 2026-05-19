/* eslint-disable prettier/prettier */
import { Router } from 'express'
import { AuthController } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { userValidation } from '../user/userValidation'
import { AuthValidation } from './auth.validation'
import auth from '../../middlewares/auth'

const authRoute = Router()

authRoute.post(
  '/register',
  validateRequest(userValidation.userValidationSchema),
  AuthController.register
)

authRoute.post('/login',validateRequest(AuthValidation.loginValidationSchema),AuthController.login)
authRoute.post('/forgot-password', AuthController.forgetPassword)

authRoute.post(
  '/reset-password',
  validateRequest(AuthValidation.resetPasswordSchema),
  AuthController.resetPassword
)

authRoute.post(
  '/change-password',
  auth('user', 'admin'),
  validateRequest(AuthValidation.changePasswordSchema),
  AuthController.changePassword
)

export default authRoute

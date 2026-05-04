/* eslint-disable prettier/prettier */
import { Router } from 'express'
import { AuthController } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { userValidation } from '../user/userValidation'
import { AuthValidation } from './auth.validation'

const authRoute = Router()

authRoute.post(
  '/register',
  validateRequest(userValidation.userValidationSchema),
  AuthController.register
)

authRoute.post('/login',validateRequest(AuthValidation.loginValidationSchema),AuthController.login)
// forget password and reset password routes can be added here in the future:
authRoute.post('/forget-password',AuthController.forgetPassword)


export default authRoute

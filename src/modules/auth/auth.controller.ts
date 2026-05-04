/* eslint-disable prettier/prettier */
import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import { AuthService } from './auth.service'

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body)
  sendResponse(res, {
    status: true,
    StatusCode: StatusCodes.CREATED,
    message: 'User created successfully',
    data: result,
  })
})

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body)
  sendResponse(res, {
    status: true,
    StatusCode: StatusCodes.CREATED,
    message: 'User created successfully',
    token: result.token,
    data: result.verifiedUser,
  })
})
const forgetPassword = catchAsync(async (req: Request, res: Response) => {
 const {email}=req.body
  await AuthService.forgetPassword(email)
  sendResponse(res, {
    status: true,
    StatusCode: StatusCodes.CREATED,
    message: 'Email sent successfully',
    
      data:null,
  })
})
export const AuthController = {
  register,
  login,
  forgetPassword,
}

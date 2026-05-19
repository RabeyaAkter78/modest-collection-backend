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
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.resetPassword(req.body)
  sendResponse(res, {
    status: true,
    StatusCode: StatusCodes.OK,
    message: 'Password reset successfully',
    data: result,
  })
})

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user.email
  const result = await AuthService.changePassword(userEmail, req.body)
  sendResponse(res, {
    status: true,
    StatusCode: StatusCodes.OK,
    message: 'Password changed successfully',
    data: result,
  })
})

export const AuthController = {
  register,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
}

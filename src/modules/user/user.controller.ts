/* eslint-disable prettier/prettier */
// req and response manage kore:

import { userService } from './user.service'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'

const createUser = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await userService.createUser(payload)

  sendResponse(res, {
    StatusCode: StatusCodes.CREATED,
    message: 'User Created Successfully',
    data: result,
  })
})

const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUsers()
  sendResponse(res, {
    StatusCode: StatusCodes.OK,
    message: 'User Get Successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  const result = await userService.getSingleUser(userId)
  sendResponse(res, {
    StatusCode: StatusCodes.OK,
    message: 'User Get Successfully',
    data: result,
  })
})

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  const body = req.body

  const result = await userService.updateUser(userId, body)
  sendResponse(res, {
    StatusCode: StatusCodes.OK,
    message: 'User Updated Successfully',
    data: result,
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.userId

  await userService.deleteUser(userId)
  res.send({
    status: true,
    message: 'User Deleted Successfully',
    result: {},
  })
})

export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
}

/* eslint-disable prettier/prettier */
import { Response } from 'express'

type TSuccessResponse<T> = {
  status?: boolean
  StatusCode: number
  message: string
  token?: string
  data: T | T[] | null
}

const sendResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
  res.status(data.StatusCode).json({
    status: true,
    statusCode: data.StatusCode,
    message: data.message,
    token: data.token,
    data: data.data,
  })
}

export default sendResponse

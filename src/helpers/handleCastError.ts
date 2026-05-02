/* eslint-disable prettier/prettier */
import { Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleCastError = (err: any, res: Response) => {
  res.status(400).json({
    success: false,
    name: err.name,
    message: err.message,
    error: err,
  })
}

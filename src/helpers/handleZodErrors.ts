/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { Response } from 'express'

export const hnadleZodError = (err: any, res: Response) => {
  const issues = err.issues.map((item: any) => {
    return {
      path: item.path.join('>'),
      message: item.message,
    }
  })
  res.status(400).json({
    success: false,
    messgae: err.message,
    issues: issues,
    error: err,
  })
}

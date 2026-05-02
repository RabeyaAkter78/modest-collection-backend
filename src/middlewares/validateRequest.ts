/* eslint-disable prettier/prettier */
import { ZodObject } from 'zod'
import catchAsync from '../utils/catchAsync'
import { NextFunction, Request, Response } from 'express'

const validateRequest = (schema: ZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync(req.body)
    next()
  })
}

export default validateRequest

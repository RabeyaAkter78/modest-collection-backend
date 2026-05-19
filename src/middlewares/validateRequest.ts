import { ZodObject } from 'zod'
import catchAsync from '../utils/catchAsync'
import { NextFunction, Request, Response } from 'express'

const validateRequest = (schema: ZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      query: req.query,   // ✅ add this
      params: req.params, // ✅ add this
    })
    next()
  })
}

export default validateRequest
/* eslint-disable prettier/prettier */
import { z } from 'zod'

const userValidationSchema = z.object({
  // name: z.object({
  //   first: z
  //     .string()
  //     .nonempty('First name must be provided and must be a string'),
  //   last: z
  //     .string()
  //     .nonempty('Last name must be provided and must be a string'),
  // }),
  name: z.string().nonempty('Name is required').min(3).max(100),

  age: z
    .number()
    .int('Age must be an integer')
    .positive('Age must be a positive number')
    .optional(),

  email: z.string().email('Email must be a valid email address'),
  password: z.string().nonempty('Password is required'),

  photo: z.string().optional(),
})

export const userValidation = {
  userValidationSchema,
}

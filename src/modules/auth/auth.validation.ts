/* eslint-disable prettier/prettier */
import z from 'zod'

const loginValidationSchema = z.object({
  email: z.string().nonempty('Email is required').email(),
  password: z.string().nonempty('Password is required'),
})

// const forgetPasswordSchema = z.object({
//   body: z.object({
//     email: z.string().nonempty('Email is required').email(),
//   }),
// })
const forgetPasswordSchema = z.object({
  email: z.string().nonempty('Email is required').email(),
})

const resetPasswordSchema = z.object({
  id: z.string().nonempty('id is required'),
  token: z.string().nonempty('Token is required'),
  password: z.string().nonempty('Password is required'),
})

export const AuthValidation = {
  loginValidationSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
}

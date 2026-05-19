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
  query: z.object({
    id: z.string().nonempty('id is required'),
    token: z.string().nonempty('Token is required'),
  }),
  body: z.object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password is required'),
  }),
})

const changePasswordSchema = z.object({
  oldPassword: z.string().nonempty('Old password is required'),
  newPassword: z.string().nonempty('New password is required'),
})

export const AuthValidation = {
  loginValidationSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
}

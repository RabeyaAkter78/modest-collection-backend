/* eslint-disable prettier/prettier */
export interface ILoginUser {
  email: string
  password: string
}

export interface IResetPassword {
  id: string
  token: string
  password: string
}

export interface IChangePassword {
  oldPassword: string
  newPassword: string
}

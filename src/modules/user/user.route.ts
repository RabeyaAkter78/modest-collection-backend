/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response, Router } from 'express'
import { userController } from './user.controller'
import { userValidation } from './userValidation'
import auth from '../../middlewares/auth'

const userRoutes = Router()

userRoutes.post(
  // '/create-user',
  '/create-admin',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedBody = await userValidation.userValidationSchema.parseAsync(
        req.body
      )
      req.body = parsedBody
      // console.log({ parsedBody })
      next()
    } catch (error) {
      next(error)
    }
  },
  userController.createUser
)
userRoutes.get('/:userId', userController.getSingleUser)
userRoutes.put('/:userId', userController.updateUser)
userRoutes.delete('/:userId', userController.deleteUser)

// Authorization example:

// userRoutes.get('/', auth('admin', 'user'), userController.getUser)
userRoutes.get('/', auth('admin'), userController.getUser)

export default userRoutes

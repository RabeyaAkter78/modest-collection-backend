/* eslint-disable prettier/prettier */
import express, { Request, Response } from 'express'
import { globalErrorHandlers } from './middlewares/globalErrorHandlers'
import authRoute from './modules/auth/auth.route'
import userRoutes from './modules/user/user.route'
const app = express()
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/user', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server is live',
  })
})

// Global Error Handler:
app.use(globalErrorHandlers)
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route Not Found',
  })
})

export default app

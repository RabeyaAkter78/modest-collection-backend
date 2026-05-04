/* eslint-disable prettier/prettier */
import dotenv from 'dotenv'
dotenv.config()

interface EnvConfig {
  FRONTEND_URL: string
  EMAIL_SENDER: {
    SMTP_HOST: string
    SMTP_PORT: string
    SMTP_USER: string
    SMTP_PASSWORD: string
    SMTP_FROM: string
  }
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables: string[] = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASSWORD',
    'SMTP_FROM',
    "FRONTEND_URL",
  ]

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`)
    }
  })


  return {
    EMAIL_SENDER: {
      SMTP_HOST: process.env.SMTP_HOST as string,
      SMTP_PORT: process.env.SMTP_PORT as string,
      SMTP_USER: process.env.SMTP_USER as string,
      SMTP_PASSWORD: process.env.SMTP_PASSWORD as string,
      SMTP_FROM: process.env.SMTP_FROM as string,

    },
    FRONTEND_URL: process.env.FRONTEND_URL as string
  }
}

export const envVers = loadEnvVariables()

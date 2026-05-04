/* eslint-disable prettier/prettier */
import nodemailer from 'nodemailer'
import { envVers } from '../config/env'
import path from 'path'
import ejs from 'ejs'
const Transporter = nodemailer.createTransport({
  secure: true,
  auth: {
    user: envVers.EMAIL_SENDER.SMTP_USER,
    pass: envVers.EMAIL_SENDER.SMTP_PASSWORD,
  },
  port: Number(envVers.EMAIL_SENDER.SMTP_PORT),
  host: envVers.EMAIL_SENDER.SMTP_HOST,
})

interface IsendEmail {
  to: string
  subject: string
  templateName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  templateData?: Record<string, any>
  attachments?: {
    filename: string
    content: Buffer | string
    contentType: string
  }[]
}

export const sendEmail = async ({
  to,
  subject,
  templateName,
  templateData,
  attachments,
}: IsendEmail) => {
  try {
    const templatePath = path.join(
      __dirname,
      `../templates/${templateName}.ejs`
    )
    const html = await ejs.renderFile(templatePath, templateData)
    const info = await Transporter.sendMail({
      from: envVers.EMAIL_SENDER.SMTP_FROM,
      to: to,
      subject: subject,
      html: html,
      attachments: attachments?.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType,
      })),
    })
    console.log(`\u2709\uFE0F Email sent to ${to} ${info.messageId}`)
  } catch (error) {
    console.log('error in sendEmail', error)
    throw new Error('Error in sending email')
  }
}

import { NextApiRequest, NextApiResponse } from 'next'
import { createTransport } from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') res.status(404).send('')

  try {
    const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}&response=${req.body.token}`
    })
    const recaptchaResJson = await recaptchaRes.json();

    if (!recaptchaResJson.success) {
      res.status(400).send('')
    }

    const transporter = createTransport({
      host: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      replyTo: req.body.email,
      subject: '【RSS愛好会】お問い合わせ',
      text: req.body.message,
    })
    res.status(201).send('')
  } catch (error) {
    res.status(500).send(error)
  }
}

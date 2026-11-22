import type { NextApiRequest, NextApiResponse } from 'next'
import { createTransport } from 'nodemailer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(404).send('')

  try {
    const turnstileRes = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY ?? '',
          response: req.body.token ?? ''
        })
      }
    )
    const turnstileResJson = await turnstileRes.json()

    if (!turnstileResJson.success) return res.status(400).send('')

    const transporter = createTransport({
      host: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      replyTo: req.body.email,
      subject: '【RSS愛好会】お問い合わせ',
      text: req.body.message
    })
    res.status(201).send('')
  } catch (error) {
    res.status(500).send(error)
  }
}

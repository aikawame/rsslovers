import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(404).send('')

  try {
    const { price } = req.query
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env[`STRIPE_PRICE_${price}`],
          quantity: 1
        }
      ],
      mode: 'subscription',
      success_url: `${req.headers.origin}/thanks`,
      cancel_url: `${req.headers.origin}/support`
    })
    res.redirect(303, session.url!)
  } catch (err: any) {
    res.status(500).json(err.message)
  }
}

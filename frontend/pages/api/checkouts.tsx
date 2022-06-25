import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const PRICE_IDS = {
  100: process.env.STRIPE_PRICE_100,
  300: process.env.STRIPE_PRICE_300,
  1000: process.env.STRIPE_PRICE_1000,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') res.status(404).send('')

  try {
    const { price } = req.query
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2020-08-27'
    })
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: PRICE_IDS[price],
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.origin}/thanks`,
      cancel_url: `${req.headers.origin}/support`,
    });
    res.redirect(303, session.url);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
}

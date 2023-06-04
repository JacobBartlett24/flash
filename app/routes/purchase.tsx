import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Elements, PaymentElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { createPaymentIntent } from 'utils/payment.server'

export const loader = async ({ request, params }: LoaderArgs) => {
  const paymentIntent = await createPaymentIntent()

  return {
    envKey: process.env.STRIPE_KEY!,
    paymentIntent: paymentIntent,
  }
}

export default function Purchase() {
  const { envKey, paymentIntent } = useLoaderData()
  const stripePromise = loadStripe(envKey)

  return (
    <div className="purchasePage">
      <div className="sidebar">
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: paymentIntent.client_secret! }}
        >
          <PaymentElement />
        </Elements>
      </div>
    </div>
  )
}

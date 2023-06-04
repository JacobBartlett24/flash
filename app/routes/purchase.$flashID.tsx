import type { LinksFunction, LoaderArgs } from '@remix-run/node'

import { useLoaderData, useOutletContext } from '@remix-run/react'
import { Elements, PaymentElement } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { createPaymentIntent } from 'utils/payment.server'
import styles from '~/styles/PurchasePage.css'
import createServerSupabase from 'utils/supabase.server'
import { SupabaseOutletContext } from '~/root'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export const loader = async ({ request, params }: LoaderArgs) => {
  const paymentIntent = await createPaymentIntent()

  const flashID = params.flashID
  console.log(flashID)
  const response = new Response()
  const supabase = createServerSupabase({ request, response })
  const { data, error } = await supabase
    .from('Flash')
    .select()
    .eq('id', flashID)
    .single()

  return {
    envKey: process.env.STRIPE_KEY!,
    paymentIntent: paymentIntent,
    userFlash: data!,
  }
}

export default function Purchase() {
  const { envKey, paymentIntent, userFlash } = useLoaderData<typeof loader>()
  const stripePromise = loadStripe(envKey)
  const { supabase } = useOutletContext<SupabaseOutletContext>()

  const appearance = {
    theme: 'flat',
    variables: {
      fontFamily: ' "Gill Sans", sans-serif',
      fontLineHeight: '1.5',
      borderRadius: '10px',
      colorBackground: '#F6F8FA',
      colorPrimaryText: '#262626',
    },
    rules: {
      '.Block': {
        backgroundColor: 'var(--colorBackground)',
        boxShadow: 'none',
        padding: '12px',
      },
      '.Input': {
        padding: '12px',
      },
      '.Input:disabled, .Input--invalid:disabled': {
        color: 'lightgray',
      },
      '.Tab': {
        padding: '10px 12px 8px 12px',
        border: 'none',
      },
      '.Tab:hover': {
        border: 'none',
        boxShadow:
          '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)',
      },
      '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
        border: 'none',
        backgroundColor: '#fff',
        boxShadow:
          '0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)',
      },
      '.Label': {
        fontWeight: '500',
      },
    },
  }

  return (
    <div className="purchasePage">
      <div className="itemDesc">
        <h1 className="title">{userFlash.name}</h1>
        {
          <img
            src={
              supabase.storage
                .from('flash')
                .getPublicUrl(userFlash.img_filepath as string).data.publicUrl
            }
            alt={userFlash.description!}
          />
        }
        <div className="itemInfo">
          <p className="desc">{userFlash.description}</p>
          <p className="price">${userFlash.price}</p>
        </div>
      </div>
      <div className="sidebar">
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntent.client_secret!,
            appearance: appearance,
          }}
        >
          <PaymentElement />
        </Elements>
      </div>
    </div>
  )
}

import type { ActionArgs, LinksFunction, LoaderArgs } from '@remix-run/node'
import type { Option } from '~/components/Listbox'
import type { SupabaseOutletContext } from '~/root'

import { json, redirect } from '@remix-run/node'
import { Form, useLoaderData, useOutletContext } from '@remix-run/react'
import createServerSupabase from 'utils/supabase.server'
import MyListbox from '~/components/Listbox'
import Tags from '~/components/Tags'
import styles from '~/styles/FlashSplatRoute.css'
import { createPaymentIntent } from 'utils/payment.server'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export const action = async ({ request, params }: ActionArgs) => {
  return redirect(`/purchase/${params.flashId}`)
}

export const loader = async ({ request, params }: LoaderArgs) => {
  const flashID = params.flashId

  const response = new Response()
  const supabase = createServerSupabase({ request, response })
  const paymentIntent = await createPaymentIntent()
  const { data } = await supabase
    .from('Flash')
    .select()
    .eq('id', flashID)
    .single()

  return {
    userFlash: data!,
    envKey: process.env.STRIPE_KEY!,
    paymentIntent: paymentIntent,
  }
}

export function ErrorBoundary({ error }) {
  return (
    <html>
      <head>
        <title>Oh no!</title>
      </head>
      <body className="errorBoundary">
        <h1>Image not found</h1>
      </body>
    </html>
  )
}

const sizes = [
  { id: 1, name: '4x4 in', unavailable: false },
  { id: 2, name: '6x4 in', unavailable: false },
  { id: 3, name: '6x6 in', unavailable: false },
  { id: 4, name: '8x6 in', unavailable: true },
  { id: 5, name: '8x8 in', unavailable: false },
  { id: 6, name: 'Other', unavailable: false },
] as Option[]

//

export default function Flash() {
  const { supabase } = useOutletContext<SupabaseOutletContext>()
  const { userFlash } = useLoaderData<typeof loader>()

  return (
    <>
      <div className="soloDisplay">
        <div className="media">
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
        </div>
        <Form method="post">
          <div className="info">
            <h1>{userFlash.name}</h1>
            <p>{userFlash.description}</p>
            <p>${userFlash.price}</p>
            <Tags tags={userFlash.tags} />
            <MyListbox options={sizes} />
            <button className="purchaseButton">Purchase</button>
            {/* <Elements
              stripe={stripePromise}
              options={{ clientSecret: paymentIntent.client_secret! }}
            >
              <PaymentElement />
            </Elements> */}
          </div>
        </Form>
      </div>
    </>
  )
}

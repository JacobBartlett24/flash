import type { ActionArgs, LinksFunction, LoaderArgs } from '@remix-run/node'
import type { SupabaseClient } from '@supabase/auth-helpers-remix'
import type { Database } from 'db_types'

import {
  Form,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRevalidator,
} from '@remix-run/react'
import { json, redirect } from '@remix-run/node'
import { createBrowserClient } from '@supabase/auth-helpers-remix'
import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

import Header from './components/Header'
import createServerSupabase from 'utils/supabase.server'
import headerStyles from '~/styles/Header.css'
import styles from '~/styles/Root.css'

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: headerStyles },
  ]
}

export const loader = async ({ request }: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  }
  const stripePromise = loadStripe(process.env.STRIPE_KEY!)

  const response = new Response()
  const supabase = createServerSupabase({ request, response })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return json(
    {
      env,
      session,
      stripePromise,
    },
    {
      headers: response.headers,
    }
  )
}

type TypedSupabaseClient = SupabaseClient<Database>

export type SupabaseOutletContext = {
  supabase: TypedSupabaseClient
}

export async function action({ request }: ActionArgs) {
  const response = new Response()
  const supabase = createServerSupabase({ request, response })

  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log(error)
    return redirect('/')
  } else return redirect('/')
}

export default function App() {
  const { env, session } = useLoaderData()
  const revalidator = useRevalidator()

  const [supabase] = useState(() =>
    createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  )

  const serverAccessToken = session?.access_token

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log('error')
    }
  }

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverAccessToken) {
        revalidator.revalidate()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [serverAccessToken])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Form method="post">
          <Header session={session} handleLogout={handleLogout} />
        </Form>
        <Outlet context={{ supabase }} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

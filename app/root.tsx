import { cssBundleHref } from "@remix-run/css-bundle";
import { LinksFunction, LoaderArgs, json } from "@remix-run/node";
import styles from "~/styles/Root.css";
import headerStyles from "~/styles/Header.css";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRevalidator,
} from "@remix-run/react";
import Header from "./components/Header";
import { createBrowserClient, createServerClient } from "@supabase/auth-helpers-remix";
import { useEffect, useState } from "react";


export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles },
          { rel: "stylesheet", href: headerStyles },];
};


export const loader = async ({ request }: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  }

  const response = new Response()

  const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    request,
    response,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return json(
    {
      env,
      session,
    },
    {
      headers: response.headers,
    }
  )
}

export default function App() {
  const { env, session } = useLoaderData()
  const { revalidate } = useRevalidator()
  
  const [supabase] = useState(() => createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY))
  
  const serverAccessToken = session?.access_token
  
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverAccessToken) {
        // server and client are out of sync.
        revalidate()
      }
    })
  
    return () => {
      subscription.unsubscribe()
    }
  }, [serverAccessToken, supabase])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet context={{ supabase }} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

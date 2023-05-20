import { LinksFunction, LoaderArgs, json, redirect } from "@remix-run/node";
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
} from "@remix-run/react";
import Header from "./components/Header";
import { SupabaseClient, createBrowserClient, createServerClient } from "@supabase/auth-helpers-remix";
import { useEffect, useState } from "react";
import { Database } from "db_types";
import { createClient } from "@supabase/supabase-js";
import createServerSupabase from "utils/supabase.server"


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
  const supabase = createServerSupabase({ request, response })


  const {
    data: { session },
  } = await supabase.auth.getSession()

  return json(
    {
      env,
      session,
    },
    {
      headers: response.headers
    }
  )
}

type TypedSupabaseClient = SupabaseClient<Database>

export type SupabaseOutletContext = {
  supabase: TypedSupabaseClient
}

export default function App() {
  const { env, session } = useLoaderData()

  const [supabase] = useState(() => createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY))

  const serverAccessToken = session?.access_token

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log("error")
    }
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header handleLogout={handleLogout} />
        <Outlet context={{ supabase }} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

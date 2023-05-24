import {
  LinksFunction,
  ActionArgs,
  ActionFunction,
  json,
  LoaderArgs,
} from '@remix-run/node'
import { Form, Link, useLoaderData, useOutletContext } from '@remix-run/react'
import {
  createBrowserClient,
  createServerClient,
} from '@supabase/auth-helpers-remix'
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { useState } from 'react'
import styles from '~/styles/loginSignup.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export default function Signup() {
  return (
    <div className="page">
      <div className="card">
        <h1>Signup</h1>
        <Form className="buttonGroup" method="post">
          <input
            className="userInput"
            name="username"
            placeholder="Username..."
          />
          <input
            className="userInput"
            name="password"
            placeholder="Password..."
          />
          <button type="button">Sign Up</button>
        </Form>
        <Link to="/homepage">Cheater</Link>
      </div>
    </div>
  )
}

import type { LinksFunction } from '@remix-run/node'
import type { SupabaseOutletContext } from '~/root'
import { FcGoogle } from 'react-icons/fc'

import skull from '../../public/flameSkull.png'
import { Form, useOutletContext } from '@remix-run/react'
import styles from '~/styles/loginSignup.css'
import { FaDiscord, FaGithub } from 'react-icons/fa'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export default function Signup() {
  const { supabase } = useOutletContext<SupabaseOutletContext>()

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  async function signInWithDiscord() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
    })
  }

  async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
  }

  return (
    <div className="page">
      <div className="card">
        <div className="imgWrapper">
          <img src={skull} alt="flamingskull"></img>
        </div>
        <div className="formWrapper">
          <Form className="signupForm" method="post">
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
            <button className="button" type="submit">
              Sign up
            </button>
            <div className="signupIcons">
              <FcGoogle onClick={signInWithGoogle} size={30} />
              <FaGithub onClick={signInWithGithub} size={30} />
              <FaDiscord onClick={signInWithDiscord} size={30} />
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

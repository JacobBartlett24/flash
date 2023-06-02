import { ActionArgs, LinksFunction, redirect } from '@remix-run/node'
import type { SupabaseOutletContext } from '~/root'
import { FcGoogle } from 'react-icons/fc'

import skull from '../../public/flameSkull.png'
import { Form, useOutletContext } from '@remix-run/react'
import styles from '~/styles/loginSignup.css'
import { FaDiscord, FaGithub } from 'react-icons/fa'
import createServerSupabase from 'utils/supabase.server'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export const action = async ({ request }: ActionArgs) => {
  let formData = await request.formData()
  let email = formData.get('email')
  let password = formData.get('password')

  const response = new Response()
  const supabase = createServerSupabase({ request, response })

  const { data, error } = await supabase.auth.signUp({
    email: email!.toString(),
    password: password!.toString(),
  })

  if (error) {
    console.log(error)
    return redirect('/signup')
  }

  return redirect('/homepage')

  return null
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
              type="email"
              className="userInput"
              name="email"
              placeholder="Email..."
            />
            <input
              type="password"
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

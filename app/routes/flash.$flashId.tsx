import type { LinksFunction, LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import createServerSupabase from 'utils/supabase.server'
import MyListbox, { Option } from '~/components/Listbox'
import styles from '~/styles/FlashSplatRoute.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export const loader = async ({ request, params }: LoaderArgs) => {
  const flashID = params.flashId

  const response = new Response()
  const supabase = createServerSupabase({ request, response })

  const { data } = await supabase
    .from('Flash')
    .select()
    .eq('id', flashID)
    .single()

  return { userFlash: data! }
}

export function ErrorBoundary({ error }) {
  console.error(error)
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

export default function Flash() {
  const { userFlash } = useLoaderData<typeof loader>()
  return (
    <>
      <div className="soloDisplay">
        <div className="media">
          {userFlash.img_url && (
            <img src={userFlash.img_url} alt={userFlash.description!} />
          )}
        </div>
        <div className="info">
          <h1>{userFlash.title}</h1>
          <p>{userFlash.description}</p>
          <p>${userFlash.price}</p>
          <MyListbox options={sizes} />
          <button className="purchaseButton">Purchase</button>
        </div>
      </div>
    </>
  )
}

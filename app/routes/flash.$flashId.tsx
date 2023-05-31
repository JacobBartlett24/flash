import type { LinksFunction, LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData, useOutletContext } from '@remix-run/react'
import createServerSupabase from 'utils/supabase.server'
import MyListbox, { Option } from '~/components/Listbox'
import Tags from '~/components/Tags'
import { SupabaseOutletContext } from '~/root'
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
        <div className="info">
          <h1>{userFlash.name}</h1>
          <p>{userFlash.description}</p>
          <p>${userFlash.price}</p>
          <Tags tags={userFlash.tags} />
          <MyListbox options={sizes} />
          <button className="purchaseButton">Purchase</button>
        </div>
      </div>
    </>
  )
}

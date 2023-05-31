import {
  LinksFunction,
  LoaderArgs,
  LoaderFunction,
  defer,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import FilterHeader from '~/components/FilterHeader'
import styles from '~/styles/GalleryGenre.css'
import createServerSupabase from 'utils/supabase.server'
import { Await, Link, useLoaderData, useOutletContext } from '@remix-run/react'
import { Suspense, useEffect } from 'react'
import { SupabaseOutletContext } from '~/root'
import Tags from '~/components/Tags'

export type filters = {
  genre: string
  color: string
  alphabetical: string
  price: string
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export const loader = async ({ request, params }: LoaderArgs) => {
  const response = new Response()
  const supabase = createServerSupabase({ request, response })

  const { data } = await supabase
    .from('Flash')
    .select()
    .eq(`tags->${params.genre}`, true)

  return defer({ userFlash: data ?? [] })
}

export default function GalleryGenre() {
  const { userFlash } = useLoaderData<typeof loader>()
  const { supabase } = useOutletContext<SupabaseOutletContext>()

  const filters: filters = {
    genre: 'all',
    color: 'all',
    alphabetical: 'all',
    price: 'all',
  }

  return (
    <>
      <div className="galleryPage">
        <FilterHeader filters={filters} />
        <div className="galleryContainer">
          <Suspense>
            <Await resolve={userFlash}>
              {userFlash.map((image: any) => {
                return (
                  <div className="imgWrapper" key={image.id}>
                    <Link to={`/flash/${image.id}`}>
                      <img
                        src={
                          supabase.storage
                            .from('flash')
                            .getPublicUrl(image.img_filepath as string).data
                            .publicUrl
                        }
                        alt={image.description}
                      />
                    </Link>
                    <div className="flashInfo">
                      <h1 className="flashName">{image.name}</h1>
                      <h2 className="flashPrice">${image.price}</h2>
                      <p className="flashDescription">{image.description}</p>
                      <Tags tags={image.tags} />
                    </div>
                  </div>
                )
              })}
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  )
}

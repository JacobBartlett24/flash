import type { LinksFunction, LoaderArgs, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData, useOutletContext } from '@remix-run/react'
import createServerSupabase from 'utils/supabase.server'
import styles from '~/styles/Homepage.css'
import GenreContainer from '~/components/GenreContainer'
import { SupabaseOutletContext } from '~/root'
import { useState, useEffect } from 'react'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

type imageData = {
  color_style: string | null
  created_at: string | null
  description: string | null
  id: number
  img_filepath: string | null
  img_url: string | null
  name: string | null
  price: number | null
  quantity: number | null
  tags: JSON
}

export default function Homepage() {
  const { supabase } = useOutletContext<SupabaseOutletContext>()

  const [popularImages, setPopularImages] = useState([])
  const [americanTraditionalImages, setAmericanTraditionalImages] = useState([])
  const [gothicImages, setGothicImages] = useState([])
  const [lineworkImages, setLineworkImages] = useState([])
  const [newReleasesImages, setNewReleasesImages] = useState([])

  const getFlash = async (title: string) => {
    const { data, error } = await supabase
      .from('Flash')
      .select('*')
      .eq(`tags->${title}`, true)
      .limit(5)
    return data!
  }

  useEffect(() => {
    getFlash('popular').then(setPopularImages)
    getFlash('american traditional').then(setAmericanTraditionalImages)
    getFlash('gothic').then(setGothicImages)
    getFlash('linework').then(setLineworkImages)
    getFlash('newreleases').then(setNewReleasesImages)
  }, [supabase])

  return (
    <div className="homepage">
      <div className="mainFeed">
        <GenreContainer title="popular" images={popularImages} />
        <GenreContainer
          title="american traditional"
          images={americanTraditionalImages}
        />
        <GenreContainer title="gothic" images={gothicImages} />
        <GenreContainer title="linework" images={lineworkImages} />
        <GenreContainer title="new releases" images={newReleasesImages} />
      </div>
    </div>
  )
}

import { Link, useOutletContext } from '@remix-run/react'
import { IconContext } from 'react-icons'
import { FaArrowRight } from 'react-icons/fa'
import { SupabaseOutletContext } from '~/root'

type props = {
  title: string
  images: any
}

export default function GenreContainer({ title, images }: props) {
  const { supabase } = useOutletContext<SupabaseOutletContext>()

  return (
    <>
      <div className="collectionWrapper">
        <div className="titleWrapper">
          <Link prefetch="intent" className="title" to={`/gallery/${title}`}>
            {title}
            <IconContext.Provider value={{ className: 'icons' }}>
              <FaArrowRight size={20} />
            </IconContext.Provider>
          </Link>
        </div>
        <div className="imgGallery">
          {images.map((userFlash: any) => {
            return (
              <Link
                to={`/flash/${userFlash.id}`}
                className="imgWrapper"
                key={userFlash.id}
              >
                <img
                  src={
                    supabase.storage
                      .from('flash')
                      .getPublicUrl(userFlash.img_filepath as string).data
                      .publicUrl
                  }
                  alt={userFlash.description!}
                />
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

import { Link, useOutletContext } from '@remix-run/react'
import FlashBox from './FlashBox'
import { SupabaseOutletContext } from '~/root'
import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import Modal from './Modal'
import { Session } from '@remix-run/node'

type userFlash = {
  color_style: string | null
  created_at: string | null
  description: string | null
  id: number
  img_filepath: string | null
  img_url: string | null
  name: string | null
  price: number | null
  quantity: number | null
}

type props = {
  galleryInfo: userFlash[]
  session: string | undefined
}

export default function ProfileLayout({ galleryInfo, session }: props) {
  const { supabase } = useOutletContext<SupabaseOutletContext>()

  const [modal, enableModal] = useState<boolean>(false)

  return (
    <>
      <div className="profileLayout">
        <div className="topSection">
          <div className="profilePicture">
            <img
              src={
                supabase.storage.from('avatars').getPublicUrl(`${session}`).data
                  .publicUrl ?? null
              }
              alt="profilePicture"
            />
            <div onClick={() => enableModal(!modal)} id="profilePictureOverlay">
              Change picture
              {modal}
            </div>
          </div>
          <div className="profileInfo">
            <h1 className="displayName">Jakey</h1>
            <h2 className="profileName">@JBeakers</h2>
            <div className="rating"></div>
            <p className="bio">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
              dolores doloremque quis blanditiis, sit facilis cum eius
              laboriosam illum veniam inventore aperiam soluta vero at fugiat
              libero nostrum deleniti velit! Perspiciatis quibusdam illum unde
              enim nesciunt, natus voluptates repellat tempora laborum iste
              minima vel beatae rerum qui velit quos impedit quo praesentium
              quod sint dolorem soluta eum a cum? At?
            </p>
          </div>
        </div>
        <span className="placeholder">
          <Link to="/upload">Upload Flash</Link>
        </span>
        <Modal modal={modal} enableModal={enableModal} session={session} />
        <div className="bottomSection">
          <div className="gallery">
            {galleryInfo.map((flash: userFlash) => {
              return (
                <Suspense key={flash.id} fallback={<div>Loading...</div>}>
                  <Link to={`/flash/${flash.id}`}>
                    <img
                      src={
                        supabase.storage
                          .from('flash')
                          .getPublicUrl(flash.img_filepath as string).data
                          .publicUrl
                      }
                      alt=""
                    />
                  </Link>
                </Suspense>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

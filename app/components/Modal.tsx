import { useLoaderData, useOutletContext } from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { SupabaseOutletContext } from '~/root'

type props = {
  enableModal: any
  modal: boolean
  session: string | undefined
}

export default function Modal({ modal, enableModal, session }: props) {
  const ref = useRef<HTMLDialogElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const { supabase } = useOutletContext<SupabaseOutletContext>()

  const handleUpload = async () => {
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(`${session}`, file!, {
        upsert: true,
      })

    if (error) {
      throw error
    } else {
      console.log(data)
    }
  }

  useEffect(() => {
    if (file) {
      handleUpload()
    }
  }, [file])

  useEffect(() => {
    if (modal) {
      ref.current?.showModal()
    } else {
      ref.current?.close()
    }
  }, [modal])

  return (
    <>
      <dialog ref={ref}>
        <form method="dialog">
          <button>OK</button>
        </form>
        <label>Image URL:</label>
        <input
          onChange={(e) => setFile(e.target.files![0])}
          type="file"
          name="imgUrl"
          required
        />
      </dialog>
    </>
  )
}

import {
  ActionArgs,
  LinksFunction,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node'
import { Form, useActionData, useOutletContext } from '@remix-run/react'
import createServerSupabase from 'utils/supabase.server'
import styles from '../styles/UploadForm.css'
import { SupabaseOutletContext } from '~/root'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

// async function uploadFile(file, supabase, session) {
//   const { data, error } = await supabase.storage.from('flash').upload(`${session}/${file}`, file)
//   if (error) {
//     // Handle error
//   } else {
//     // Handle success
//   }
// }

export const action = async ({ request, params }: ActionArgs) => {
  const response = new Response()
  const supabase = createServerSupabase({ request, response })

  return null
}

export default function UploadRoute() {
  const actionData = useActionData()
  console.log(actionData)

  const { supabase } = useOutletContext<SupabaseOutletContext>()

  const handleImageSubmit = async (e: any) => {
    let image = e.target.files[0] as File
    supabase
      .storage
      .from("flash")
      .upload(`test/${image.name}`, image,
      {
        cacheControl: '3600',
			  upsert: false
      })
  }

  return (
    <div className="uploadPage">
      <Form className="uploadForm" method="post" encType="multipart/form-data">
        <div className="field">
          <label>Name of piece:</label>
          <input type="text" name="flashName" />
        </div>
        <div className="field">
          <label>Price:</label>
          <input type="number" name="price" />
        </div>
        <div className="field">
          <label>Image URL:</label>
          <input onChange={handleImageSubmit} type="file" name="imgUrl" />
        </div>
        <div className="field">
          <label>Description:</label>
          <textarea name="description" />
        </div>
        <div className="field">
          <label>Quantity</label>
          <input type="number" name="quantity" />
        </div>
        <button type="submit">Submit</button>
        {actionData ? `File Uploaded: ${JSON.stringify(actionData)}` : null}
      </Form>
    </div>
  )
}

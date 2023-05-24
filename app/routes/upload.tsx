import {
  ActionArgs,
  LinksFunction,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import createServerSupabase from 'utils/supabase.server'
import styles from '../styles/UploadForm.css'

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

  const session = (await supabase.auth.getSession()).data.session?.user.id

  const uploadHandler = unstable_createMemoryUploadHandler()

  const formData = await unstable_parseMultipartFormData(request, uploadHandler)

  const filePaths = formData.get('imgUrl')?.toString()

  console.log(JSON.stringify(formData.get('imgUrl'), null, 2))

  console.log('supabase upsert successful')

  return null
}

export default function UploadRoute() {
  const actionData = useActionData()
  console.log(actionData)
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
          <input type="file" name="imgUrl" />
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

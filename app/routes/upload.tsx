import {
  Form,
  useActionData,
  useLoaderData,
  useOutletContext,
} from '@remix-run/react'
import createServerSupabase from 'utils/supabase.server'
import styles from '../styles/UploadForm.css'
import type {
  ActionArgs,
  LinksFunction,
  LoaderArgs,
  json,
} from '@remix-run/node'
import type { SupabaseOutletContext } from '~/root'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export const action = async ({ request, params }: ActionArgs) => {
  const response = new Response()
  const supabase = createServerSupabase({ request, response })

  const formDate = await request.formData()
  const flashName = formDate.get('flashName')?.toString()
  const price = parseInt(formDate.get('price')?.toString() || '0')
  const imgUrl = formDate.get('imgUrl')?.toString()
  const description = formDate.get('description')?.toString()

  const session = (await supabase.auth.getSession()).data.session?.user.id

  const { error } = await supabase.from('Flash').insert({
    name: flashName,
    price: price,
    img_url: imgUrl,
    description: description,
    img_filepath: `${session}/${flashName}`,
  })

  console.log(error)

  return null
}

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response()
  const supabase = createServerSupabase({ request, response })

  const session = (await supabase.auth.getSession()).data.session?.user.id

  return session
}

export default function UploadRoute() {
  const actionData = useActionData()
  const session = useLoaderData<typeof loader>()

  const { supabase } = useOutletContext<SupabaseOutletContext>()

  const handleImageSubmit = async (e: any) => {
    let image = e.target.files[0] as File
    const { data, error } = await supabase.storage
      .from('flash')
      .upload(`${session}/${image.name}`, image, {
        cacheControl: '3600',
      })
    if (error) {
      console.log(error)
    } else {
      console.log(data)
    }
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

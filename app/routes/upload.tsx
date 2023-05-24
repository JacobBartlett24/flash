import {
  Form,
  useActionData,
  useFetcher,
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
import { FunctionsFetchError } from '@supabase/supabase-js'
import { useState } from 'react'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export const action = async ({ request, params }: ActionArgs) => {
  const response = new Response()
  const supabase = createServerSupabase({ request, response })

  const formDate = await request.formData()
  const flashName = formDate.get('name')?.toString()
  const price = parseInt(formDate.get('price')?.toString() || '0')
  const description = formDate.get('description')?.toString()
  const quantity = parseInt(formDate.get('quantity')?.toString() || '0')

  const session = (await supabase.auth.getSession()).data.session?.user.id

  const { error } = await supabase.from('Flash').insert({
    name: flashName,
    price: price,
    description: description,
    img_filepath: `${session}/${flashName}`,
    quantity: quantity,
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
  const fetcher = useFetcher()

  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [description, setDescription] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(0)

  const { supabase } = useOutletContext<SupabaseOutletContext>()

  const handleFormSubmit = async () => {
    const { data, error } = await supabase.storage
      .from('flash')
      .upload(`${session}/${name}`, file!, {
        cacheControl: '3600',
      })
    if (error) {
      console.log(error)
    } else {
      fetcher.submit(
        {
          name: name,
          price: price as unknown as string,
          description: description,
          quantity: quantity as unknown as string,
        },
        {
          method: 'post',
        }
      )
      console.log('success')
    }
  }

  return (
    <div className="uploadPage">
      <fetcher.Form
        className="uploadForm"
        method="post"
        encType="multipart/form-data"
      >
        <div className="field">
          <label>Name of piece:</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="flashName"
            required
          />
        </div>
        <div className="field">
          <label>Price:</label>
          <input
            onChange={(e) => setPrice(e.target.value as unknown as number)}
            type="number"
            name="price"
            required
          />
        </div>
        <div className="field">
          <label>Image URL:</label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            name="imgUrl"
            required
          />
        </div>
        <div className="field">
          <label>Description:</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            name="description"
          />
        </div>
        <div className="field">
          <label>Quantity</label>
          <input
            onChange={(e) => setQuantity(e.target.value as unknown as number)}
            type="number"
            name="quantity"
            required
          />
        </div>
        <button onClick={handleFormSubmit} type="button">
          Submit
        </button>
        {actionData ? `File Uploaded: ${JSON.stringify(actionData)}` : null}
      </fetcher.Form>
    </div>
  )
}

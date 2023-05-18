import { ActionArgs, ActionFunction, LinksFunction } from "@remix-run/node";
import styles from "../styles/ProfilePage.css"
import { Form } from "@remix-run/react";
import createServerSupabase from "utils/supabase.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const validateUrl = (url: string) => {
  if (!url) {
    throw new Error("url is required")
  }
}

export const validateDescription = (description: string) => {
  if (!description) {

  }
}

export const validatePrice = (price: number) => {
  if (!price) {
    throw new Error("price is required")
  }
}

export const validateInputs = (url: string, description: string, price: number) => {
  validateUrl(url)
  validateDescription(description)
  validatePrice(price)
}

export const action: ActionFunction = async ({ request, params }: ActionArgs) => {
  let body = await request.formData();
  let url = body.get("url")?.toString();
  let description = body.get("description")?.toString();
  let price: number | null = parseInt(body.get("price")?.toString() || "0");

  validateInputs(url, description, price);

  const response = new Response()
  const supabase = createServerSupabase({ request, response })

  let session = (await supabase.auth.getSession()).data.session?.user.id;
  let { error } = await supabase.from('UserFlash').insert(
    {
      img_url: url,
      description: description,
      price: price,
      user_id: session
    }
  )

  if (error) {
    console.log(error)
  }

  return null
}


export default function Profile() {
  return (
    <div className="profilePage">
      <Form method="POST" className="uploadFlashForm">
        <label htmlFor="url">URL</label>
        <input name="url" type="text" required />
        <label htmlFor="description">Description</label>
        <textarea name="description" required />
        <label htmlFor="price">price</label>
        <input name="price" type="text" required />
        <button type="submit">Upload Flash</button>
      </Form>
    </div>
  )
}
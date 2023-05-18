import { ActionArgs, ActionFunction, LinksFunction } from "@remix-run/node";
import styles from "../styles/ProfilePage.css"
import { Form } from "@remix-run/react";
import createServerSupabase from "utils/supabase.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const action: ActionFunction = async ({ request, params }: ActionArgs) => {
  let body = await request.formData();
  let url = body.get("url")?.toString();
  let description = body.get("description")?.toString();
  let price: number | null = parseInt(body.get("price")?.toString() || "0");

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
        <input name="url" type="text" />
        <label htmlFor="description">Description</label>
        <textarea name="description" />
        <label htmlFor="price">price</label>
        <input name="price" type="text" />
        <button type="submit">Upload Flash</button>
      </Form>
    </div>
  )
}
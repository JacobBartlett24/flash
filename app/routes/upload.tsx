import { ActionArgs, LinksFunction, unstable_parseMultipartFormData } from "@remix-run/node";
import { Form } from "@remix-run/react";
import createServerSupabase from "utils/supabase.server";
import styles from "../styles/UploadForm.css"

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

// async function uploadFile(file, supabase, session) {
//   const { data, error } = await supabase.storage.from('flash').upload(`${session}/${file}`, file)
//   if (error) {
//     // Handle error
//   } else {
//     // Handle success
//   }
// }

export const action = async ({ request, params }: ActionArgs) => {
  let body = await request.formData();
  let flashName = body.get("flashName")?.toString();
  let price: number | null = parseInt(body.get("price")?.toString() || "0");
  let imgUrl = body.get("imgUrl")?.toString();
  let description = body.get("description")?.toString();
  let quantity: number | null = parseInt(body.get("quantity")?.toString() || "0");

  const response = new Response()
  const supabase = createServerSupabase({ request, response })

  
  let session = (await supabase.auth.getSession()).data.session?.user.id;

  let { error } = await supabase.from('UserFlash').insert(
    {
      title: flashName,
      price: price,
      img_url: imgUrl,
      description: description,
      quantity: quantity,
      user_id: session
    }
  )

  if (error) {
    console.log(error)
  }

  return null;
}

export default function UploadRoute(){
  return (
    <div className="uploadPage">
      <Form className="uploadForm" method="post">
        <div className="field">
          <label>Name of piece:</label>
          <input type="text" name="flashName"/>
        </div>
        <div className="field">
          <label>Price:</label>
          <input type="number" name="price"/>
        </div>
        <div className="field">
          <label>Image URL:</label>
          <input type="file" name="imgUrl"/>
        </div>
        <div className="field">
          <label>Description:</label>
          <textarea name="description"/>
        </div>
        <div className="field">
          <label>Quantity</label>
          <input type="number" name="quantity"/>
        </div>
        <button type="submit">Submit</button>
      </Form>
    </div>
  )
}
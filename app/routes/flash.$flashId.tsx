import type { LinksFunction, LoaderArgs, LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import createServerSupabase from "utils/supabase.server";
import MyListbox, { Option, Options } from "~/components/Listbox";
import styles from "~/styles/FlashSplatRoute.css";


export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const loader: LoaderFunction = async ({ request, params }: LoaderArgs) => {
  const flashID = params.flashId;

  const response = new Response()
  const supabase = createServerSupabase({ request, response })

  const { data } = await supabase.from('UserFlash').select().eq('id', flashID).single()

  return json({userFlash: data})
}

export function ErrorBoundary ({ error }) {
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
      </head>
      <body className="errorBoundary">
        <h1>Image not found</h1>
        <p>{error.message}</p>
      </body>
    </html>
  );
}

const sizes = [
  { id: 1, name: '4x4 in', unavailable: false },
  { id: 2, name: '6x4 in', unavailable: false },
  { id: 3, name: '6x6 in', unavailable: false },
  { id: 4, name: '8x6 in', unavailable: true },
  { id: 5, name: '8x8 in', unavailable: false },
  { id: 6, name: 'Other', unavailable: false },
] as Option[]

export default function Flash(){
  const data = useLoaderData<typeof loader>()
  return(
    <>
      <div className="soloDisplay">
        <div className="media">
          {data.userFlash.img_url && <img src={data.userFlash.img_url} alt={data.userFlash.description} />}
        </div>
        <div className="info">
          <h1>{data.userFlash.title}</h1>
          <p>{data.userFlash.description}</p>
          <p>${data.userFlash.price}</p>
          <MyListbox options={sizes} />          
          <button className="purchaseButton">Purchase</button>
        </div>
      </div>
    </>
  )
}
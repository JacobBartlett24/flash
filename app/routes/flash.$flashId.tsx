import type { LinksFunction, LoaderArgs, LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react";
import createServerSupabase from "utils/supabase.server";
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

export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
      </head>
      <body className="errorBoundary">
        <h1>Image not found</h1>
      </body>
    </html>
  );
}

export default function Flash(){
  const data = useLoaderData<typeof loader>()
  return(
    <>
      <div className="soloDisplay">
        {data.userFlash.img_url && <img src={data.userFlash.img_url} alt={data.userFlash.description} />}
      </div>
    </>
  )
}
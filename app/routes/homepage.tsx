import type { LinksFunction, LoaderArgs, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import createServerSupabase from "utils/supabase.server";
import styles from "~/styles/Homepage.css";
import GenreContainer from "~/components/GenreContainer";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const response = new Response()
  const supabase = createServerSupabase({ request, response })

  const { data } = await supabase.from('UserFlash').select()

  return json({ userFlash: data })
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>()
  return (

    <div className="homepage">  
      <div className="mainFeed">
        <GenreContainer title="popular" images={data.userFlash} />
        <GenreContainer title="american Traditional" images={data.userFlash} />
        <GenreContainer title="gothic" images={data.userFlash} />
        <GenreContainer title="newreleases" images={data.userFlash} />
      </div>
    </div>
  );
}
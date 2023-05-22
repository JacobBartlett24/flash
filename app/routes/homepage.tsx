import type { LinksFunction, LoaderArgs, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import createServerSupabase from "utils/supabase.server";
import styles from "~/styles/Homepage.css";
import GenreContainer from "~/components/GenreContainer";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response()
  const supabase = createServerSupabase({ request, response })

  const { data } = await supabase.from('UserFlash').select()

  return { userFlash: data }
}

export default function Homepage() {
  const { userFlash } = useLoaderData<typeof loader>()
  return (

    <div className="homepage">  
      <div className="mainFeed">
        <GenreContainer title="popular" images={userFlash} />
        <GenreContainer title="american Traditional" images={userFlash} />
        <GenreContainer title="gothic" images={userFlash} />
        <GenreContainer title="newreleases" images={userFlash} />
      </div>
    </div>
  );
}
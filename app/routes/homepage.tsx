import { LinksFunction, LoaderArgs, LoaderFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import NavBar from "~/components/NavBar";
import createServerSupabase from "utils/supabase.server";
import styles from "~/styles/Homepage.css";
import FlashBox from "~/components/FlashBox";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const response = new Response()
  const supabase = createServerSupabase({ request, response })

  const { data } = await supabase.from('UserFlash').select();

  return json({ userFlash: data })
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>()
  return (

    <div className="homepage">


      <div className="mainFeed">

        {/* {data.Array.forEach(element => {
          <FlashBox flashImage={element.img_url} description={element.description} />
        })} */}
        <FlashBox flashImage={data.userFlash[0].img_url} description={data.userFlash[0].description} />
      </div>
    </div>
  );
}
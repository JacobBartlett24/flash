import { LoaderArgs, V2_MetaFunction, json, redirect } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import styles from "~/styles/LandingPage.css";
import skull from "../../public/flameSkull.png";
import { Link, useLoaderData } from "@remix-run/react";
import createServerSupabase from "utils/supabase.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: V2_MetaFunction = () => {
  return [{ title: "Flash" }];
};

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response()
  const supabase = createServerSupabase({ request, response })


  if ((await supabase.auth.getSession()).data.session?.user.aud == "authenticated") {
    return redirect("/homepage")
  }
  return null
}

export default function Index() {
  return (
    <div style={{ fontFamily: "Bebas Neue, sans-serif", lineHeight: "1.4" }}>
      <div className="topSection">
        <img src={skull} alt="Flaming Skull" />
        <h1>Flash ⚡</h1>
        <p>
          The best way to showcase your flash on all social media platforms.
        </p>
        <div className="loginField" >
          <Link prefetch="intent" to="/login">
            Login
          </Link>
          <Link prefetch="intent" to="/signup">
            New? Sign Up
          </Link>
        </div>
      </div>
      <div className="showcaseSection">
        <div className="showcase">
          <div className="textbox">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat explicabo et id consequuntur
            temporibus aspernatur quam consectetur, esse ad libero, a culpa adipisci accusamus corrupti earum saepe quibusdam ab quos.
            Nemo inventore fuga minima laudantium! Sequi dolore quae voluptates. Quam laudantium placeat aliquam consequuntur saepe
            sed, ad molestias aliquid assumenda officiis quas nesciunt a cumque. Aliquam repudiandae perferendis natus libero!
          </div>
          <div className="image">
            <img src={skull} alt="" />
          </div>
        </div>
        <div className="showcase">
          <div className="image">
            <img src={skull} alt="" />
          </div>
          <div className="textbox">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat explicabo et id consequuntur
            temporibus aspernatur quam consectetur, esse ad libero, a culpa adipisci accusamus corrupti earum saepe quibusdam ab quos.
            Nemo inventore fuga minima laudantium! Sequi dolore quae voluptates. Quam laudantium placeat aliquam consequuntur saepe
            sed, ad molestias aliquid assumenda officiis quas nesciunt a cumque. Aliquam repudiandae perferendis natus libero!
          </div>
        </div>
      </div>
    </div>
  );
}

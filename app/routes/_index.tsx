import { LoaderArgs, LoaderFunction, V2_MetaFunction, json, redirect } from "@remix-run/node";
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

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
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
            <span className="backgroundButton"></span>
          </Link>
          <Link prefetch="intent" to="/signup">
            New? Sign Up
            <span className="backgroundButton"></span>
          </Link>
        </div>
      </div>
      <div className="showcaseSection">
        ShowCase
      </div>
      <div className="">
        SomethingElse
      </div>
    </div>
  );
}

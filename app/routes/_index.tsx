import { V2_MetaFunction, redirect } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import styles from "~/styles/LandingPage.css";
import skull from "../../public/flameSkull.png";
import { Form, Link } from "@remix-run/react";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: V2_MetaFunction = () => {
  return [{ title: "Flash" }];
};


export default function Index() {
  return (
    <div style={{ fontFamily: "Bebas Neue, sans-serif", lineHeight: "1.4" }}>
      <div className="topSection">
        <img src={skull} alt="Flaming Skull"/>
        <h1>Flash</h1>
        <p>
          The best way to showcase your flash on all social media platforms.
        </p>
        <div className="loginField" >
          <Link to="/login">
            Login
            <span className="backgroundButton"></span>
          </Link>
          <Link to="/signup">
            New? Sign Up
            <span className="backgroundButton"></span>
          </Link>
        </div>
      </div>
    </div>
  );
}

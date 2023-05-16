import type{ LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import NavBar from "~/components/NavBar";

import styles from "~/styles/Homepage.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function Homepage() {
  return (
    <div className="homepage">
      <NavBar />
      <Outlet />
    </div>
  );
}
import { LinksFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import styles from "~/styles/loginSignup.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function Login() {
  return(
    <div className="page">
      <div className="card">
        <h1>Login</h1>
          <Form className="buttonGroup">
            <input />
            <input />
            <button className="button">Sign up with Apple</button>
            <button className="button">Sign up with Twitter</button>
          </Form>
      </div>
    </div>
  )
}
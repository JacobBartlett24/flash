import type { LinksFunction } from "@remix-run/node";
import {  useOutletContext } from "@remix-run/react";
import type { SupabaseOutletContext } from "~/root";
import styles from "~/styles/loginSignup.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function Login() { 
  const { supabase } = useOutletContext<SupabaseOutletContext>();
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      
    })
    if (error) {
      console.log("error")
    }

  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log("error")
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Login</h1>
        <button onClick={handleLogin} className="button">Sign up with github</button>
        <button onClick={handleLogout} className="button">Logout</button>
      </div>
    </div>
  )
}
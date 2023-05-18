import { Link } from "@remix-run/react";
import { FaLaugh } from "react-icons/fa";

export default function Header() {
  return (
    <div className="header">
      <Link to="/">Flash</Link>
      <Link to="/profile"><FaLaugh /></Link>
    </div>
  )
} 
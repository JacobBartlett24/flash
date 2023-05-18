import { Link } from "@remix-run/react";
import { FaLaugh } from "react-icons/fa";

type props = {
  handleLogout: () => void
}

export default function Header({ handleLogout }: props) {
  return (
    <div className="header">
      <Link to="/">Flash</Link>
      <Link to="/profile"><FaLaugh /></Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
} 
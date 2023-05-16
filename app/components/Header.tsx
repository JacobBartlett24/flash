import { Link } from "@remix-run/react";

export default function Header(){
  return(
    <div className="header">
      <Link to="/">Flash</Link>
      <span>icons</span>
    </div>  
  )
} 
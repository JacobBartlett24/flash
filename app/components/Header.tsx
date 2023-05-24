import { Link } from '@remix-run/react'
import { FaLaugh } from 'react-icons/fa'

type props = {
  handleLogout: () => void
}

export default function Header({ handleLogout }: props) {
  return (
    <div className="header">
      <div>
        <Link to="/">Flash</Link>
      </div>
      <div className="profile">
        <button onClick={handleLogout}>Logout</button>
        <Link to="/profile">
          <FaLaugh size={20} />
        </Link>
      </div>
    </div>
  )
}

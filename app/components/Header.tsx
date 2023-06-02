import { Link } from '@remix-run/react'
import { FaLaugh } from 'react-icons/fa'

type props = {
  handleLogout: () => void
  session: string | undefined
}

export default function Header({ handleLogout, session }: props) {
  return (
    <div className="header">
      <div>
        <Link to="/">Flash</Link>
      </div>
      {session ? (
        <div className="profile">
          <Link to="/profile">
            <FaLaugh size={20} />
          </Link>
          <button className="logoutButton" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : null}
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import { clearSession, getSession } from '../utils/auth'

const Navbar = () => {
  const navigate  = useNavigate()
  const session   = getSession()

  const handleLogout = () => {
    clearSession()
    navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-surface-border bg-surface/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <span className="font-display font-bold text-lg tracking-tight">IssueTrack</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-display font-semibold text-white">{session?.nombre}</span>
            <span className="text-xs text-brand-400 font-body">{session?.rol}</span>
          </div>
          <button onClick={handleLogout} className="btn-ghost text-sm">
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

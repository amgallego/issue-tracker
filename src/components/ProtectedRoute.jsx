import { Navigate } from 'react-router-dom'
import { getSession } from '../utils/auth'

const ProtectedRoute = ({ children }) => {
  const session = getSession()
  return session ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute

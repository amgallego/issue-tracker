// Login page - autenticación simulada con LocalStorage
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveSession, getSession } from '../utils/auth'
import { useEffect } from 'react'

const ROLES = ['Administrador', 'Desarrollador', 'QA', 'Soporte']

const LoginPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: '', rol: 'Administrador' })
  const [error, setError] = useState('')

  useEffect(() => {
    if (getSession()) navigate('/dashboard')
  }, [navigate])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nombre.trim()) return setError('Ingresa tu nombre para continuar.')
    saveSession(form)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]
                        bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96
                        bg-brand-700/10 rounded-full blur-3xl" />
      </div>

      <div className="card w-full max-w-sm p-8 flex flex-col gap-6 relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl tracking-tight">IssueTrack</h1>
            <p className="text-gray-400 font-body text-sm mt-1">Gestor de incidencias</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="label">Nombre</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              className="input"
              autoFocus
            />
          </div>

          <div>
            <label className="label">Rol</label>
            <select name="rol" value={form.rol} onChange={handleChange} className="input">
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center font-body">{error}</p>
          )}

          <button type="submit" className="btn-primary w-full mt-1">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage

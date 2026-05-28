import { useState } from 'react'
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar'
import IssueCard from '../components/IssueCard'
import IssueForm from '../components/IssueForm'
import Spinner from '../components/Spinner'
import { useIssues } from '../hooks/useIssues'

const FILTERS = ['Todos', 'Pendiente', 'En Progreso', 'Resuelto']

const DashboardPage = () => {
  const { issues, loading, error, addIssue, editIssue, deleteIssue } = useIssues()
  const [filter, setFilter]         = useState('Todos')
  const [showForm, setShowForm]     = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [saving, setSaving]         = useState(false)

  const filtered = filter === 'Todos'
    ? issues
    : issues.filter((i) => i.estado === filter)

  const openCreate = () => { setEditTarget(null); setShowForm(true) }
  const openEdit   = (issue) => { setEditTarget(issue); setShowForm(true) }
  const closeForm  = () => { setShowForm(false); setEditTarget(null) }

  const handleSubmit = async (formData) => {
    setSaving(true)
    try {
      if (editTarget) {
        await editIssue(editTarget.id, formData)
        Swal.fire({ icon: 'success', title: '¡Actualizado!', text: 'La incidencia fue modificada.', timer: 1800, showConfirmButton: false })
      } else {
        await addIssue(formData)
        Swal.fire({ icon: 'success', title: '¡Creado!', text: 'Nueva incidencia registrada.', timer: 1800, showConfirmButton: false })
      }
      closeForm()
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo guardar. Intenta de nuevo.' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar incidencia?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })
    if (!result.isConfirmed) return
    try {
      await deleteIssue(id)
      Swal.fire({ icon: 'success', title: '¡Eliminada!', text: 'La incidencia fue cancelada.', timer: 1800, showConfirmButton: false })
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo eliminar.' })
    }
  }

  // Stats
  const total     = issues.length
  const pending   = issues.filter((i) => i.estado === 'Pendiente').length
  const progress  = issues.filter((i) => i.estado === 'En Progreso').length
  const resolved  = issues.filter((i) => i.estado === 'Resuelto').length

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">Dashboard</h1>
            <p className="text-gray-400 font-body text-sm mt-1">
              {total} {total === 1 ? 'incidencia registrada' : 'incidencias registradas'}
            </p>
          </div>
          <button onClick={openCreate} className="btn-primary flex items-center gap-2 self-start sm:self-auto">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Nueva incidencia
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Total',       value: total,    color: 'text-white' },
            { label: 'Pendientes',  value: pending,  color: 'text-yellow-400' },
            { label: 'En Progreso', value: progress, color: 'text-blue-400' },
            { label: 'Resueltos',   value: resolved, color: 'text-green-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="card p-4 flex flex-col gap-1">
              <span className={`font-display font-bold text-2xl ${color}`}>{value}</span>
              <span className="text-xs text-gray-500 font-body">{label}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-display font-semibold border transition-all duration-200
                ${filter === f
                  ? 'bg-brand-500 border-brand-500 text-white'
                  : 'border-surface-border text-gray-400 hover:border-brand-500/50 hover:text-white'
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading && <Spinner text="Cargando incidencias..." />}

        {error && !loading && (
          <div className="card p-6 text-center">
            <p className="text-red-400 font-body">{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="card p-12 text-center flex flex-col items-center gap-3">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#374151" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
            <p className="text-gray-500 font-body">
              {filter === 'Todos' ? 'No hay incidencias. ¡Crea la primera!' : `No hay incidencias con estado "${filter}".`}
            </p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <IssueForm
          initial={editTarget}
          onSubmit={handleSubmit}
          onClose={closeForm}
          loading={saving}
        />
      )}
    </div>
  )
}

export default DashboardPage

import { useState, useEffect } from 'react'

const ESTADOS    = ['Pendiente', 'En Progreso', 'Resuelto']
const PRIORIDADES = ['Baja', 'Media', 'Alta']

const empty = { titulo: '', descripcion: '', estado: 'Pendiente', prioridad: 'Media' }

const IssueForm = ({ initial, onSubmit, onClose, loading }) => {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setForm(initial ? { ...initial } : empty)
    setErrors({})
  }, [initial])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.titulo.trim()) errs.titulo = 'El título es obligatorio.'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) return setErrors(errs)
    onSubmit(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="card w-full max-w-md p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg">
            {initial ? 'Editar incidencia' : 'Nueva incidencia'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Título */}
          <div>
            <label className="label">Título</label>
            <input
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              placeholder="Ej: Error al cargar imágenes"
              className="input"
            />
            {errors.titulo && <p className="text-red-400 text-xs mt-1">{errors.titulo}</p>}
          </div>

          {/* Descripción */}
          <div>
            <label className="label">Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Detalla el problema..."
              rows={3}
              className="input resize-none"
            />
          </div>

          {/* Estado + Prioridad */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Estado</label>
              <select name="estado" value={form.estado} onChange={handleChange} className="input">
                {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Prioridad</label>
              <select name="prioridad" value={form.prioridad} onChange={handleChange} className="input">
                {PRIORIDADES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="btn-ghost flex-1">
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Guardando...' : initial ? 'Guardar cambios' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default IssueForm

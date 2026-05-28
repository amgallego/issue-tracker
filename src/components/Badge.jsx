const palettes = {
  // Estado
  'Pendiente':   'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  'En Progreso': 'bg-blue-500/10   text-blue-400   border-blue-500/30',
  'Resuelto':    'bg-green-500/10  text-green-400  border-green-500/30',
  // Prioridad
  'Baja':  'bg-gray-500/10  text-gray-400  border-gray-500/30',
  'Media': 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  'Alta':  'bg-red-500/10   text-red-400   border-red-500/30',
}

const Badge = ({ value }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-display font-semibold border ${palettes[value] || 'bg-gray-500/10 text-gray-400 border-gray-500/30'}`}>
    {value}
  </span>
)

export default Badge

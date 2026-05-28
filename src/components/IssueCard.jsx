import Badge from './Badge'

const IssueCard = ({ issue, onEdit, onDelete }) => (
  <div className="card p-5 flex flex-col gap-3 hover:border-brand-500/40 transition-colors duration-200">
    <div className="flex items-start justify-between gap-2">
      <h3 className="font-display font-semibold text-white leading-snug">{issue.titulo}</h3>
      <span className="text-xs text-gray-600 font-body shrink-0">#{issue.id}</span>
    </div>

    <p className="text-sm text-gray-400 font-body leading-relaxed line-clamp-2">
      {issue.descripcion || 'Sin descripción.'}
    </p>

    <div className="flex flex-wrap gap-2 pt-1">
      <Badge value={issue.estado} />
      <Badge value={issue.prioridad} />
    </div>

    <div className="flex gap-2 pt-1 border-t border-surface-border">
      <button
        onClick={() => onEdit(issue)}
        className="flex-1 text-xs btn-ghost py-1.5"
      >
        Editar
      </button>
      <button
        onClick={() => onDelete(issue.id)}
        className="flex-1 text-xs py-1.5 rounded-xl border border-red-500/30 text-red-400
                   hover:bg-red-500/10 transition-all duration-200 font-display font-medium active:scale-95"
      >
        Eliminar
      </button>
    </div>
  </div>
)

export default IssueCard

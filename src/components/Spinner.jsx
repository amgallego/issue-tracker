const Spinner = ({ text = 'Cargando...' }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-20">
    <div className="w-10 h-10 border-2 border-surface-border border-t-brand-500 rounded-full animate-spin" />
    <p className="text-gray-400 font-body text-sm">{text}</p>
  </div>
)

export default Spinner

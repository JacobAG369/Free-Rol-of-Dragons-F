import { Calendar, Users } from 'lucide-react'
import type { Campana } from '../types/campana.types'

interface Props {
  campana: Campana
  aventureros: number
  onClick: () => void
}

export function CampanaCard({ campana, aventureros, onClick }: Props) {
  const fecha = new Date(campana.fecha_creacion).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <button
      onClick={onClick}
      className="group flex flex-col gap-4 rounded-2xl border border-amber-200/15 bg-amber-100/5 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-amber-500/40 hover:bg-amber-100/8"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-white leading-snug">{campana.nombre}</h3>
        <span className="shrink-0 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-medium text-amber-300">
          DM: {campana.director}
        </span>
      </div>

      {campana.notas_generales && (
        <p className="line-clamp-2 text-sm text-white/40 leading-relaxed">
          {campana.notas_generales}
        </p>
      )}

      <div className="flex items-center gap-4 text-xs text-white/40">
        <span className="flex items-center gap-1.5">
          <Users size={12} />
          {aventureros} {aventureros === 1 ? 'aventurero' : 'aventureros'}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar size={12} />
          {fecha}
        </span>
      </div>
    </button>
  )
}

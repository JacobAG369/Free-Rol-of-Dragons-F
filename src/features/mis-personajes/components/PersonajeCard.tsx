import { Shield, Heart, Star } from 'lucide-react'
import type { Personaje } from '../types/personaje.types'

interface Props {
  personaje: Personaje
}

export function PersonajeCard({ personaje }: Props) {
  const clasesPrimarias = personaje.clases
    .slice(0, 2)
    .map((c) => `${c.clase_nombre} ${c.nivel_en_clase}`)
    .join(' / ')

  const nivelTotal = personaje.clases.reduce((sum, c) => sum + c.nivel_en_clase, 0)

  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-amber-200/15 bg-amber-100/5 p-5 transition-all hover:-translate-y-0.5 hover:border-amber-500/40 hover:bg-amber-100/8">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">{personaje.nombre}</h3>
          <p className="mt-0.5 text-sm text-white/50">
            {personaje.raza_nombre}
            {clasesPrimarias ? ` · ${clasesPrimarias}` : ''}
          </p>
        </div>
        {nivelTotal > 0 && (
          <span className="flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
            <Star size={10} />
            Nv {nivelTotal}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5 text-white/60">
          <Heart size={14} className="text-red-400" />
          <span>{personaje.puntos_golpe_actuales}/{personaje.puntos_golpe_max} HP</span>
        </div>
        <div className="flex items-center gap-1.5 text-white/60">
          <Shield size={14} className="text-blue-400" />
          <span>CA {personaje.clase_armadura}</span>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-1 text-center">
        {(['FUE', 'DES', 'CON', 'INT', 'SAB', 'CAR'] as const).map((label, i) => {
          const val = [
            personaje.fuerza, personaje.destreza, personaje.constitucion,
            personaje.inteligencia, personaje.sabiduria, personaje.carisma,
          ][i]
          const mod = Math.floor((val - 10) / 2)
          return (
            <div key={label} className="rounded-lg bg-amber-100/5 py-1.5">
              <div className="text-[10px] font-medium text-white/30">{label}</div>
              <div className="text-sm font-bold text-white">{val}</div>
              <div className="text-[10px] text-white/40">{mod >= 0 ? `+${mod}` : mod}</div>
            </div>
          )
        })}
      </div>

      {(personaje.trasfondo || personaje.alineamiento) && (
        <p className="text-xs text-white/30">
          {[personaje.trasfondo, personaje.alineamiento].filter(Boolean).join(' · ')}
        </p>
      )}
    </div>
  )
}

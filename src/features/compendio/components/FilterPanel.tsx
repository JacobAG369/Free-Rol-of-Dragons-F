import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import type { CompendioFilters, TipoContenido } from '../types/compendio.types'

const TIPOS: { value: TipoContenido; label: string }[] = [
  { value: 'conjuros', label: 'Hechizos' },
  { value: 'monstruos', label: 'Monstruos' },
  { value: 'objetos', label: 'Objetos' },
]

const ESCUELAS = ['Evocación', 'Conjuración', 'Abjuración', 'Encantamiento']
const NIVELES = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const RANGOS_CR = ['CR 0-5', 'CR 6-10', 'CR 11-15', 'CR +16']

interface Props {
  filters: CompendioFilters
  onChange: (filters: CompendioFilters) => void
}

function toggle<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
}

export function FilterPanel({ filters, onChange }: Props) {
  return (
    <aside className="flex w-56 flex-shrink-0 flex-col gap-5 rounded-2xl border border-amber-200/15 bg-amber-100/5 p-5 backdrop-blur-sm">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
          Tipo de contenido
        </p>
        <div className="flex flex-col gap-2">
          {TIPOS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onChange({ ...filters, tipo: value, escuelas: [], niveles: [], rangosCR: [] })}
              className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                filters.tipo === value
                  ? 'bg-amber-500/30 text-amber-200'
                  : 'text-white/60 hover:bg-amber-100/10 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {filters.tipo === 'conjuros' && (
        <>
          <Separator className="bg-amber-100/10" />
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              Escuela de magia
            </p>
            <div className="flex flex-col gap-2.5">
              {ESCUELAS.map((escuela) => (
                <label key={escuela} className="flex cursor-pointer items-center gap-2.5">
                  <Checkbox
                    checked={filters.escuelas.includes(escuela)}
                    onCheckedChange={() =>
                      onChange({ ...filters, escuelas: toggle(filters.escuelas, escuela) })
                    }
                    className="border-amber-200/30 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                  />
                  <span className="text-sm text-white/70">{escuela}</span>
                </label>
              ))}
            </div>
          </div>

          <Separator className="bg-amber-100/10" />
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              Nivel de hechizo
            </p>
            <div className="flex flex-wrap gap-2">
              {NIVELES.map((nivel) => (
                <button
                  key={nivel}
                  onClick={() =>
                    onChange({ ...filters, niveles: toggle(filters.niveles, nivel) })
                  }
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                    filters.niveles.includes(nivel)
                      ? 'bg-amber-500/40 text-amber-200'
                      : 'bg-amber-100/5 text-white/50 hover:bg-amber-100/10 hover:text-white'
                  }`}
                >
                  {nivel}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {filters.tipo === 'monstruos' && (
        <>
          <Separator className="bg-amber-100/10" />
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
              Desafío (CR)
            </p>
            <div className="flex flex-col gap-2.5">
              {RANGOS_CR.map((rango) => (
                <label key={rango} className="flex cursor-pointer items-center gap-2.5">
                  <Checkbox
                    checked={filters.rangosCR.includes(rango)}
                    onCheckedChange={() =>
                      onChange({ ...filters, rangosCR: toggle(filters.rangosCR, rango) })
                    }
                    className="border-amber-200/30 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                  />
                  <span className="text-sm text-white/70">{rango}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </aside>
  )
}

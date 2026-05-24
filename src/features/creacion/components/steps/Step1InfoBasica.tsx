import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { step1Schema, type Step1Values } from '../../types/creacion.schemas'
import { useRazas, useClases } from '../../hooks/useRazasClases'
import type { ZodIssue } from 'zod'

type Errors = Partial<Record<keyof Step1Values, string>>

interface Props {
  values: Step1Values
  onChange: (values: Step1Values) => void
  errors: Errors
}

function collectErrors(values: Step1Values): Errors {
  const result = step1Schema.safeParse(values)
  if (result.success) return {}
  const errors: Errors = {}
  result.error.issues.forEach((issue: ZodIssue) => {
    const k = issue.path[0] as keyof Step1Values
    if (!errors[k]) errors[k] = issue.message
  })
  return errors
}

export { collectErrors as validateStep1 }

export function Step1InfoBasica({ values, onChange, errors }: Props) {
  const { data: razas = [], isLoading: loadingRazas } = useRazas()
  const { data: clases = [], isLoading: loadingClases } = useClases()

  function set<K extends keyof Step1Values>(key: K, val: Step1Values[K]) {
    onChange({ ...values, [key]: val })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label className="text-white/70">Nombre del personaje</Label>
        <Input
          placeholder="Aragorn, Hermione, Drizzt…"
          value={values.nombre}
          onChange={(e) => set('nombre', e.target.value)}
          className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-purple-500/50"
        />
        {errors.nombre && <p className="text-xs text-red-400">{errors.nombre}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-white/70">Raza</Label>
        <select
          value={values.raza_id || ''}
          onChange={(e) => set('raza_id', Number(e.target.value))}
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50"
          disabled={loadingRazas}
        >
          <option value="" disabled className="bg-[#1a0a2e]">
            {loadingRazas ? 'Cargando…' : 'Selecciona una raza'}
          </option>
          {razas.map((r) => (
            <option key={r.id} value={r.id} className="bg-[#1a0a2e]">
              {r.nombre}
            </option>
          ))}
        </select>
        {errors.raza_id && <p className="text-xs text-red-400">{errors.raza_id}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-white/70">Clase</Label>
        <select
          value={values.clase_id || ''}
          onChange={(e) => set('clase_id', Number(e.target.value))}
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50"
          disabled={loadingClases}
        >
          <option value="" disabled className="bg-[#1a0a2e]">
            {loadingClases ? 'Cargando…' : 'Selecciona una clase'}
          </option>
          {clases.map((c) => (
            <option key={c.id} value={c.id} className="bg-[#1a0a2e]">
              {c.nombre}
            </option>
          ))}
        </select>
        {errors.clase_id && <p className="text-xs text-red-400">{errors.clase_id}</p>}
      </div>
    </div>
  )
}

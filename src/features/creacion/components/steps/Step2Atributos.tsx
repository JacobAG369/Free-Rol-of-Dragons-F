import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { step2Schema, type Step2Values } from '../../types/creacion.schemas'
import type { ZodIssue } from 'zod'

type Errors = Partial<Record<keyof Step2Values, string>>

function collectErrors(values: Step2Values): Errors {
  const result = step2Schema.safeParse(values)
  if (result.success) return {}
  const errors: Errors = {}
  result.error.issues.forEach((issue: ZodIssue) => {
    const k = issue.path[0] as keyof Step2Values
    if (!errors[k]) errors[k] = issue.message
  })
  return errors
}

export { collectErrors as validateStep2 }

const STATS: { key: keyof Step2Values; label: string; abbr: string }[] = [
  { key: 'fuerza', label: 'Fuerza', abbr: 'FUE' },
  { key: 'destreza', label: 'Destreza', abbr: 'DES' },
  { key: 'constitucion', label: 'Constitución', abbr: 'CON' },
  { key: 'inteligencia', label: 'Inteligencia', abbr: 'INT' },
  { key: 'sabiduria', label: 'Sabiduría', abbr: 'SAB' },
  { key: 'carisma', label: 'Carisma', abbr: 'CAR' },
]

interface Props {
  values: Step2Values
  onChange: (values: Step2Values) => void
  errors: Errors
}

function modifier(val: number): string {
  const mod = Math.floor((val - 10) / 2)
  return mod >= 0 ? `+${mod}` : `${mod}`
}

export function Step2Atributos({ values, onChange, errors }: Props) {
  function set(key: keyof Step2Values, raw: string) {
    const n = raw === '' ? 0 : parseInt(raw, 10)
    onChange({ ...values, [key]: isNaN(n) ? 0 : n })
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-white/40">Rango válido: 3 – 20 por atributo.</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {STATS.map(({ key, label, abbr }) => {
          const val = values[key]
          const mod = modifier(isNaN(val) ? 10 : val)
          return (
            <div key={key} className="flex flex-col gap-1.5">
              <Label className="text-white/70">
                {label}{' '}
                <span className="text-white/30">({abbr})</span>
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={3}
                  max={20}
                  value={val || ''}
                  onChange={(e) => set(key, e.target.value)}
                  className="border-white/10 bg-white/5 text-white focus-visible:ring-purple-500/50"
                />
                <span
                  className={`w-10 text-center text-sm font-semibold ${
                    mod.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {val >= 3 ? mod : '—'}
                </span>
              </div>
              {errors[key] && <p className="text-xs text-red-400">{errors[key]}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

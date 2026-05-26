import { Label } from '@/components/ui/label'
import { step3Schema, type Step3Values } from '../../types/creacion.schemas'
import { ALINEAMIENTOS, TRASFONDOS } from '../../types/creacion.types'
import type { ZodIssue } from 'zod'

type Errors = Partial<Record<keyof Step3Values, string>>

function collectErrors(values: Partial<Step3Values>): Errors {
  const result = step3Schema.safeParse(values)
  if (result.success) return {}
  const errors: Errors = {}
  result.error.issues.forEach((issue: ZodIssue) => {
    const k = issue.path[0] as keyof Step3Values
    if (!errors[k]) errors[k] = issue.message
  })
  return errors
}

export { collectErrors as validateStep3 }

interface Props {
  values: Partial<Step3Values>
  onChange: (values: Partial<Step3Values>) => void
  errors: Errors
}

export function Step3Trasfondo({ values, onChange, errors }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label className="text-white/70">Trasfondo</Label>
        <select
          value={values.trasfondo ?? ''}
          onChange={(e) => onChange({ ...values, trasfondo: e.target.value as Step3Values['trasfondo'] })}
          className="rounded-md border border-amber-200/15 bg-amber-100/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        >
          <option value="" disabled className="bg-[#1a0a2e]">
            Selecciona un trasfondo
          </option>
          {TRASFONDOS.map((t) => (
            <option key={t} value={t} className="bg-[#1a0a2e]">
              {t}
            </option>
          ))}
        </select>
        {errors.trasfondo && <p className="text-xs text-red-400">{errors.trasfondo}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-white/70">Alineamiento</Label>
        <div className="grid grid-cols-3 gap-2">
          {ALINEAMIENTOS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => onChange({ ...values, alineamiento: a as Step3Values['alineamiento'] })}
              className={`rounded-lg border px-2 py-2 text-xs font-medium transition-colors ${
                values.alineamiento === a
                  ? 'border-amber-500 bg-amber-500/30 text-amber-200'
                  : 'border-amber-200/15 bg-amber-100/5 text-white/50 hover:bg-amber-100/10 hover:text-white'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
        {errors.alineamiento && <p className="text-xs text-red-400">{errors.alineamiento}</p>}
      </div>
    </div>
  )
}

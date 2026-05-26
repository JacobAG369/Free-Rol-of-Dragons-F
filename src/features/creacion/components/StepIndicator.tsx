import { Check } from 'lucide-react'

const STEPS = ['Info básica', 'Atributos', 'Trasfondo', 'Resumen']

interface Props {
  current: number
}

export function StepIndicator({ current }: Props) {
  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  done
                    ? 'bg-amber-500 text-white'
                    : active
                      ? 'bg-amber-600/40 text-amber-200 ring-2 ring-amber-500'
                      : 'bg-amber-100/5 text-white/30'
                }`}
              >
                {done ? <Check size={14} /> : i + 1}
              </div>
              <span
                className={`text-xs font-medium ${
                  active ? 'text-white' : done ? 'text-amber-400' : 'text-white/30'
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`mb-5 h-px w-16 transition-colors ${done ? 'bg-amber-500' : 'bg-amber-100/10'}`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

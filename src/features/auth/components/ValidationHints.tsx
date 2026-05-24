import { Check, X } from 'lucide-react'

export interface ValidationRule {
  label: string
  test: (value: string) => boolean
}

interface Props {
  value: string
  rules: ValidationRule[]
  visible: boolean
}

export function ValidationHints({ value, rules, visible }: Props) {
  if (!visible) return null

  return (
    <ul className="flex flex-col gap-1.5 rounded-lg border border-white/10 bg-white/5 p-3">
      {rules.map((rule) => {
        const passes = rule.test(value)
        return (
          <li
            key={rule.label}
            className={`flex items-center gap-2 text-xs transition-colors ${
              passes ? 'text-green-400' : 'text-white/40'
            }`}
          >
            {passes ? (
              <Check size={12} className="flex-shrink-0 text-green-400" />
            ) : (
              <X size={12} className="flex-shrink-0 text-red-400/60" />
            )}
            {rule.label}
          </li>
        )
      })}
    </ul>
  )
}

export const PASSWORD_RULES: ValidationRule[] = [
  { label: 'Mínimo 8 caracteres', test: (v) => v.length >= 8 },
  { label: 'Al menos una letra mayúscula', test: (v) => /[A-Z]/.test(v) },
  { label: 'Al menos una letra minúscula', test: (v) => /[a-z]/.test(v) },
  { label: 'Al menos un carácter especial (!@#$…)', test: (v) => /[^A-Za-z0-9]/.test(v) },
]

export const USERNAME_RULES: ValidationRule[] = [
  { label: 'Mínimo 3 caracteres', test: (v) => v.length >= 3 },
  { label: 'Máximo 30 caracteres', test: (v) => v.length > 0 && v.length <= 30 },
  { label: 'Solo letras, números y guión bajo', test: (v) => v.length > 0 && /^[A-Za-z0-9_]+$/.test(v) },
]

import type { Clase, Raza } from '../../types/creacion.types'
import type { Step1Values, Step2Values, Step3Values } from '../../types/creacion.schemas'

interface Props {
  step1: Step1Values
  step2: Step2Values
  step3: Partial<Step3Values>
  raza: Raza | undefined
  clase: Clase | undefined
}

function mod(stat: number): string {
  const m = Math.floor((stat - 10) / 2)
  return m >= 0 ? `+${m}` : `${m}`
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between py-1.5 text-sm">
      <span className="text-white/50">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  )
}

const STATS: [keyof Step2Values, string][] = [
  ['fuerza', 'FUE'], ['destreza', 'DES'], ['constitucion', 'CON'],
  ['inteligencia', 'INT'], ['sabiduria', 'SAB'], ['carisma', 'CAR'],
]

export function Step4Resumen({ step1, step2, step3, raza, clase }: Props) {
  const conMod = Math.floor((step2.constitucion - 10) / 2)
  const dexMod = Math.floor((step2.destreza - 10) / 2)
  const dadoGolpe = parseInt((clase?.dado_golpe ?? 'd8').replace('d', ''), 10)
  const maxHP = Math.max(1, dadoGolpe + conMod)

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
          Información básica
        </p>
        <Row label="Nombre" value={step1.nombre} />
        <Row label="Raza" value={raza?.nombre ?? '—'} />
        <Row label="Clase" value={`${clase?.nombre ?? '—'} (${clase?.dado_golpe ?? '—'})`} />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
          Atributos
        </p>
        <div className="grid grid-cols-3 gap-2">
          {STATS.map(([key, abbr]) => (
            <div key={key} className="flex flex-col items-center rounded-lg bg-white/5 py-2">
              <span className="text-xs text-white/40">{abbr}</span>
              <span className="text-lg font-bold text-white">{step2[key]}</span>
              <span className="text-xs text-purple-300">{mod(step2[key])}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/40">
          Trasfondo y personalidad
        </p>
        <Row label="Trasfondo" value={step3.trasfondo ?? '—'} />
        <Row label="Alineamiento" value={step3.alineamiento ?? '—'} />
      </div>

      <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-purple-300/60">
          Stats calculados (nivel 1)
        </p>
        <Row label="Puntos de golpe máx." value={maxHP} />
        <Row label="Clase de armadura base" value={10 + dexMod} />
      </div>
    </div>
  )
}

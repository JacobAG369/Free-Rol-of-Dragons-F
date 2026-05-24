import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import type { Monstruo } from '../types/compendio.types'

interface Props {
  monstruo: Monstruo
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-xs font-semibold text-white/40 uppercase">{label}</span>
      <span className="text-sm font-bold text-white">{value}</span>
    </div>
  )
}

export function MonstruoCard({ monstruo }: Props) {
  return (
    <Card className="border-white/10 bg-white/5 text-white transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/8">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-white">{monstruo.nombre}</CardTitle>
          <span className="flex-shrink-0 rounded-md bg-red-500/20 px-2 py-0.5 text-xs font-semibold text-red-300">
            CR {monstruo.desafio}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex gap-3 text-sm text-white/60">
          <span>CA {monstruo.clase_armadura}</span>
          <span>·</span>
          <span>{monstruo.puntos_golpe} PG</span>
        </div>
        <div className="grid grid-cols-6 gap-1 rounded-lg bg-white/5 p-2">
          <Stat label="FUE" value={monstruo.fuerza} />
          <Stat label="DES" value={monstruo.destreza} />
          <Stat label="CON" value={monstruo.constitucion} />
          <Stat label="INT" value={monstruo.inteligencia} />
          <Stat label="SAB" value={monstruo.sabiduria} />
          <Stat label="CAR" value={monstruo.carisma} />
        </div>
      </CardContent>
    </Card>
  )
}

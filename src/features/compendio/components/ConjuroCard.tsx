import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import type { Conjuro } from '../types/compendio.types'

const ESCUELA_COLOR: Record<string, string> = {
  Evocación: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  Conjuración: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Abjuración: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Encantamiento: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
}

const fallbackColor = 'bg-purple-500/20 text-purple-300 border-purple-500/30'

interface Props {
  conjuro: Conjuro
}

export function ConjuroCard({ conjuro }: Props) {
  const escuelaClass = ESCUELA_COLOR[conjuro.escuela] ?? fallbackColor
  return (
    <Card className="border-white/10 bg-white/5 text-white transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/8">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-white">{conjuro.nombre}</CardTitle>
          <span className="flex-shrink-0 rounded-md bg-white/10 px-2 py-0.5 text-xs font-semibold text-white/60">
            Niv. {conjuro.nivel}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          <Badge className={`border text-xs ${escuelaClass}`}>{conjuro.escuela}</Badge>
          {conjuro.concentracion && (
            <Badge className="border border-white/20 bg-white/10 text-xs text-white/60">
              Concentración
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-white/50">{conjuro.descripcion}</p>
      </CardContent>
    </Card>
  )
}

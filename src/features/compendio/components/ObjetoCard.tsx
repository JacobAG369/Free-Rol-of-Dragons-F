import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import type { Objeto } from '../types/compendio.types'

const RAREZA_COLOR: Record<string, string> = {
  común: 'bg-amber-100/10 text-white/60 border-amber-200/25',
  infrecuente: 'bg-green-500/20 text-green-300 border-green-500/30',
  raro: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'muy raro': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  legendario: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
}

const fallbackColor = 'bg-amber-100/10 text-white/60 border-amber-200/25'

interface Props {
  objeto: Objeto
}

export function ObjetoCard({ objeto }: Props) {
  const rarezaClass = RAREZA_COLOR[objeto.rareza.toLowerCase()] ?? fallbackColor
  return (
    <Card className="border-amber-200/15 bg-amber-100/5 text-white transition-all hover:-translate-y-0.5 hover:border-amber-200/25 hover:bg-amber-100/8">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-white">{objeto.nombre}</CardTitle>
          {objeto.es_magico && (
            <span className="flex-shrink-0 rounded-md bg-amber-500/20 px-2 py-0.5 text-xs font-semibold text-amber-300">
              Mágico
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          <Badge className={`border text-xs ${rarezaClass}`}>{objeto.rareza}</Badge>
          <Badge className="border border-amber-200/25 bg-amber-100/10 text-xs text-white/50">
            {objeto.categoria}
          </Badge>
        </div>
      </CardHeader>
      <CardContent />
    </Card>
  )
}

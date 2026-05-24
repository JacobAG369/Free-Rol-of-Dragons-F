import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import type { Objeto } from '../types/compendio.types'

const RAREZA_COLOR: Record<string, string> = {
  común: 'bg-white/10 text-white/60 border-white/20',
  infrecuente: 'bg-green-500/20 text-green-300 border-green-500/30',
  raro: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'muy raro': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  legendario: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
}

const fallbackColor = 'bg-white/10 text-white/60 border-white/20'

interface Props {
  objeto: Objeto
}

export function ObjetoCard({ objeto }: Props) {
  const rarezaClass = RAREZA_COLOR[objeto.rareza.toLowerCase()] ?? fallbackColor
  return (
    <Card className="border-white/10 bg-white/5 text-white transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/8">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-white">{objeto.nombre}</CardTitle>
          {objeto.es_magico && (
            <span className="flex-shrink-0 rounded-md bg-purple-500/20 px-2 py-0.5 text-xs font-semibold text-purple-300">
              Mágico
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          <Badge className={`border text-xs ${rarezaClass}`}>{objeto.rareza}</Badge>
          <Badge className="border border-white/20 bg-white/10 text-xs text-white/50">
            {objeto.categoria}
          </Badge>
        </div>
      </CardHeader>
      <CardContent />
    </Card>
  )
}

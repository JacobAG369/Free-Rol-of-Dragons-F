import { createFileRoute, Link } from '@tanstack/react-router'
import { BookOpen, Wand2, Map } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

export const Route = createFileRoute('/')({ component: Home })

const modules = [
  {
    to: '/compendio',
    icon: BookOpen,
    title: 'Compendio',
    description:
      'Consulta razas, clases, hechizos y monstruos del SRD con búsqueda y filtros.',
  },
  {
    to: '/creacion',
    icon: Wand2,
    title: 'Creación',
    description:
      'Crea personajes y contenido homebrew paso a paso en tiempo real.',
  },
  {
    to: '/campana',
    icon: Map,
    title: 'Campaña',
    description:
      'Panel del Director de Juego para gestionar mundos, notas y marcadores.',
  },
] as const

function Home() {
  return (
    <div className="flex flex-col items-center gap-12 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-wide text-white">
          Free Rol of Dragons
        </h1>
        <p className="mt-3 text-white/60">
          Elige un módulo para comenzar tu aventura
        </p>
      </div>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
        {modules.map(({ to, icon: Icon, title, description }) => (
          <Link key={to} to={to} className="no-underline">
            <Card className="h-full cursor-pointer border-white/10 bg-white/5 text-white transition-all hover:-translate-y-1 hover:bg-white/10 hover:border-white/20">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20">
                  <Icon size={20} className="text-purple-300" />
                </div>
                <CardTitle className="text-white">{title}</CardTitle>
                <CardDescription className="text-white/50">
                  {description}
                </CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { UserPlus, Wand2, ArrowLeft } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { CrearPersonajeWizard } from './CrearPersonajeWizard'

type View = 'menu' | 'personaje'

export function CreacionPage() {
  const [view, setView] = useState<View>('menu')

  if (view === 'personaje') {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView('menu')}
            className="flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Volver
          </button>
          <h1 className="text-2xl font-bold text-white">Creación de Personaje</h1>
        </div>
        <div className="mx-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <CrearPersonajeWizard />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-wide text-white">Centro de Creación</h1>
        <p className="mt-2 text-white/50">
          Da vida a tus héroes y crea el mundo que quieras jugar
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        <button onClick={() => setView('personaje')} className="text-left">
          <Card className="h-full cursor-pointer border-white/10 bg-white/5 text-white transition-all hover:-translate-y-1 hover:border-purple-500/40 hover:bg-white/8">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20">
                <UserPlus size={20} className="text-purple-300" />
              </div>
              <CardTitle className="text-white">Crear Personaje</CardTitle>
              <CardDescription className="text-white/50">
                Diseña tu héroe paso a paso con un formulario interactivo guiado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-1.5 text-sm text-white/40">
                <li>· Selección de raza y clase</li>
                <li>· Asignación de atributos</li>
                <li>· Trasfondo y alineamiento</li>
                <li>· Equipamiento inicial</li>
              </ul>
            </CardContent>
          </Card>
        </button>

        <Card className="h-full border-white/5 bg-white/3 text-white opacity-50">
          <CardHeader>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
              <Wand2 size={20} className="text-white/40" />
            </div>
            <CardTitle className="text-white/60">Contenido Homebrew</CardTitle>
            <CardDescription className="text-white/30">
              Crea hechizos, objetos mágicos y reglas personalizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-1.5 text-sm text-white/25">
              <li>· Nuevos hechizos y magias</li>
              <li>· Objetos mágicos únicos</li>
              <li>· Reglas de casa</li>
              <li>· Razas y clases custom</li>
            </ul>
            <p className="mt-4 text-xs text-white/25 italic">Próximamente…</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

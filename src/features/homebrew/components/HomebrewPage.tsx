import { useState } from 'react'
import { ArrowLeft, Sparkles, Swords, Skull } from 'lucide-react'
import { HechizoForm } from './forms/HechizoForm'
import { ObjetoForm } from './forms/ObjetoForm'
import { MonstruoForm } from './forms/MonstruoForm'

type HomebrewView = 'menu' | 'hechizo' | 'objeto' | 'monstruo'

const TIPOS = [
  {
    id: 'hechizo' as const,
    label: 'Hechizo',
    description: 'Crea un hechizo personalizado con su escuela y nivel',
    icon: Sparkles,
    color: 'text-blue-300',
    bg: 'bg-blue-500/20',
  },
  {
    id: 'objeto' as const,
    label: 'Objeto',
    description: 'Diseña un arma, armadura u objeto mágico único',
    icon: Swords,
    color: 'text-amber-300',
    bg: 'bg-amber-500/20',
  },
  {
    id: 'monstruo' as const,
    label: 'Monstruo',
    description: 'Da vida a una criatura con sus acciones de combate',
    icon: Skull,
    color: 'text-red-300',
    bg: 'bg-red-500/20',
  },
]

const FORM_TITLE: Record<Exclude<HomebrewView, 'menu'>, string> = {
  hechizo: 'Nuevo Hechizo',
  objeto: 'Nuevo Objeto',
  monstruo: 'Nuevo Monstruo',
}

export function HomebrewPage() {
  const [view, setView] = useState<HomebrewView>('menu')

  if (view !== 'menu') {
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
          <h1 className="text-2xl font-bold text-white">{FORM_TITLE[view]}</h1>
        </div>
        <div className="mx-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          {view === 'hechizo' && <HechizoForm onSuccess={() => setView('menu')} />}
          {view === 'objeto' && <ObjetoForm onSuccess={() => setView('menu')} />}
          {view === 'monstruo' && <MonstruoForm onSuccess={() => setView('menu')} />}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-wide text-white">Contenido Homebrew</h1>
        <p className="mt-2 text-white/50">
          Crea hechizos, objetos y criaturas únicas para tus aventuras
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
        {TIPOS.map(({ id, label, description, icon: Icon, color, bg }) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-all hover:-translate-y-1 hover:border-purple-500/40 hover:bg-white/8"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}>
              <Icon size={20} className={color} />
            </div>
            <div>
              <p className="font-semibold text-white">{label}</p>
              <p className="mt-1 text-sm text-white/50">{description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

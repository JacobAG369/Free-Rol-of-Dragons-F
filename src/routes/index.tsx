import { createFileRoute, Link } from '@tanstack/react-router'
import { BookOpen, Wand2, Map } from 'lucide-react'

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
      'Forja personajes y contenido homebrew paso a paso, en tiempo real.',
  },
  {
    to: '/campana',
    icon: Map,
    title: 'Campaña',
    description:
      'La mesa del Director de Juego: mundos, notas y marcadores en un solo lugar.',
  },
] as const

function Home() {
  return (
    <div className="flex flex-col items-center gap-16 py-10">
      <section className="rise-in relative flex flex-col items-center text-center">
        <img
          src="/favicon.svg"
          alt="Emblema del dragón"
          className="ember-glow h-24 w-24 drop-shadow-[0_0_22px_rgba(201,162,75,0.35)]"
        />
        <p className="kicker mt-6">Crónicas de mesa · Quinta edición</p>
        <h1 className="display-title mt-3 text-5xl font-bold text-amber-100 sm:text-6xl">
          Free Rol of Dragons
        </h1>
        <div className="gold-rule mt-5 w-full max-w-md">✦</div>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-amber-100/70">
          Reúne a tu compañía, abre el grimorio y deja que caigan los dados.
          Todo lo que tu campaña necesita, de la creación del héroe a la mesa del Director.
        </p>
      </section>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
        {modules.map(({ to, icon: Icon, title, description }, i) => (
          <Link
            key={to}
            to={to}
            className="tome tome-link rise-in group flex h-full flex-col gap-4 p-6 no-underline"
            style={{ animationDelay: `${120 + i * 90}ms` }}
          >
            <div className="sigil h-12 w-12">
              <Icon size={22} />
            </div>
            <h2 className="font-display text-xl text-amber-100">{title}</h2>
            <p className="text-[0.95rem] leading-relaxed text-amber-100/60">
              {description}
            </p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-amber-300/80 transition-colors group-hover:text-amber-200">
              Entrar
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

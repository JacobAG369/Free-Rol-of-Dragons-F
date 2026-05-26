import { Link } from '@tanstack/react-router'
import { Home, BookOpen, Wand2, Map, Users, LogIn, LogOut } from 'lucide-react'
import { useAuth } from '@/features/auth'

const publicLinks = [
  { to: '/', label: 'Inicio', icon: Home },
  { to: '/compendio', label: 'Compendio', icon: BookOpen },
] as const

const authLinks = [
  { to: '/creacion', label: 'Creación', icon: Wand2 },
  { to: '/mis-personajes', label: 'Personajes', icon: Users },
  { to: '/campana', label: 'Campaña', icon: Map },
] as const

export default function Header() {
  const { user, logout } = useAuth()
  const navLinks = user ? [...publicLinks, ...authLinks] : publicLinks

  return (
    <header className="sticky top-0 z-50 border-b border-amber-200/15 bg-[#0d0905]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link to="/" className="group flex items-center gap-3 no-underline">
          <img
            src="/favicon.svg"
            alt=""
            aria-hidden
            className="h-9 w-9 drop-shadow-[0_0_8px_rgba(201,162,75,0.25)] transition-transform group-hover:scale-105"
          />
          <span className="flex flex-col leading-none">
            <span className="wordmark text-sm text-amber-200 sm:text-[0.95rem]">
              FREE ROL OF DRAGONS
            </span>
            <span className="mt-0.5 hidden text-[0.6rem] uppercase tracking-[0.34em] text-amber-200/40 sm:block">
              Crónicas de mesa
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to as string}
              className="nav-link gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-amber-100/5"
              activeProps={{
                className:
                  'nav-link is-active gap-2 rounded-md px-3 py-2 text-sm font-medium bg-amber-100/8 ring-1 ring-amber-300/20',
              }}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-sm text-amber-200/50 sm:inline">
                {user.username}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 rounded-md border border-amber-200/15 px-3 py-2 text-sm font-medium text-amber-200/70 transition-colors hover:border-amber-300/40 hover:text-amber-100"
              >
                <LogOut size={15} />
                Salir
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-md border border-amber-300/40 bg-gradient-to-b from-amber-400/20 to-amber-700/10 px-4 py-2 text-sm font-semibold text-amber-100 no-underline shadow-[0_0_14px_rgba(201,162,75,0.15)] transition-colors hover:from-amber-400/30 hover:to-amber-700/20"
            >
              <LogIn size={15} />
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

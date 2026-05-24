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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-bold tracking-widest text-white no-underline">
          FREE ROL OF DRAGONS
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to as string}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white/70 no-underline transition-colors hover:bg-white/10 hover:text-white"
              activeProps={{ className: 'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white no-underline bg-white/10' }}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-sm text-white/50">{user.username}</span>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <LogOut size={15} />
                Salir
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-lg bg-purple-600/30 px-3 py-2 text-sm font-medium text-purple-200 no-underline transition-colors hover:bg-purple-600/50"
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

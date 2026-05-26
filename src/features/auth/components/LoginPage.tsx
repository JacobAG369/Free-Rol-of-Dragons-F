import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginSchema, type LoginFormValues } from '../types/auth.schemas'
import { useLogin } from '../hooks/useLogin'

type FieldErrors = Partial<Record<keyof LoginFormValues, string>>

export function LoginPage() {
  const navigate = useNavigate()
  const { mutate: login, isPending, error } = useLogin()
  const [form, setForm] = useState<LoginFormValues>({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const apiError = error
    ? (() => {
        try {
          const parsed = JSON.parse(error.message)
          return parsed.detail ?? 'Credenciales incorrectas.'
        } catch {
          return 'Error al iniciar sesión.'
        }
      })()
    : null

  function handleSubmit() {
    const result = loginSchema.safeParse(form)
    if (!result.success) {
      const errors: FieldErrors = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LoginFormValues
        if (!errors[field]) errors[field] = issue.message
      })
      setFieldErrors(errors)
      return
    }
    setFieldErrors({})
    login(result.data, { onSuccess: () => navigate({ to: '/' }) })
  }

  function field(name: keyof LoginFormValues, value: string) {
    setForm((f) => ({ ...f, [name]: value }))
    if (fieldErrors[name]) setFieldErrors((e) => ({ ...e, [name]: undefined }))
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-md border-amber-200/15 bg-amber-100/5 text-white backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Iniciar sesión</CardTitle>
          <CardDescription className="text-white/50">
            Accede a tu cuenta para continuar tu aventura
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="flex flex-col gap-4" noValidate>
            <div className="flex flex-col gap-1.5">
              <Label className="text-white/70">Correo electrónico</Label>
              <Input
                type="email"
                placeholder="heroe@taverna.com"
                value={form.email}
                onChange={(e) => field('email', e.target.value)}
                className="border-amber-200/15 bg-amber-100/5 text-white placeholder:text-white/30 focus-visible:ring-amber-500/50"
              />
              {fieldErrors.email && (
                <p className="text-xs text-red-400">{fieldErrors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-white/70">Contraseña</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => field('password', e.target.value)}
                className="border-amber-200/15 bg-amber-100/5 text-white placeholder:text-white/30 focus-visible:ring-amber-500/50"
              />
              {fieldErrors.password && (
                <p className="text-xs text-red-400">{fieldErrors.password}</p>
              )}
            </div>

            {apiError && (
              <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {apiError}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="mt-1 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-500 disabled:opacity-50"
            >
              {isPending ? 'Entrando…' : 'Entrar'}
            </button>

            <p className="text-center text-sm text-white/40">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="text-amber-400 hover:text-amber-300">
                Regístrate
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

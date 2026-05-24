import { createFileRoute } from '@tanstack/react-router'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { MisPersonajesPage } from '@/features/mis-personajes'

export const Route = createFileRoute('/mis-personajes')({ component: MisPersonajes })

function MisPersonajes() {
  return (
    <ProtectedRoute>
      <MisPersonajesPage />
    </ProtectedRoute>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { CreacionPage } from '@/features/creacion'

export const Route = createFileRoute('/creacion')({ component: Creacion })

function Creacion() {
  return (
    <ProtectedRoute>
      <CreacionPage />
    </ProtectedRoute>
  )
}

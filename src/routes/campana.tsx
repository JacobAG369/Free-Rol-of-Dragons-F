import { createFileRoute } from '@tanstack/react-router'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { CampanaPage } from '@/features/campana'

export const Route = createFileRoute('/campana')({ component: Campana })

function Campana() {
  return (
    <ProtectedRoute>
      <CampanaPage />
    </ProtectedRoute>
  )
}

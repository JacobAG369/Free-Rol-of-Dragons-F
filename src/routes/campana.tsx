import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/campana')({ component: Campana })

function Campana() {
  return <div className="text-white">Campaña — próximamente</div>
}

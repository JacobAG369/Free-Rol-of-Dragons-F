import { useMutation, useQueryClient } from '@tanstack/react-query'
import { asignacionApi } from '../api/asignacion.api'

export function useAsignarPersonaje() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ personajeId, campanaId }: { personajeId: number; campanaId: number }) =>
      asignacionApi.asignarACampana(personajeId, campanaId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personajes'] }),
  })
}

export function useRetirarPersonaje() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (personajeId: number) => asignacionApi.retirarDeCampana(personajeId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['personajes'] }),
  })
}

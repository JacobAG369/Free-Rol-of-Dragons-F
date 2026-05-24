import { useMutation, useQueryClient } from '@tanstack/react-query'
import { campanasApi } from '../api/campanas.api'

export function useActualizarNotas() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, notas }: { id: number; notas: string }) =>
      campanasApi.actualizarNotas(id, notas),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['campanas'] }),
  })
}

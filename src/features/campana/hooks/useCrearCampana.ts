import { useMutation, useQueryClient } from '@tanstack/react-query'
import { campanasApi } from '../api/campanas.api'

export function useCrearCampana() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: campanasApi.crear,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['campanas'] }),
  })
}

import { useMutation } from '@tanstack/react-query'
import { personajesApi } from '../api/personajes.api'
import type { Clase } from '../types/creacion.types'
import type { Step1Values, Step2Values, Step3Values } from '../types/creacion.schemas'

function modif(stat: number) {
  return Math.floor((stat - 10) / 2)
}

function parseDadoGolpe(dado: string): number {
  const n = parseInt(dado.replace('d', ''), 10)
  return isNaN(n) ? 8 : n
}

interface CreatePayload {
  step1: Step1Values
  step2: Step2Values
  step3: Step3Values
  clase: Clase
}

export function useCrearPersonaje() {
  return useMutation({
    mutationFn: async ({ step1, step2, step3, clase }: CreatePayload) => {
      const conMod = modif(step2.constitucion)
      const dexMod = modif(step2.destreza)
      const maxHP = parseDadoGolpe(clase.dado_golpe) + conMod

      const personaje = await personajesApi.crear({
        nombre: step1.nombre,
        raza: step1.raza_id,
        trasfondo: step3.trasfondo,
        alineamiento: step3.alineamiento,
        fuerza: step2.fuerza,
        destreza: step2.destreza,
        constitucion: step2.constitucion,
        inteligencia: step2.inteligencia,
        sabiduria: step2.sabiduria,
        carisma: step2.carisma,
        puntos_golpe_max: Math.max(1, maxHP),
        puntos_golpe_actuales: Math.max(1, maxHP),
        clase_armadura: 10 + dexMod,
      })

      await personajesApi.asignarClase({
        personaje: personaje.id,
        clase: step1.clase_id,
        nivel_en_clase: 1,
      })

      return personaje
    },
  })
}

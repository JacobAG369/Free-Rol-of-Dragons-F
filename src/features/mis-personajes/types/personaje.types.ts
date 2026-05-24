export interface PersonajeClaseItem {
  id: number
  personaje: number
  clase: number
  clase_nombre: string
  nivel_en_clase: number
}

export interface Personaje {
  id: number
  nombre: string
  campana: number | null
  raza: number
  raza_nombre: string
  trasfondo: string
  alineamiento: string
  experiencia: number
  fuerza: number
  destreza: number
  constitucion: number
  inteligencia: number
  sabiduria: number
  carisma: number
  puntos_golpe_max: number
  puntos_golpe_actuales: number
  clase_armadura: number
  clases: PersonajeClaseItem[]
}

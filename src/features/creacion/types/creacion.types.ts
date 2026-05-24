export interface Raza {
  id: number
  nombre: string
}

export interface Clase {
  id: number
  nombre: string
  dado_golpe: string
}

export interface PersonajePayload {
  nombre: string
  raza: number
  trasfondo: string
  alineamiento: string
  fuerza: number
  destreza: number
  constitucion: number
  inteligencia: number
  sabiduria: number
  carisma: number
  puntos_golpe_max: number
  puntos_golpe_actuales: number
  clase_armadura: number
}

export interface PersonajeClasePayload {
  personaje: number
  clase: number
  nivel_en_clase: number
}

export const TRASFONDOS = [
  'Acólito', 'Artesano Gremial', 'Artista', 'Charlatán', 'Criminal',
  'Ermitaño', 'Forajido', 'Héroe del Pueblo', 'Marinero', 'Noble',
  'Pícaro Callejero', 'Sabio', 'Soldado',
] as const

export const ALINEAMIENTOS = [
  'Legal Bueno', 'Neutral Bueno', 'Caótico Bueno',
  'Legal Neutral', 'Neutral', 'Caótico Neutral',
  'Legal Malo', 'Neutral Malo', 'Caótico Malo',
] as const

export interface Campana {
  id: number
  nombre: string
  director: string
  notas_generales: string
  fecha_creacion: string
}

export interface CampanaPayload {
  nombre: string
  notas_generales: string
}

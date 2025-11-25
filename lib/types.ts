export interface Plant {
  id: string
  name: string
  scientificName: string
  description: string | null
  price: number
  images: string[]
  availableSizes: PlantSizeOption[]
  featured: boolean
  category: string
  stock: number
}

export interface PlantSizeOption {
  size: Size
  price: number
}

export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL'

export const sizeLabels: Record<Size, string> = {
  S: 'Pequeño',
  M: 'Mediano',
  L: 'Grande',
  XL: 'Extra Grande',
  XXL: 'Super Grande'
}

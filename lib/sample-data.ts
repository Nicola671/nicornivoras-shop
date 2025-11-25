import { Plant } from './types'

export const samplePlants: Plant[] = [
  {
    id: '1',
    name: 'Venus Atrapamoscas',
    scientificName: 'Dionaea muscipula',
    description: 'La Venus atrapamoscas es una de las plantas carnívoras más populares. Sus hojas modificadas forman trampas que se cierran rápidamente cuando un insecto las toca. Perfecta para principiantes.',
    price: 2500,
    images: [
      'https://images.unsplash.com/photo-1593482892290-f54927ae1bb2?w=800',
      'https://images.unsplash.com/photo-1593482892290-f54927ae1bb2?w=800'
    ],
    availableSizes: [
      { size: 'S', price: 2000 },
      { size: 'M', price: 2500 },
      { size: 'L', price: 3000 }
    ],
    featured: true,
    category: 'Dionaea',
    stock: 5
  },
  {
    id: '2',
    name: 'Drosera Capensis',
    scientificName: 'Drosera capensis',
    description: 'Planta carnívora sudafricana conocida por sus hojas cubiertas de pelos pegajosos. Fácil de cultivar y muy atractiva con sus gotas de rocío brillantes.',
    price: 1800,
    images: [
      'https://images.unsplash.com/photo-1585662173536-851d68e1c0f5?w=800',
      'https://images.unsplash.com/photo-1585662173536-851d68e1c0f5?w=800'
    ],
    availableSizes: [
      { size: 'S', price: 1500 },
      { size: 'M', price: 1800 }
    ],
    featured: true,
    category: 'Drosera',
    stock: 8
  },
  {
    id: '3',
    name: 'Nepenthes Alata',
    scientificName: 'Nepenthes alata',
    description: 'Planta jarro tropical con trampas colgantes espectaculares. Requiere alta humedad y luz indirecta. Una joya para cualquier colección.',
    price: 3500,
    images: [
      'https://images.unsplash.com/photo-1578073804458-927d0b79e498?w=800',
      'https://images.unsplash.com/photo-1578073804458-927d0b79e498?w=800'
    ],
    availableSizes: [
      { size: 'M', price: 3000 },
      { size: 'L', price: 3500 },
      { size: 'XL', price: 4000 }
    ],
    featured: true,
    category: 'Nepenthes',
    stock: 3
  },
  {
    id: '4',
    name: 'Sarracenia Purpurea',
    scientificName: 'Sarracenia purpurea',
    description: 'Planta carnívora norteamericana resistente al frío. Sus jarros bajos y anchos se llenan de agua de lluvia para atrapar insectos.',
    price: 2800,
    images: [
      'https://images.unsplash.com/photo-1612363148951-31d489e1f77c?w=800',
      'https://images.unsplash.com/photo-1612363148951-31d489e1f77c?w=800'
    ],
    availableSizes: [
      { size: 'S', price: 2200 },
      { size: 'M', price: 2800 },
      { size: 'L', price: 3300 },
      { size: 'XL', price: 3800 }
    ],
    featured: false,
    category: 'Sarracenia',
    stock: 6
  },
  {
    id: '5',
    name: 'Pinguicula Moranensis',
    scientificName: 'Pinguicula moranensis',
    description: 'Planta carnívora mexicana con hojas pegajosas y hermosas flores púrpuras. Ideal para cultivo en interior.',
    price: 2000,
    images: [
      'https://images.unsplash.com/photo-1616608593065-d3e5f93b7b2e?w=800',
      'https://images.unsplash.com/photo-1616608593065-d3e5f93b7b2e?w=800'
    ],
    availableSizes: [
      { size: 'S', price: 1800 },
      { size: 'M', price: 2000 }
    ],
    featured: false,
    category: 'Pinguicula',
    stock: 4
  },
  {
    id: '6',
    name: 'Drosera Aliciae',
    scientificName: 'Drosera aliciae',
    description: 'Pequeña drosera en forma de roseta, muy compacta y colorida. Perfecta para terrarios o espacios pequeños.',
    price: 1500,
    images: [
      'https://images.unsplash.com/photo-1551732998-957e2972b6d4?w=800',
      'https://images.unsplash.com/photo-1551732998-957e2972b6d4?w=800'
    ],
    availableSizes: [
      { size: 'S', price: 1500 }
    ],
    featured: false,
    category: 'Drosera',
    stock: 10
  }
]

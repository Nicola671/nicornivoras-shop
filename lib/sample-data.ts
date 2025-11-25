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
    availableSizes: ['S', 'M', 'L'],
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
    availableSizes: ['S', 'M'],
    featured: true,
    category: 'Drosera',
    stock: 8
  },
  {
    id: '3',
    name: 'Nepenthes',
    scientificName: 'Nepenthes alata',
    description: 'Planta trepadora tropical con jarras colgantes que atrapan insectos. Sus jarras pueden alcanzar tamaños impresionantes y son muy decorativas.',
    price: 3500,
    images: [
      'https://images.unsplash.com/photo-1578073804458-927d0b79e498?w=800',
      'https://images.unsplash.com/photo-1578073804458-927d0b79e498?w=800'
    ],
    availableSizes: ['M', 'L', 'XL'],
    featured: true,
    category: 'Nepenthes',
    stock: 3
  },
  {
    id: '4',
    name: 'Sarracenia Purpurea',
    scientificName: 'Sarracenia purpurea',
    description: 'Planta carnívora norteamericana con hojas en forma de jarra. Muy resistente al frío y perfecta para exteriores.',
    price: 2800,
    images: [
      'https://images.unsplash.com/photo-1612363148951-31d489e1f77c?w=800',
      'https://images.unsplash.com/photo-1612363148951-31d489e1f77c?w=800'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    featured: false,
    category: 'Sarracenia',
    stock: 6
  },
  {
    id: '5',
    name: 'Pinguicula',
    scientificName: 'Pinguicula moranensis',
    description: 'Planta carnívora mexicana con hojas pegajosas y hermosas flores púrpuras. Ideal para cultivo en interior.',
    price: 2000,
    images: [
      'https://images.unsplash.com/photo-1616608593065-d3e5f93b7b2e?w=800',
      'https://images.unsplash.com/photo-1616608593065-d3e5f93b7b2e?w=800'
    ],
    availableSizes: ['S', 'M'],
    featured: false,
    category: 'Pinguicula',
    stock: 4
  },
  {
    id: '6',
    name: 'Drosera Aliciae',
    scientificName: 'Drosera aliciae',
    description: 'Pequeña drosera sudafricana que forma rosetas compactas. Sus hojas rojas cubiertas de tentáculos brillantes son espectaculares.',
    price: 1500,
    images: [
      'https://images.unsplash.com/photo-1585662173536-851d68e1c0f5?w=800',
      'https://images.unsplash.com/photo-1585662173536-851d68e1c0f5?w=800'
    ],
    availableSizes: ['S'],
    featured: false,
    category: 'Drosera',
    stock: 10
  }
]

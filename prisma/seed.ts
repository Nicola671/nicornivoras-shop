import { PrismaClient, Size } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const samplePlants = [
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
    name: 'Nepenthes',
    scientificName: 'Nepenthes alata',
    description: 'Planta trepadora tropical con jarras colgantes que atrapan insectos. Sus jarras pueden alcanzar tamaños impresionantes y son muy decorativas.',
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
    description: 'Planta carnívora norteamericana con hojas en forma de jarra. Muy resistente al frío y perfecta para exteriores.',
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
    name: 'Pinguicula',
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
    description: 'Pequeña drosera sudafricana que forma rosetas compactas. Sus hojas rojas cubiertas de tentáculos brillantes son espectaculares.',
    price: 1500,
    images: [
      'https://images.unsplash.com/photo-1585662173536-851d68e1c0f5?w=800',
      'https://images.unsplash.com/photo-1585662173536-851d68e1c0f5?w=800'
    ],
    availableSizes: [
      { size: 'S', price: 1500 }
    ],
    featured: false,
    category: 'Drosera',
    stock: 10
  }
]

async function main() {
  console.log(`Start seeding ...`)

  // Create user
  const hashedPassword = await bcrypt.hash('47413289', 10)
  const user = await prisma.user.upsert({
    where: { username: 'nicornivoras' },
    update: {
      password: hashedPassword,
    },
    create: {
      username: 'nicornivoras',
      password: hashedPassword,
    },
  })
  console.log(`Created user with id: ${user.id}`)

  // Create plants
  for (const plantData of samplePlants) {
    const { images, availableSizes, ...rest } = plantData
    const plant = await prisma.plant.create({
      data: {
        ...rest,
        availableSizes: {
          create: availableSizes.map((sizeOption: any) => ({
            size: sizeOption.size,
            price: sizeOption.price
          })),
        } as any,
        images: {
          create: images.map((url) => ({ url })),
        },
      },
    })
    console.log(`Created plant with id: ${plant.id}`)
  }

  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

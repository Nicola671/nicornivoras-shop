import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Crear usuario admin
        const hashedPassword = await bcrypt.hash('47413289', 10);
        const user = await prisma.user.upsert({
            where: { username: 'nicornivoras' },
            update: {},
            create: {
                username: 'nicornivoras',
                password: hashedPassword,
            },
        });

        // Crear plantas de ejemplo
        const plantsData = [
            {
                name: 'Venus Atrapamoscas',
                scientificName: 'Dionaea muscipula',
                description: 'La planta carnívora más icónica del mundo.',
                price: 2500,
                category: 'Dionaea',
                stock: 5,
                featured: true,
                images: ['https://images.unsplash.com/photo-1593482892290-f54927ae1bb2?w=800'],
                sizes: [
                    { size: 'S', price: 2000 },
                    { size: 'M', price: 2500 },
                    { size: 'L', price: 3000 }
                ]
            },
            {
                name: 'Drosera Capensis',
                scientificName: 'Drosera capensis',
                description: 'Planta carnívora sudafricana con pelos pegajosos.',
                price: 1800,
                category: 'Drosera',
                stock: 8,
                featured: true,
                images: ['https://images.unsplash.com/photo-1585662173536-851d68e1c0f5?w=800'],
                sizes: [
                    { size: 'S', price: 1500 },
                    { size: 'M', price: 1800 }
                ]
            }
        ];

        const createdPlants = [];
        for (const plantData of plantsData) {
            const { images, sizes, ...rest } = plantData;

            const plant = await prisma.plant.create({
                data: {
                    ...rest,
                    images: {
                        create: images.map(url => ({ url }))
                    },
                    availableSizes: {
                        create: sizes.map(s => ({ size: s.size as any, price: s.price }))
                    }
                }
            });

            createdPlants.push(plant);
        }

        return NextResponse.json({
            success: true,
            message: 'Database seeded successfully',
            user: { id: user.id, username: user.username },
            plantsCreated: createdPlants.length
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

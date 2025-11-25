import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Size } from '@prisma/client';

// GET - Obtener todas las plantas
export async function GET() {
  try {
    const plants = await prisma.plant.findMany({
      include: {
        images: true,
        availableSizes: true
      }
    });

    // Transformar los datos para que coincidan con el tipo Plant del frontend
    const transformedPlants = plants.map(plant => ({
      ...plant,
      images: plant.images.map((img: any) => img.url),
      availableSizes: plant.availableSizes.map((s: any) => ({ size: s.size, price: s.price }))
    }));

    return NextResponse.json(transformedPlants);
  } catch (error) {
    console.error('Error fetching plants:', error);
    return NextResponse.json({ error: 'Error fetching plants' }, { status: 500 });
  }
}

// POST - Crear una nueva planta
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { images, availableSizes, ...plantData } = body;

    // Validación básica
    if (!plantData.name || !plantData.scientificName || !plantData.price) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    const plant = await prisma.plant.create({
      data: {
        ...plantData,
        availableSizes: {
          create: (availableSizes || []).map((sizeOption: any) => ({
            size: sizeOption.size,
            price: sizeOption.price
          })),
        },
        images: {
          create: images.map((url: string) => ({ url })),
        },
      },
      include: {
        images: true,
        availableSizes: true,
      },
    });

    // Transformar la respuesta
    const transformedPlant = {
      ...plant,
      images: plant.images.map((img: any) => img.url),
      availableSizes: plant.availableSizes.map((s: any) => ({ size: s.size, price: s.price }))
    };

    return NextResponse.json(transformedPlant, { status: 201 });
  } catch (error) {
    console.error('Error creating plant:', error);
    return NextResponse.json({ error: 'Error creating plant' }, { status: 500 });
  }
}
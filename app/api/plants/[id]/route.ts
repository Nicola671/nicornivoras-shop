import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Obtener una planta por ID
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const plant = await prisma.plant.findUnique({
            where: { id: params.id },
            include: {
                images: true,
                availableSizes: true
            },
        }) as any;

        if (!plant) {
            return NextResponse.json({ error: 'Planta no encontrada' }, { status: 404 });
        }

        const transformedPlant = {
            ...plant,
            images: plant.images.map((img: any) => img.url),
            availableSizes: plant.availableSizes.map((s: any) => ({ size: s.size, price: s.price }))
        };

        return NextResponse.json(transformedPlant);
    } catch (error) {
        console.error('Error fetching plant:', error);
        return NextResponse.json({ error: 'Error fetching plant' }, { status: 500 });
    }
}

// PUT - Actualizar una planta
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { images, availableSizes, ...plantData } = body;

        // Primero, eliminar las imágenes antiguas si se proporcionan nuevas
        if (images) {
            await prisma.image.deleteMany({
                where: { plantId: params.id },
            });
        }

        // Eliminar tallas antiguas si se proporcionan nuevas
        if (availableSizes) {
            await prisma.plantSize.deleteMany({
                where: { plantId: params.id },
            });
        }

        const plant = await prisma.plant.update({
            where: { id: params.id },
            data: {
                ...plantData,
                ...(availableSizes && {
                    availableSizes: {
                        create: availableSizes.map((sizeOption: any) => ({
                            size: sizeOption.size,
                            price: sizeOption.price
                        })),
                    },
                }),
                ...(images && {
                    images: {
                        create: images.map((url: string) => ({ url })),
                    },
                }),
            },
            include: {
                images: true,
                availableSizes: true
            },
        }) as any;

        const transformedPlant = {
            ...plant,
            images: plant.images.map((img: any) => img.url),
            availableSizes: plant.availableSizes.map((s: any) => ({ size: s.size, price: s.price }))
        };

        return NextResponse.json(transformedPlant);
    } catch (error) {
        console.error('Error updating plant:', error);
        return NextResponse.json({ error: 'Error updating plant' }, { status: 500 });
    }
}

// DELETE - Eliminar una planta
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.plant.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: 'Planta eliminada exitosamente' });
    } catch (error) {
        console.error('Error deleting plant:', error);
        return NextResponse.json({ error: 'Error deleting plant' }, { status: 500 });
    }
}

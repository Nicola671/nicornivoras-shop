import { NextResponse } from 'next/server';

// Temporal: API simple para verificar que funciona
export async function GET() {
    return NextResponse.json({
        message: 'API funcionando',
        plants: []
    });
}

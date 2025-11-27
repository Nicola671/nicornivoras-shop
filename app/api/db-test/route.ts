import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function GET() {
    try {
        const prisma = new PrismaClient();

        // Intentar conectar
        await prisma.$connect();

        // Intentar hacer una query simple
        const userCount = await prisma.user.count();

        await prisma.$disconnect();

        return NextResponse.json({
            status: 'OK',
            message: 'Database connected successfully',
            userCount,
            databaseUrl: process.env.DATABASE_URL ? 'SET' : 'NOT SET'
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 'ERROR',
            message: error.message,
            databaseUrl: process.env.DATABASE_URL ? 'SET' : 'NOT SET'
        }, { status: 500 });
    }
}

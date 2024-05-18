import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

type Escola = {
    id: number;
    nome: string;
    email: string;
    provincia: string;
    numeroDeSala: number;
}

export async function GET(request: Request) {
    const prisma = new PrismaClient();
    const { searchParams } = new URL(request.url);
    
    // Default to page 1 if not provided
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

    if (isNaN(page) || isNaN(pageSize)) {
        return NextResponse.json({ error: 'Invalid pagination parameters' }, { status: 400 });
    }

    const totalEscolas = await prisma.escola.count();
    const escolas = await prisma.escola.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    await prisma.$disconnect();
    return NextResponse.json({ escolas, totalEscolas });
}

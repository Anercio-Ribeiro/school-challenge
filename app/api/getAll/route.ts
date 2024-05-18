import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



/**
 * @swagger
 * /api/getAll:
 *   get:
 *     summary: Get a list of schools
 *     description: Retrieve a paginated list of schools
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: The page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: A paginated list of schools
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 escolas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nome:
 *                         type: string
 *                       email:
 *                         type: string
 *                       provincia:
 *                         type: string
 *                       numeroDeSala:
 *                         type: integer
 *                 totalEscolas:
 *                   type: integer
 *       400:
 *         description: Invalid pagination parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */


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

import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"



/**
 * @swagger
 * /api/create:
 *   post:
 *     summary: Create a new school
 *     description: Creates a new school record in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               provincia:
 *                 type: string
 *               numeroDeSala:
 *                 type: number
 *     responses:
 *       200:
 *         description: New school created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 msg:
 *                   type: string
 *       400:
 *         description: Error creating school
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */


const prisma = new PrismaClient()

export async function POST(req:Request){
    const body = await req.json()
    const {nome, email, provincia, numeroDeSala} = body

    try{
        const newEscola = await prisma.escola.create({
            data:{
                nome:nome,
                email:email,
                provincia: provincia,
                numeroDeSala:numeroDeSala
            }
        })
        return NextResponse.json({ data: newEscola, msg:"Nova escola criada"},{status:200})
    }catch(error){
        return NextResponse.json(error)
    }
}
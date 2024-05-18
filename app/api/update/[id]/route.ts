import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"



/**
 * @swagger
 * /api/update/{id}:
 *   patch:
 *     summary: Update a school
 *     description: Update the details of an existing school by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the school to update
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
 *                 type: integer
 *     responses:
 *       200:
 *         description: School updated
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
 *         description: Error updating school
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */


const prisma = new PrismaClient()

export async function PATCH(req:Request, {params}:{params:{id:string}}){
    const body = await req.json()
    const { id } = params
    const {nome, email, provincia, numeroDeSala} = body

    try{
        const updatedEscola = await prisma.escola.update({
            where: { id: Number(id) },
            data: { nome: nome, email: email, provincia: provincia, numeroDeSala:numeroDeSala },
        });
        return NextResponse.json({data: updatedEscola, msg:"Escola actualizada"},{status:200})
    }catch(error){
        return NextResponse.json(error)
    }
}
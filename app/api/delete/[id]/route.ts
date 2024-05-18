import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client';



/**
 * @swagger
 * /api/delete/{id}:
 *   delete:
 *     summary: Delete a school
 *     description: Deletes a school record by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the school to delete
 *     responses:
 *       200:
 *         description: School deleted
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
 *         description: Error deleting school
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */


const prisma = new PrismaClient()


export async function DELETE(req:Request, {params}:{params:{id:string}}){
    const { id } = params

    try{
        const deletedEscola = await prisma.escola.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({data: deletedEscola, msg:"Escola removida"},{status:200})
    }catch(error){
        return NextResponse.json(error)
    }
}
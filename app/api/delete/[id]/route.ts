import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client';

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
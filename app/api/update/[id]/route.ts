import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

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
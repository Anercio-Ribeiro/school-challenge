import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

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
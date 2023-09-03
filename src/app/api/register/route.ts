import { hashPassword } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server"

type RegisterationBody = {
    name: string,
    password: string,
    email: string
}
export const POST = async (req: NextRequest) => {
    const { name, email, password }: RegisterationBody = await req.json();
    const hash = hashPassword(password)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            hash
        }
    })

    return NextResponse.json({ success: true, user })
}

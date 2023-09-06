import prisma from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
    let { languageName }: { languageName: string } = await req.json()
    languageName = languageName.trim();
    if (!languageName) return NextResponse.json({ message: "Language name must be atleast 2 chars." }, { status: 400 })

    await prisma.language.create({
        data: {
            name: languageName.charAt(0).toUpperCase() + languageName.slice(1)
        }
    })

    return NextResponse.json({
        success: true
    })
}

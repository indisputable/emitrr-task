import prisma from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
    let { quizName, languageId: languageIdStr, description }: { quizName: string, languageIdStr: string, description: string } = await req.json()
    quizName = quizName.trim();
    const languageId = parseInt(languageIdStr);

    if (!quizName || !languageId) return NextResponse.json({ message: "Invalid data" }, { status: 400 })

    await prisma.quiz.create({
        data: {
            name: quizName.charAt(0).toUpperCase() + quizName.slice(1),
            languageId,description
        }
    })

    return NextResponse.json({
        success: true
    })
}

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: any) {
    const params = context.params;

    return NextResponse.json({ name: "Tanmay" })
}

export async function POST(request: NextRequest, context: any) {
    const params = context.params;
    const quizId = parseInt(params.quizId);
    const body: { [key: number]: string } = await request.json()
    const selectedOptionIds = Object.values(body).map(v => parseInt(v))

    const result = await prisma.result.create({
        data: {
            markedOptions: {
                connect: selectedOptionIds.map(opId => {
                    return { id: opId }
                })
            },
            score: 0,
            user: {
                connect: { id: 1 }
            }, quiz: {
                connect: { id: quizId }
            }
        },

    })

    return NextResponse.json({ success: true, resultId: result.id })
}

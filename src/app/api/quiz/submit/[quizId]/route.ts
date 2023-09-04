import prisma from "@/lib/prisma";
import { getScore } from "@/lib/quiz";
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, context: any) {
    const params = context.params;

    return NextResponse.json({ name: "Tanmay" })
}

export async function POST(request: NextRequest, context: any) {
    const params = context.params;
    const quizId = parseInt(params.quizId);
    const userId = 1;
    const body: { [key: number]: string } = await request.json()
    const selectedOptionIds = Object.values(body).map(v => parseInt(v))

    // const total = quiz?.questions.reduce((p, c) => p + c.difficulty * 10, 0);

    const result = await prisma.result.update({
        where: {
            quizId_userId: { quizId, userId }
        },
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
        include: {
            markedOptions: {
                include: {
                    question: true
                }
            }
        }
    })
    const score = result?.markedOptions.reduce((p, c) => p + (c.correct ? getScore(c.question.difficulty) : 0), 0)
    await prisma.result.update({
        where: { id: result!.id }, data: {
            score: score
        }
    })
    return NextResponse.json({ success: true, resultId: result.id })
}

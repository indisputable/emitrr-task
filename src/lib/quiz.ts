import { Prisma, Question } from "@prisma/client";
import prisma from "./prisma";


type getQuizParams = {
    quizId: number
    userId: number
}

export const getQuiz = async (params: getQuizParams) => {
    const user = await prisma.user.findUnique({
        where: { id: params.userId }
    })

    const quiz = await prisma.quiz.findUnique({
        where:
        {
            id: params.quizId
        },
        include: {
            results: {
                where: {
                    userId: params.userId
                },
                include: {
                    markedOptions: true,
                    questions: {
                        include: {
                            options: true
                        }
                    }
                }
            }
        }
    });

    if (quiz?.results.length! > 0) {
        return { ...quiz, result: quiz?.results[0] };
    }

    const questions: Question[] = await prisma.$queryRawUnsafe(`SELECT * FROM "Question" WHERE languageId = ${quiz?.languageId} AND difficulty > ${user.level} ORDER BY RANDOM() LIMIT 5`)
    /**
    const questions = await prisma.question.findMany({
        where: {
            languageId: quiz?.languageId
        },
        take: 5
    })
    **/
    const totalScore = questions.reduce((p, c) => p + c.difficulty * 10, 0)
    const result = await prisma.result.create({
        data: {
            userId: params.userId,
            quizId: params.quizId,
            totalScore,
            questions: {
                connect: questions.map(q => ({ id: q.id }))
            }
        },
        include: {
            questions: {
                include: {
                    options: true
                }
            },
            markedOptions: true
        }
    })

    return { ...quiz, result }
}

export type Quiz = Prisma.PromiseReturnType<typeof getQuiz>;

export const getScore = async (quizId: number, userId: number) => {
    const quiz = await prisma.quiz.findUnique({
        where: {
            id: quizId
        }, include: {
            questions: true
        }
    })

    const total = quiz?.questions.reduce((p, c) => p + c.difficulty * 10, 0);
    const result = await prisma.result.findFirst({
        where: {
            quizId,
            userId
        }, include: {
            markedOptions: {
                include: {
                    question: true
                }
            },

        }
    })

    const score = result?.markedOptions.reduce((p, c) => p + (c.correct ? c.question.difficulty * 10 : 0), 0)

    return [score, total]
}

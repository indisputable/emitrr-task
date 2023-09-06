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

    const questions: Question[] = await prisma.$queryRawUnsafe(`SELECT * FROM "Question" WHERE languageId = ${quiz?.languageId} AND difficulty <= ${user.level} ORDER BY RANDOM() LIMIT 5`)
    const totalScore = questions.reduce((p, c) => p + getScore(c.difficulty), 0)
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

const difficultyScoreMap = new Map<number, number>([[1, 2], [2, 4], [3, 6], [4, 8], [5, 10]]);
export const getScore = (difficulty: number) => {
    return difficultyScoreMap.get(difficulty) ?? 0;
}

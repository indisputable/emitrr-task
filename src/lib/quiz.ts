import { Prisma } from "@prisma/client";
import prisma from "./prisma";


type getQuizWithQuestionsParams = {
    quizId: number
    userId: number
}

export const getQuizWithQuestions = (params: getQuizWithQuestionsParams) => {
    return prisma.quiz.findUnique({
        where:
        {
            id: params.quizId
        },
        include: {
            questions: {
                include: {
                    options: true
                }
            },
            results: {
                where: {
                    userId: params.userId
                },
                include: {
                    markedOptions: true
                }
            }
        }
    });
}

export type QuizWithQuestions = Prisma.PromiseReturnType<typeof getQuizWithQuestions>;

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

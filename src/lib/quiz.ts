import { Prisma } from "@prisma/client";
import prisma from "./prisma";

export const getQuizWithQuestions = (quizId: number) => {
    return prisma.quiz.findUnique({
        where:
        {
            id: quizId
        },
        include: {
            questions: {
                include: {
                    options: true
                }
            }
        }
    });
}

export type QuizWithQuestions = Prisma.PromiseReturnType<typeof getQuizWithQuestions>;

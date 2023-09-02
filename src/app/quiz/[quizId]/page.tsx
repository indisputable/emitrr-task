import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import QuizForm from "./form";
import { getQuizWithQuestions } from '@/lib/quiz';

export default async function QuizesPage({ params }: { params: { quizId: string } }) {
    const quiz = await getQuizWithQuestions(parseInt(params.quizId)) 

    if (!quiz) return redirect('/quiz')

    return (
        <main className="flex flex-col items-center justify-between px-24">
            <h1 className='mt-3 text-center text-4xl font-bold'>Take Quiz: {quiz?.name}</h1>
            <h2 className='mt-5 text-lg'>{quiz.description}</h2>
            <QuizForm quiz={quiz} />
        </main>
    )
}

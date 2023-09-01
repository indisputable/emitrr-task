import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import prisma from '@/prisma'
import Link from 'next/link';
import { redirect } from 'next/navigation'
export default async function QuizesPage({ params }: { params: { quizId: string } }) {
    const quiz = await prisma.quiz.findUnique({
        where:
        {
            id: parseInt(params.quizId)
        },
        include: {
            questions: {
                include: {
                    options: true
                }
            }
        }
    });

    if (!quiz) return redirect('/quiz')
    
    return (
        <main className="flex flex-col items-center justify-between px-24">
            <h1 className='mt-3 text-center text-4xl font-bold'>Take Quiz: {quiz?.name}</h1>
            <h2 className='mt-5 text-lg'>{quiz.description}</h2>
            <div className='mt-10 flex gap-5 flex-wrap'>
                {quiz?.questions.map((quiz, questionIndex) => <Card className='min-w-[350px]'>
                    <CardHeader className=''>
                        <CardTitle>{questionIndex + 1}. {quiz.text}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                    <CardFooter>
                        Clear Selection
                    </CardFooter>
                </Card>)}
            </div>
        </main>
    )
}

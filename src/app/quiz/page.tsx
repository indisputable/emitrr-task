import Image from 'next/image'
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

export default async function QuizesPage() {
    const quizes = await prisma.quiz.findMany();

    return (
        <main className="flex flex-col items-center justify-between px-24">
            <h1 className='mt-3 text-center text-4xl font-bold'>Take Quizes</h1>
            <h2 className='mt-5 text-lg'>Explore set of available quizes to improve language proficiency</h2>
            <div className='mt-10 flex gap-5 flex-wrap'>
                {quizes.map((quiz) => <Card className='min-w-[350px]'>
                    <CardHeader className=''>
                        <CardTitle>{quiz.name}</CardTitle>
                        <CardDescription>Desc{quiz.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                    </CardContent>
                    <CardFooter>
                        <Link href={`/quiz/1`}>Take Quiz</Link>
                    </CardFooter>
                </Card>)}
            </div>
        </main>
    )
}



import prisma from '@/lib/prisma'
import Dashboard from "./dashboard";

export default async function QuizesPage() {
    const quizes = await prisma.quiz.findMany({
        include: {
            results: {
                where: {
                    userId: 1
                }
            },
            language: true
        }
    });

    const languages = await prisma.language.findMany();
    return (
        <main className="flex flex-col items-center justify-between px-24">
            <h1 className='mt-3 text-center text-4xl font-bold'>Take Quizes</h1>
            <h2 className='mt-5 text-lg'>Explore set of available quizes to improve language proficiency</h2>
            <Dashboard languages={languages} quizes={quizes} />
        </main>
    )
}



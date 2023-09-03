import Image from 'next/image'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { DataTable } from './data-table'
import { columns } from './columns'

export default async function Home({ params }: { params: { quizId: string } }) {
    const results = await prisma.result.findMany({
        where: {
            quizId: parseInt(params.quizId),
        },
        include: {
            user: true
        }
    })

    const tableResults = results.sort((a, b) => a.score! - b.score!).map((r, ri) => ({ rank: ri + 1, id: r.id, score: r.score ?? 0, user: r.user.name }))
    return (
        <main className="flex flex-col items-center justify-between px-24 py-20">
            <h1 className='text-center text-3xl font-bold'>Leaderboard for {}</h1>
            <h2 className='mt-5 text-lg'>Climb the leaderboard with more practice</h2>
            <div className='flex justify-center w-full mt-5'>
                <DataTable columns={columns} data={tableResults} />
            </div>
            <div className='mt-7'>
                <Button>
                    <Link href="/quiz">Explore Quizes</Link>
                </Button>
            </div>
        </main>
    )
}

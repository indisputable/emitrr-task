import { Button } from '@/components/ui/button'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { DataTable } from './data-table'
import { columns } from './columns'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import SelectLanguage from './languageSelect'

export default async function LanguageLeaderboardPage({ params }: { params: { languageName: string } }) {
    if (params.languageName === 'global') { }

    const languages = await prisma.language.findMany();
    const group = await prisma.result.groupBy({
        by: ['userId'],
        where: params.languageName === 'all' ? {} : {
            quiz: {
                language: {
                    name: {
                        in: [params.languageName, params.languageName.charAt(0).toUpperCase() + params.languageName.slice(1)],
                    }
                }
            }
        },
        _sum: {
            score: true
        }
    })
    const userIdNameMap = new Map<number, string>();

    const users = await prisma.user.findMany({
        where: {
            id: {
                in: group.map(g => (
                    g.userId
                ))
            }
        }
    })
    users.forEach(user => userIdNameMap.set(user.id, user.name))
    const groupWithUser = group.map(g => ({ ...g, username: userIdNameMap.get(g.userId) }))
    const tableResults = groupWithUser.sort((a, b) => a._sum.score! - b._sum.score!).map((r, ri) => ({ rank: ri + 1, totalscore: r._sum?.score ?? 0, username: r.username! }))

    return (
        <main className="flex flex-col items-center justify-between px-24 py-20">
            <h1 className='text-center text-3xl font-bold'>Leaderboard for {params.languageName.charAt(0).toUpperCase() + params.languageName.slice(1)} {params.languageName === "all" && "languages"}</h1>
            <h2 className='mt-5 text-lg'>Climb the leaderboard with more practice</h2>
            <SelectLanguage languages={languages} currentLanguage={params.languageName} />
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
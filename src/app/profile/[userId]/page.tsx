import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Settings } from "./settings";

export default async function ProfilePage({ params }: { params: { userId: string } }) {
    const userId = parseInt(params.userId);

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            results: {
                include: {
                    quiz: {
                        include: {
                            language: true
                        }
                    }
                }
            }
        }
    })

    if (!user) {
        return NextResponse.redirect('/')
    }

    return <main className="flex flex-col items-center justify-between px-24 py-20">
        <h1 className="text-2xl">Welcome to <span className="font-bold">{user.name}</span>&apos;s profile!</h1>
        <div className="w-2/12 mt-6 rounded-full overflow-hidden">
            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} height={'100%'} width={'100%'} />
        </div>
        <div className="mt-10 flex flex-col items-center">
            <h3 className="font-semibold">Quizes taken</h3>
            <Table className="mt-2">
                <TableCaption>List of your recent quizes taken.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Quiz</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead>Total Score</TableHead>
                        <TableHead>Your Score</TableHead>
                        <TableHead className="text-right">Percentage Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {user.results.map(result => <TableRow>
                        <TableCell className="font-medium">{result.quiz.name}</TableCell>
                        <TableCell>{result.quiz.language.name}</TableCell>
                        <TableCell>{result.totalScore}</TableCell>
                        <TableCell>{result.score}</TableCell>
                        <TableCell className="text-right">{((result.score / result.totalScore) * 100).toFixed(2)}</TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </div>
        <Settings />
    </main>
}

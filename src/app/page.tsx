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

const cards = [{
    title: "Exercises",
    body: "Improve their language proficiency through interactive exercises"
}, {
    title: "Activities",
    body: "Improve their language proficiency through interactive exercises"
}]

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-between px-24 py-20">
            <h1 className='text-center text-6xl font-bold'>Learn languages through interactive exercises and activities</h1>
            <h2 className='mt-5 text-lg'>Improve language proficiency, for beginners and even experienced</h2>
            <div className='mt-10 flex gap-5 flex-wrap'>
                {cards.map((card, cardIdx) => <Card key={cardIdx} className='max-w-[300px]'>
                    <CardHeader>
                        <CardTitle>{card.title}</CardTitle>
                        <CardDescription>{card.body}</CardDescription>
                    </CardHeader>
                </Card>)}
            </div>
            <div className='mt-7'>
                <Button>
                    <Link href="/quiz">Explore Quizes</Link>
                </Button>
            </div>
        </main>
    )
}

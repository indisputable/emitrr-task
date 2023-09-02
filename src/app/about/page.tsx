import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const cards = [{
    title: "Exercises",
    body: "Improve their language proficiency through interactive exercises"
}, {
    title: "Activities",
    body: "Improve their language proficiency through interactive exercises"
}]

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-between p-24">
            <h1 className='text-center text-6xl font-bold'>Learn languages through interactive exercises and activities</h1>
            <h2 className='mt-5 text-lg'>Improve language proficiency, for beginners and even experienced</h2>
            <div className='mt-10 flex gap-5 flex-wrap'>
                {cards.map((card, cardIdx) => <Card key={cardIdx} className='max-w-[300px]'>
                    <CardHeader>
                        <CardTitle>{card.title}</CardTitle>
                        <CardDescription>{card.body}</CardDescription>
                    </CardHeader>
                    { /** <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter> **/}
                </Card>)}
            </div>
        </main>
    )
}

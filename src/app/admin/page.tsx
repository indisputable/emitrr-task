import Link from "next/link";

export default async function AdminPage() {
    return <main className="flex flex-col items-center justify-between px-24 py-20">
        <Link href="/admin/add-quiz">Add Quiz</Link>
        <Link href="/admin/add-quiz">Questions</Link>
    </main>
}

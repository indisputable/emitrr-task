"use client"
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react'

const Nav = () => {
    const { data: session, status } = useSession();

    console.log(session)
    return <nav className="flex justify-between items-center py-6 px-10">
        <Link href="/" className="font-bold text-xl">LangLearn</Link>
        <div className="flex gap-x-5 text-sm font-semibold">
            <Link href='/about'>About</Link>
            <Link href='/about'>Quizes</Link>
            {!session?.user && <Link href='/about'>Sign in</Link>}
            {session?.user && <button onClick={() => { signOut() }}>Logout</button>}
        </div>
    </nav>
}

export default Nav;

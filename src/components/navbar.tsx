"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Nav = () => {
    const { data: session, status } = useSession();

    return (
        <nav className="flex justify-between items-center py-6 px-10">
            <Link href="/" className="font-bold text-xl">
                LangLearn
            </Link>
            <div className="flex gap-x-8 text-sm font-semibold">
                <Link href="/leaderboard/language/all">Leaderboard</Link>
                <Link href="/quiz">Explore quizes</Link>
                {!session?.user && <Link href="/register">Register</Link>}
                {session?.user && (
                    <>
                        <Link href={`/profile/${session.user.id}`} prefetch={false} >
                            View profile
                        </Link>
                        <button
                            onClick={() => {
                                signOut();
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;

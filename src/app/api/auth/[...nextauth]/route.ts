import { matchPassword } from "@/lib/auth"
import prisma from "@/lib/prisma"
import NextAuth, { AuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                if (!credentials || !credentials.email || !credentials.password) return null;

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user) return null


                // If no error and we have user data, return it
                if (matchPassword(credentials.password, user.hash)) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    secret: "SECRET",
    session: { strategy: "jwt" },
    callbacks: {
        async session({ session, token, user }) {
            const sanitizedToken = Object.keys(token).reduce((p, c) => {
                // strip unnecessary properties
                if (
                    c !== "iat" &&
                    c !== "exp" &&
                    c !== "jti" &&
                    c !== "apiToken"
                ) {
                    return { ...p, [c]: token[c] }
                } else {
                    return p
                }
            }, {})
            return { ...session, user: sanitizedToken, apiToken: token.apiToken }
        },
        async jwt({ token, user, account, profile }) {
            if (typeof user !== "undefined") {
                // user has just signed in so the user object is populated
                return user
            }
            return token
        }
    }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

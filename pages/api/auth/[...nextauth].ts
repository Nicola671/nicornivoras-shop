import NextAuth, { DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

// Extender los tipos de NextAuth para incluir el ID
declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Authorize function called with credentials:', credentials);
        if (!credentials) {
          return null;
        }
        try {
          const user = await prisma.user.findUnique({
            where: { username: credentials.username },
          })
          console.log('User found in database:', user);

          if (user && credentials.password) {
            const isValid = await bcrypt.compare(credentials.password, user.password)
            console.log('Password validation result (isValid):', isValid);
            if (isValid) {
              return { id: user.id, name: user.username }
            }
          }
        } catch (error) {
          console.error('Error during authorization:', error);
        }
        return null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
})

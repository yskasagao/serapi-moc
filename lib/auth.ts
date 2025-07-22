import process from 'process'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import TwitterProvider from 'next-auth/providers/twitter'
import prisma from '@/lib/prisma'

export const getAuthOptions = (): NextAuthOptions => {
  const adapter = PrismaAdapter(prisma)
  return {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      TwitterProvider({
        clientId: process.env.TWITTER_CONSUMER_KEY,
        clientSecret: process.env.TWITTER_CONSUMER_SECRET,
      }),
    ],
    session: { strategy: 'jwt', maxAge: 60 * 60 * 24 * 7 },
    adapter,
    pages: {
      signIn: '/',
      signOut: '/',
      error: '/',
      verifyRequest: '/',
      newUser: '/my?first=on',
    },
    debug: true,
    callbacks: {
      jwt: async ({ token, trigger, user }) => {
        if (trigger === 'update') {
          const user = await prisma.user.findFirst({
            where: {
              id: token.sub,
            },
          })
          if (user) {
            token.name = user.name
            token.picture = user.image
            token.user = {
              id: user.id,
              message: user.message ?? '',
            }
          }
        } else {
          if (user) {
            token.user = user as never
          }
        }
        return token
      },
      session: async ({ session, token }) => {
        if (token?.user) {
          session.user.id = token.user.id ?? ''
          session.user.message = token.user.message
        }
        return session
      },
      signIn: async ({ user, account }) => {
        if (account) {
          const accountData = await prisma.account.findFirst({
            where: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          })
          if (accountData) {
            await prisma.user.update({
              where: {
                id: user.id,
              },
              data: { lastLoginAt: new Date() },
            })
          }
        }
        return true
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  }
}

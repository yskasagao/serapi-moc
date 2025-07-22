import NextAuth from 'next-auth'
import { getAuthOptions } from '@/lib/auth'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(getAuthOptions())

export { handler as GET, handler as POST }

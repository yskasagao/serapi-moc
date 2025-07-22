// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User
  }
  interface User {
    email: string
    image?: string
    name?: string
    id: string
    message?: string
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user?: {
      id: string
      message: string
    }
  }
}

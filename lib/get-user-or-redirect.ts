import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import type { User } from 'next-auth'
import { getAuthOptions } from './auth'

export const getUserOrRedirect = async (): Promise<User> => {
  const session = await getServerSession(getAuthOptions())
  if (!session?.user) {
    redirect('/login')
  }
  return session.user
}

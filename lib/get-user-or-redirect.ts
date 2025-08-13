import { redirect } from 'next/navigation'
import type { User } from 'next-auth'
import { getSessionWithDevBypass } from './get-session-with-dev-bypass'

export const getUserOrRedirect = async (): Promise<User> => {
  const session = await getSessionWithDevBypass()
  if (!session?.user) {
    redirect('/login')
  }
  return session.user
}

import { redirect } from 'next/navigation'
import { getServerSession, type User } from 'next-auth'
import { getAuthOptions } from '@/lib/auth'

export type WithAuthProps = {
  user: User
}
export const withAuth = <T extends WithAuthProps = WithAuthProps>(
  Component: React.ComponentType<T>,
) => {
  const ComponentWithAuth = async (props: Omit<T, keyof WithAuthProps>) => {
    const session = await getServerSession(getAuthOptions())

    if (!session) {
      redirect('/login')
    }

    return <Component {...(props as T)} user={session.user} />
  }
  ComponentWithAuth.displayName = `WithAuth(${
    Component.displayName ?? (Component.name || 'Component')
  })`
  return ComponentWithAuth
}

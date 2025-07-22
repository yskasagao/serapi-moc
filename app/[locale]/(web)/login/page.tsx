import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { LoginForm } from './components/form'
import { getAuthOptions } from '@/lib/auth'

export default async function Page() {
  const session = await getServerSession(getAuthOptions())
  if (session) {
    redirect('/')
  }
  return <LoginForm />
}

import { Header } from '@/components/header'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative min-h-screen'>
      <Header />
      {children}
    </div>
  )
}

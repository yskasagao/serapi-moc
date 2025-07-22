import { Header } from '@/components/header'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative min-h-screen'>
      <Header />
      {children}
    </div>
  )
}

import { Header } from '@/components/header'

export default async function SerapistLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative min-h-screen'>
      <Header showAreaSearch={false} />
      {children}
    </div>
  )
}
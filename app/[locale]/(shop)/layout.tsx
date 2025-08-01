import { Header } from '@/components/header'

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative min-h-screen'>
      <Header showAreaSearch={false} />
      {children}
    </div>
  )
}

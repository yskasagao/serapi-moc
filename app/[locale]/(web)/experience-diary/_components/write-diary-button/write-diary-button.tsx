'use client'

import { Plus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { Link } from '@/i18n/routing'

export const WriteDiaryButton = () => {
  const { data: session } = useSession()
  
  const href = session ? '/experience-diary/create' : '/auth'
  
  return (
    <Link
      href={href}
      className='inline-flex transform items-center justify-center rounded-full bg-brand-ui px-5 py-2 text-base text-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:bg-brand-ui-hover hover:shadow-lg md:px-6 md:py-3 md:text-lg'
    >
      <Plus className='mr-1 h-4 w-4 md:mr-2 md:h-5 md:w-5' />
      体験日記を書く
    </Link>
  )
}

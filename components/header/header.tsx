import Image from 'next/image'
import { EnhancedMenu } from './_components/enhanced-menu'
import Logo from './assets/logo.png'
import { AreaSearchModal } from '@/components/header/_components/area-search-modal'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className='sticky left-0 right-0 top-0 z-50 h-16 bg-white shadow-md'>
      <div className='container mx-auto flex h-full max-w-[980px] items-center justify-between px-4'>
        <div className='flex items-center'>
          <Link href='/'>
            <Image src={Logo} alt='serapistar' width={100} height={34} />
          </Link>
        </div>
        <div className='flex items-center space-x-4'>
          <AreaSearchModal />
          <EnhancedMenu />
        </div>
      </div>
    </header>
  )
}

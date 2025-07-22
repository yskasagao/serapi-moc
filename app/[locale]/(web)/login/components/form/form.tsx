'use client'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import GoogleIcon from '@assets/icon-google.svg'
import XIcon from '@assets/x.svg'

export const LoginForm = () => {
  const t = useTranslations('login')
  return (
    <div>
      <p className='mt-12 text-center text-sm font-bold'>{t('title')}</p>
      <div className='mt-8 flex flex-col items-center gap-4'>
        <button
          onClick={() => signIn('google')}
          className='flex h-[48px] w-full max-w-[240px] items-center justify-center shadow-[0_3px_6pt_#00000029]'
        >
          <GoogleIcon width={24} height={24} className='mr-4' />
          Sign in with Google
        </button>
        <button
          onClick={() => signIn('twitter')}
          className='flex h-[48px] w-full max-w-[240px] items-center justify-center bg-black text-white shadow-[0_3px_6pt_#00000029]'
        >
          <XIcon width={24} height={24} className='mr-4' />
          Sign in with X(Twitter)
        </button>
      </div>
    </div>
  )
}

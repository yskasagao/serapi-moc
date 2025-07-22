'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut, LogIn } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from '@/i18n/routing'

export const EnhancedMenu = () => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const t = useTranslations('enhanced-menu')
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen])

  const menuItems = useMemo(() => {
    if (session) {
      return [
        { icon: User, label: t('myPage'), href: '/my' },
        // { icon: Heart, label: 'お気に入り', href: '#' },
        // { icon: Calendar, label: '予約履歴', href: '#' },
        // { icon: Settings, label: '設定', href: '#' },
        // { icon: HelpCircle, label: 'ヘルプ', href: '#' },
        { icon: LogOut, label: t('logout'), href: '#', onClick: () => signOut() },
      ]
    } else {
      return [
        { icon: LogIn, label: t('login'), href: '/login' },
        // { icon: Heart, label: 'お気に入り', href: '#' },
        // { icon: Calendar, label: '予約履歴', href: '#' },
        // { icon: Settings, label: '設定', href: '#' },
        // { icon: HelpCircle, label: 'ヘルプ', href: '#' },
        // { icon: LogOut, label: 'ログアウト', href: '#' },
      ]
    }
  }, [session, t])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200'
        aria-label='メニューを開く'
      >
        <Menu size={24} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className='fixed inset-y-0 right-0 z-50 flex w-80 flex-col bg-white shadow-lg'
          >
            <div className='flex items-center justify-end border-b border-gray-200 p-4'>
              <button
                onClick={() => setIsOpen(false)}
                className='rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200'
                aria-label='メニューを閉じる'
              >
                <X size={24} />
              </button>
            </div>
            <div className='flex-grow overflow-y-auto'>
              <nav className='space-y-2 p-4'>
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={item.onClick}
                    className='flex items-center space-x-3 rounded-md p-2 transition-colors duration-200 hover:bg-gray-100'
                  >
                    <item.icon className='text-gray-500' size={20} />
                    <span className='text-gray-700'>{item.label}</span>
                  </a>
                ))}
              </nav>
              <div className='mx-4 my-6 rounded-lg bg-gray-50 p-4'>
                <h3 className='mb-2 font-semibold text-gray-700'>今月のキャンペーン</h3>
                <p className='mb-2 text-sm text-gray-600'>
                  公認セラピスト登録無料期間実施中！この機会をお見逃しなく。
                </p>
                <Link
                  href='/therapist-application'
                  className='text-sm font-medium text-pink-600 transition-colors duration-200 hover:text-pink-700'
                >
                  詳細を見る →
                </Link>
              </div>
            </div>
            <div className='border-t border-gray-200 bg-gray-50 p-4'>
              <div className='mb-2 flex items-center justify-between'>
                <Link href='/privacy' className='text-sm text-gray-600 hover:text-gray-800'>
                  {t('privacy')}
                </Link>
                <Link href='/terms' className='text-sm text-gray-600 hover:text-gray-800'>
                  {t('terms')}
                </Link>
              </div>
              <p className='text-center text-xs text-gray-500'>
                @2024 serapi-star All rights reserved.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

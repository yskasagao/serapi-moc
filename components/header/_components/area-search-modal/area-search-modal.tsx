'use client'

import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { Link } from '@/i18n/routing'

export const AreaSearchModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpenChange = (open: boolean) => {
    setIsOpen(open)
  }
  const pageTranslation = useTranslations('areaSearch')
  const areaTranslation = useTranslations('area')
  const regions = [
    { name: areaTranslation('hokkaido'), link: '/areas/hokkaido' },
    { name: areaTranslation('tohoku'), link: '/areas/tohoku' },
    { name: areaTranslation('kanto'), link: '/areas/kanto' },
    { name: areaTranslation('chubu'), link: '/areas/chubu' },
    { name: areaTranslation('kansai'), link: '/areas/kansai' },
    { name: areaTranslation('chugoku-shikoku'), link: '/areas/chugoku-shikoku' },
    { name: areaTranslation('kyusyu-okinawa'), link: '/areas/kyusyu-okinawa' },
  ]

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className='rounded-md border border-gray-800 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition-colors duration-300 hover:bg-gray-100'
      >
        {pageTranslation('searchByArea')}
      </button>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div
            className='fixed inset-0 bg-black bg-opacity-50'
            onClick={() => onOpenChange(false)}
          />
          <div className='relative w-[90vw] max-w-[980px] overflow-hidden rounded-lg bg-white'>
            <div className='flex items-center justify-between border-b border-gray-200 p-6'>
              <h2 className='text-base font-semibold text-gray-800'>
                {pageTranslation('selectArea')}
              </h2>
              <button
                onClick={() => onOpenChange(false)}
                className='rounded-md text-gray-500 transition-colors duration-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200'
                aria-label='メニューを閉じる'
              >
                <X size={24} />
              </button>
            </div>
            <div className='p-6'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {regions.map((region) => (
                  <Link
                    key={region.name}
                    className='w-full rounded-lg px-4 py-3 text-left text-gray-700 transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-200'
                    href={region.link}
                    onClick={() => {
                      setIsOpen(false)
                    }}
                  >
                    {region.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

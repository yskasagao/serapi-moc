'use client'

import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Link } from '@/i18n/routing'

export const AreaSearchModal = () => {
  const [isOpen, setIsOpen] = useState(false)
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

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='rounded-md border border-gray-800 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition-colors duration-300 hover:bg-gray-100'
      >
        {pageTranslation('searchByArea')}
      </button>
      
      {isOpen && (
        <Modal 
          title={pageTranslation('selectArea')} 
          size="large"
          onClose={handleClose}
        >
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {regions.map((region) => (
              <Link
                key={region.name}
                className='w-full rounded-lg px-4 py-3 text-left text-gray-700 transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-200'
                href={region.link}
                onClick={handleClose}
              >
                {region.name}
              </Link>
            ))}
          </div>
        </Modal>
      )}
    </>
  )
}

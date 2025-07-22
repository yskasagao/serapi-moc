import React from 'react'

export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='my-8 flex items-center justify-center'>
      <div className='h-px w-16 bg-gray-300'></div>
      <h2 className='mx-4 text-sm font-light uppercase tracking-wider text-gray-600'>{children}</h2>
      <div className='h-px w-16 bg-gray-300'></div>
    </div>
  )
}

'use client'
import React from 'react'
import { Zap } from 'lucide-react'

export const LiveSectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='my-8 flex items-center justify-center'>
      {/* 左側の装飾ライン */}
      <div className='h-px w-16 bg-gradient-to-r from-transparent to-red-200'></div>
      
      {/* タイトル部分 */}
      <div className='mx-4 flex items-center space-x-2'>
        {/* ライブインジケーター */}
        <div className='relative'>
          <div className='h-2 w-2 animate-pulse rounded-full bg-red-500'></div>
          <div className='absolute inset-0 h-2 w-2 animate-ping rounded-full bg-red-400 opacity-75'></div>
        </div>
        
        {/* Zapアイコン */}
        <Zap className='h-4 w-4 text-gray-700' />
        
        {/* タイトルテキスト */}
        <h2 className='text-base font-medium uppercase tracking-wider text-gray-800 transition-colors duration-300'>
          {children}
        </h2>
        
        {/* ライブインジケーター（右側） */}
        <div className='relative'>
          <div className='h-2 w-2 animate-pulse rounded-full bg-red-500'></div>
          <div className='absolute inset-0 h-2 w-2 animate-ping rounded-full bg-red-400 opacity-75'></div>
        </div>
      </div>
      
      {/* 右側の装飾ライン */}
      <div className='h-px w-16 bg-gradient-to-l from-transparent to-red-200'></div>
    </div>
  )
}

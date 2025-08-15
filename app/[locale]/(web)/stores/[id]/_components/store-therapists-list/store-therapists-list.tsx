'use client'
import { useEffect, useState } from 'react'
import { SerapistCard } from '@/components/serapist-card'
import { generateMockSerapistPaginator } from '@/lib/mock-data/serapist'

type Therapist = {
  slug: string
  nickname: string
  avatar: string | null
  isLive: boolean
  parameter: {
    like: number
    service: number
    looks: number
    physical: number
    repeat: number
  }
}

type Props = {
  storeId: string
}

export const StoreTherapistsList = ({ storeId }: Props) => {
  const [therapists, setTherapists] = useState<Therapist[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // モックデータでの実装
    // 実際の実装では storeId に紐づくセラピストをAPIから取得
    const fetchTherapists = async () => {
      try {
        // 店舗IDに応じてセラピスト数を変更（デモ用）
        const therapistCount = Math.floor(Math.random() * 8) + 3 // 3-10名
        const mockData = generateMockSerapistPaginator(1, therapistCount, therapistCount)
        
        // モックデータを適切な形式に変換
        const formattedTherapists: Therapist[] = mockData.data.map(serapist => ({
          slug: serapist.slug,
          nickname: serapist.nickname,
          avatar: serapist.avatar,
          isLive: serapist.isLive,
          parameter: serapist.parameter
        }))
        
        setTherapists(formattedTherapists)
      } catch (error) {
        console.error('セラピスト一覧の取得に失敗しました:', error)
        setTherapists([])
      } finally {
        setLoading(false)
      }
    }

    fetchTherapists()
  }, [storeId])

  if (loading) {
    return (
      <div className='w-full max-w-2xl rounded-b-lg bg-gray-50 px-4 py-8'>
        <div className='mb-6 flex items-center justify-center'>
          <div className='h-px w-16 bg-gray-300'></div>
          <h2 className='mx-4 text-sm font-light uppercase tracking-wider text-gray-600'>所属セラピスト</h2>
          <div className='h-px w-16 bg-gray-300'></div>
        </div>
        <div className='flex items-center justify-center py-8'>
          <div className='text-gray-500'>読み込み中...</div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full max-w-2xl rounded-b-lg bg-gray-50 px-4 py-8'>
      <div className='mb-6 flex items-center justify-center'>
        <div className='h-px w-16 bg-gray-300'></div>
        <h2 className='mx-4 text-sm font-light uppercase tracking-wider text-gray-600'>所属セラピスト</h2>
        <div className='h-px w-16 bg-gray-300'></div>
      </div>
      
      {therapists.length === 0 ? (
        <div className='flex items-center justify-center py-8'>
          <p className='text-gray-500'>所属セラピストが見つかりませんでした</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {therapists.map((therapist) => (
            <div key={therapist.slug} className='flex justify-center'>
              <SerapistCard
                serapist={{
                  slug: therapist.slug,
                  nickname: therapist.nickname,
                  twitter: null, // StoreSNSAccountには含まれない
                  tiktok: null,  // StoreSNSAccountには含まれない  
                  avatar: therapist.avatar,
                  isLive: therapist.isLive,
                  parameter: therapist.parameter
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
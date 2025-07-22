'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import * as React from 'react'
import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Select, { type StylesConfig, type GroupBase, type CSSObjectWithLabel } from 'react-select'
import { type z } from 'zod'
import { StoreApplicationSchema } from './schema'
import { submitStoreApplication } from './action'
import { Toaster } from '@/app/_components/toaster'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { areaGroupMap } from '@/lib/constants'

type OptionType = {
  value: string
  label: string
}

const customStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
  control: (provided) => ({
    ...provided,
    borderColor: '#d1d5db',
    '&:hover': {
      borderColor: '#6b7280',
    },
  }),
  option: (provided: CSSObjectWithLabel, state: { isSelected: boolean }) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#374151' : 'white',
    color: state.isSelected ? 'white' : '#374151',
    '&:hover': {
      backgroundColor: '#6b7280',
      color: 'white',
    },
  }),
}

// 都道府県オプションを作成
const prefectureOptions: OptionType[] = Array.from(areaGroupMap.keys()).map((prefecture) => ({
  value: prefecture,
  label: prefecture,
}))

export const StoreForm = () => {
  const [isPending, startTransition] = useTransition()
  const [showModal, setShowModal] = useState(false)

  const {
    register,
    control,
    trigger,
    setValue,
    reset,
    formState: { isValid, errors },
  } = useForm<z.infer<typeof StoreApplicationSchema>>({
    mode: 'onChange',
    resolver: zodResolver(StoreApplicationSchema),
    defaultValues: {
      storeName: '',
      homepageUrl: '',
      businessNumber: '',
      prefecture: '',
      email: '',
    },
  })

  const formAction = (formData: FormData) => {
    startTransition(async () => {
      const result = await submitStoreApplication(formData)
      if (!result.success) {
        toast.error(result.error)
      } else {
        toast.success(result.message)
        reset()
      }
    })
  }

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <Toaster />
      <Card className='mx-auto max-w-2xl overflow-hidden shadow-lg'>
        <div className='relative h-[200px] w-full overflow-hidden bg-gray-100'>
          <div className='absolute inset-0 flex items-center'>
            <Image
              src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_974974491_s.jpg-IyLb49FpZC9kYFQwgn1hRB0UTl7d3p.jpeg'
              alt='Decorative illustration'
              layout='fill'
              objectFit='cover'
              className='opacity-60'
            />
            <div className='absolute inset-0 bg-black/10' />
          </div>
          <div className='absolute inset-0 flex flex-col items-start justify-center px-6 sm:px-8'>
            <div className='max-w-xl rounded-lg bg-white/60 p-4 shadow-lg backdrop-blur-sm'>
              <h1 className='mb-2 flex items-center text-2xl font-bold text-gray-800 md:text-3xl'>
                公認店舗申請
              </h1>
              <button
                onClick={() => setShowModal(true)}
                className='group flex items-center text-sm text-gray-600 transition-colors hover:text-gray-800'
              >
                <span className='mr-1 transform text-3xl font-bold transition-transform group-hover:translate-x-1'>
                  →
                </span>
                <span>公認店舗とは</span>
              </button>
            </div>
          </div>
          <div className='absolute bottom-0 left-0 h-1 w-full bg-gray-300' />
        </div>
        
        <CardContent className='p-6'>
          <form action={formAction} className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='storeName' className='text-gray-700'>
                店舗名 <span className='text-gray-600'>*</span>
                <span className='ml-1 text-sm text-gray-500'>(必須)</span>
              </Label>
              <Input
                {...register('storeName')}
                className='w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500'
                placeholder='店舗名を入力してください'
              />
              {errors.storeName && (
                <p className='text-sm text-gray-600'>{errors.storeName.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='homepageUrl' className='text-gray-700'>
                ホームページURL
              </Label>
              <Input
                {...register('homepageUrl')}
                type='url'
                className='w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500'
                placeholder='https://example.com'
              />
              {errors.homepageUrl && (
                <p className='text-sm text-gray-600'>{errors.homepageUrl.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='storeImage' className='text-gray-700'>
                店舗画像
                <span className='ml-1 text-sm text-gray-500'>(※推奨 800×800 jpg,png)</span>
              </Label>
              <Input
                {...register('storeImage')}
                type='file'
                accept='image/jpeg,image/png'
                className='w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='businessNumber' className='text-gray-700'>
                事業者番号 <span className='text-gray-600'>*</span>
                <span className='ml-1 text-sm text-gray-500'>(必須)</span>
              </Label>
              <Input
                {...register('businessNumber')}
                className='w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500'
                placeholder='事業者番号を入力してください'
              />
              {errors.businessNumber && (
                <p className='text-sm text-gray-600'>{errors.businessNumber.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='prefecture' className='text-gray-700'>
                エリア <span className='text-gray-600'>*</span>
                <span className='ml-1 text-sm text-gray-500'>(必須)</span>
              </Label>
              <Controller
                name='prefecture'
                control={control}
                render={({ field }) => (
                  <Select
                    instanceId='prefecture-list'
                    {...field}
                    value={prefectureOptions.find((opt) => opt.value === field.value) ?? null}
                    options={prefectureOptions}
                    styles={customStyles}
                    placeholder='都道府県を選択してください'
                    isClearable
                    className='w-full'
                    onChange={async (v) => {
                      const value = v?.value || ''
                      setValue('prefecture', value, { shouldValidate: true })
                      await trigger('prefecture')
                    }}
                  />
                )}
              />
              {errors.prefecture && (
                <p className='text-sm text-gray-600'>{errors.prefecture.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email' className='text-gray-700'>
                メールアドレス <span className='text-gray-600'>*</span>
                <span className='ml-1 text-sm text-gray-500'>(必須)</span>
              </Label>
              <Input
                {...register('email')}
                type='email'
                className='w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500'
                placeholder='example@example.com'
              />
              {errors.email && (
                <p className='text-sm text-gray-600'>{errors.email.message}</p>
              )}
            </div>

            <div className='mt-6 flex justify-center'>
              <Button
                disabled={!isValid || isPending}
                className='w-full bg-gray-800 px-6 py-3 text-lg text-white transition-colors hover:bg-gray-700 sm:w-auto sm:min-w-[200px]'
                type='submit'
              >
                {isPending ? '申請中...' : '申請'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='w-full max-w-md rounded-lg bg-white p-8'>
            <h2 className='mb-6 text-2xl font-bold text-gray-800'>公認店舗のメリット</h2>
            <ul className='mb-6 space-y-4'>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-6 w-6 flex-shrink-0 text-gray-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span>無料で簡単に申請可能！費用負担なし</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-6 w-6 flex-shrink-0 text-gray-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span>一覧ページで優先的に表示され、露出度アップ！</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-6 w-6 flex-shrink-0 text-gray-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span>信頼性向上で、お客様からの問い合わせが増加！</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-6 w-6 flex-shrink-0 text-gray-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span>専用の店舗紹介ページを作成可能！</span>
              </li>
            </ul>
            <p className='mb-6 text-sm font-medium text-gray-600'>
              ※審査には数日かかる場合があります。結果はメールでお知らせいたします。
            </p>
            <button
              onClick={() => setShowModal(false)}
              className='w-full rounded bg-gray-800 px-6 py-2 text-white transition-colors hover:bg-gray-700'
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

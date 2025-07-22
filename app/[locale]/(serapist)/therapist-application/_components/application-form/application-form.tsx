'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import * as React from 'react'
import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Select, { type StylesConfig, type GroupBase, type CSSObjectWithLabel } from 'react-select'
import { type z } from 'zod'
import { ApplicationFormSchema } from './schema'
import { application } from '@/app/[locale]/(serapist)/therapist-application/_components/application-form/action'
import { Toaster } from '@/app/_components/toaster'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type OptionType = {
  value: string
  label: string
}
const customStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
  control: (provided) => ({
    ...provided,
    borderColor: '#e6e6e6',
    '&:hover': {
      borderColor: '#ff7e8a',
    },
  }),
  option: (provided: CSSObjectWithLabel, state: { isSelected: boolean }) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#ff7e8a' : 'white',
    color: state.isSelected ? 'white' : '#4a4a4a',
    '&:hover': {
      backgroundColor: '#ff9eb8',
      color: 'white',
    },
  }),
}

type Props = {
  shopList: { id: string; name: string }[]
}
export const ApplicationForm = (props: Props) => {
  const [shopOptions] = useState<{ value: string; label: string }[]>(() => {
    return props.shopList.map((v) => {
      return { label: v.name, value: v.id }
    })
  })
  const [isPending, startTransition] = useTransition()
  const [showModal, setShowModal] = useState(false)
  const {
    register,
    control,
    trigger,
    setValue,
    reset,
    formState: { isValid },
  } = useForm<z.infer<typeof ApplicationFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(ApplicationFormSchema),
    defaultValues: {
      nickname: '',
      customShop: '',
      shopId: '',
      tiktok: '',
      age: 0,
      weight: 0,
      height: 0,
      twitter: '',
    },
  })
  const formAction = (formData: FormData) => {
    startTransition(async () => {
      const result = await application(formData)
      if (!result.success) {
        toast.error('申請に失敗しました。')
      } else {
        toast.success(
          '申請ありがとうございます。\nユーザーに安心してご利用いただくため、\n申請から承認までは数日かかることがあります',
        )
        reset()
      }
    })
  }
  return (
    <div className='min-h-screen bg-gradient-to-r from-[#e6f3ff] to-[#fff0f5] px-4 py-12 sm:px-6 lg:px-8'>
      <Toaster />
      <Card className='mx-auto max-w-2xl overflow-hidden shadow-lg'>
        <div className='relative h-[200px] w-full overflow-hidden bg-gradient-to-r from-[#e6f3ff] to-[#f0f8ff]'>
          <div className='absolute inset-0 flex items-center'>
            <Image
              src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_974974491_s.jpg-IyLb49FpZC9kYFQwgn1hRB0UTl7d3p.jpeg'
              alt='Decorative illustration'
              layout='fill'
              objectFit='cover'
              className='opacity-60'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-[#4a90e2]/30 via-[#5ca0e2]/20 to-[#6eb0e2]/10' />
          </div>
          <div className='absolute inset-0 flex flex-col items-start justify-center px-6 sm:px-8'>
            <div className='max-w-xl rounded-lg bg-white/60 p-4 shadow-lg backdrop-blur-sm'>
              <h1 className='mb-2 flex items-center text-2xl font-bold text-[#4a4a4a] md:text-3xl'>
                公認セラピスト申請
              </h1>
              <button
                onClick={() => setShowModal(true)}
                className='group flex items-center text-sm text-[#4a90e2] transition-colors hover:text-[#6eb0e2]'
              >
                <span className='mr-1 transform text-3xl font-bold transition-transform group-hover:translate-x-1'>
                  →
                </span>
                <span>公認セラピストとは</span>
              </button>
            </div>
          </div>
          <div className='absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#808080] via-[#a0a0a0] to-[#c0c0c0]' />
        </div>
        <CardContent className='p-6'>
          <form action={formAction} className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='nickname' className='text-[#4a4a4a]'>
                セラピスト名 <span className='text-[#ff7e8a]'>*</span>
                <span className='ml-1 text-sm text-[#ff7e8a]'>(必須)</span>
              </Label>
              <Input
                {...register('nickname')}
                className='w-full border-[#e6e6e6] focus:border-[#ff7e8a] focus:ring-[#ff7e8a]'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='shopid' className='text-[#4a4a4a]'>
                店舗 <span className='text-[#ff7e8a]'>*</span>
                <span className='ml-1 text-sm text-[#ff7e8a]'>(必須)</span>
              </Label>
              <Controller
                name='shopId'
                control={control}
                render={({ field }) => (
                  <Select
                    instanceId='shop-list'
                    {...field}
                    value={shopOptions.find((opt) => opt.value === field.value) ?? null}
                    options={shopOptions}
                    styles={customStyles}
                    placeholder='店舗を選択してください'
                    isClearable
                    className='w-full'
                    onChange={async (v) => {
                      const value = v?.value
                      setValue('shopId', value, { shouldValidate: true })
                      await trigger('shopId')
                    }}
                  />
                )}
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='customShop' className='text-[#4a4a4a]'>
                ※店舗が見つからない場合はこちらに店舗名を入力してください
              </Label>
              <Input
                {...register('customShop')}
                className='w-full border-[#e6e6e6] focus:border-[#ff7e8a] focus:ring-[#ff7e8a]'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='tiktok' className='text-[#4a4a4a]'>
                TikTok <span className='text-[#ff7e8a]'>*</span>
                <span className='ml-1 text-sm text-[#ff7e8a]'>(必須)</span>
              </Label>
              <div className='relative'>
                <div className='text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 transform font-medium'>
                  @
                </div>
                <Input
                  {...register('tiktok')}
                  placeholder='username'
                  className='w-full border-[#e6e6e6] pl-8 focus:border-[#ff7e8a] focus:ring-[#ff7e8a]'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='twitter' className='text-[#4a4a4a]'>
                X(旧Twitter)
              </Label>
              <div className='relative'>
                <div className='text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 transform font-medium'>
                  @
                </div>
                <Input
                  {...register('twitter')}
                  placeholder='username'
                  className='w-full border-[#e6e6e6] pl-8 focus:border-[#ff7e8a] focus:ring-[#ff7e8a]'
                />
              </div>
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='age' className='text-[#4a4a4a]'>
                  年齢
                </Label>
                <Input
                  {...register('age', { valueAsNumber: true })}
                  type='number'
                  className='w-full border-[#e6e6e6] focus:border-[#ff7e8a] focus:ring-[#ff7e8a]'
                />
                <Label htmlFor='height' className='text-[#4a4a4a]'>
                  身長 (cm)
                </Label>
                <Input
                  {...register('height', { valueAsNumber: true })}
                  type='number'
                  className='w-full border-[#e6e6e6] focus:border-[#ff7e8a] focus:ring-[#ff7e8a]'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='weight' className='text-[#4a4a4a]'>
                  体重 (kg)
                </Label>
                <Input
                  {...register('weight', { valueAsNumber: true })}
                  type='number'
                  className='w-full border-[#e6e6e6] focus:border-[#ff7e8a] focus:ring-[#ff7e8a]'
                />
              </div>
            </div>
            <div className='mt-6 flex justify-center'>
              <Button
                disabled={!isValid || isPending}
                className='w-full bg-[#4a4a4a] px-6 py-3 text-lg text-white transition-colors hover:bg-[#666666] sm:w-auto sm:min-w-[200px]'
                type='submit'
              >
                申請
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='w-full max-w-md rounded-lg bg-white p-8'>
            <h2 className='mb-6 text-2xl font-bold text-[#4a90e2]'>公認セラピストのメリット</h2>
            <ul className='mb-6 space-y-4'>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-6 w-6 flex-shrink-0 text-[#4a90e2]'
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
                  className='mr-2 h-6 w-6 flex-shrink-0 text-[#4a90e2]'
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
                <span>一覧ページで優先的に表示され、注目度アップ！</span>
              </li>
              <li className='flex items-start'>
                <svg
                  className='mr-2 h-6 w-6 flex-shrink-0 text-[#4a90e2]'
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
                <span>信頼性向上で、お客様からの予約が増加！</span>
              </li>
            </ul>
            <p className='mb-6 text-sm font-medium text-[#ff7e8a]'>
              ※ユーザーに安心してご利用いただくため、申請から承認までは数日かかることがあります
            </p>
            <button
              onClick={() => setShowModal(false)}
              className='w-full rounded bg-[#4a90e2] px-6 py-2 text-white transition-colors hover:bg-[#6eb0e2]'
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

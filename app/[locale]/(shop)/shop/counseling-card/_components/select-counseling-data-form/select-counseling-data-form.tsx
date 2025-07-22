'use client'

import { cva } from 'class-variance-authority'
import { CheckCircle, FileText, PlusCircle } from 'lucide-react'
import { type userFlowType } from '../entry-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const cardVariants = cva('w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden', {
  variants: {
    gradient: {
      default: '',
    },
  },
  defaultVariants: {
    gradient: 'default',
  },
})

const buttonVariants = cva(
  'w-full transition-all duration-200 py-4 px-4 text-sm font-medium relative overflow-hidden group',
  {
    variants: {
      variant: {
        primary: 'bg-[#9370DB] hover:bg-[#7B68EE] text-white',
        outline:
          'bg-white hover:bg-[#f3f4f6] text-[#9370DB] border-[#9370DB] hover:border-[#7B68EE]',
        link: 'text-[#7B68EE] hover:text-[#9370DB]',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

type Pros = {
  selectType: (type: userFlowType) => void
}

export const SelectCounselingDataForm = (props: Pros) => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-[#E6E6FA] to-[#F8F8FF] p-4 sm:p-8'>
      <Card className={cardVariants()}>
        <CardContent className={cn(cardVariants(), 'flex flex-col items-center space-y-6 p-6')}>
          <div className='flex h-16 w-16 items-center justify-center rounded-full bg-[#9370DB]'>
            <CheckCircle className='h-10 w-10 text-white' />
          </div>
          <h2 className='text-2xl font-bold text-[#9370DB]'>予約内容を送信しました</h2>
          <div className='w-full rounded-lg border border-[#d1d5db] bg-[#f9fafb] p-4'>
            <h3 className='mb-2 flex items-center text-lg font-semibold text-[#4a4a4a]'>
              <FileText className='mr-2 h-5 w-5 text-[#9370DB]' />
              次のステップ：カウンセリングカード
            </h3>
            <p className='mb-4 text-sm text-[#6a6a6a]'>
              サービスをご提供するため、事前にカウンセリングカードのご記入をお願いしております。お客様のご要望やお好みをお聞かせください。
            </p>
            <div className='space-y-4'>
              {/*<Button*/}
              {/*  className={cn(*/}
              {/*    buttonVariants({ variant: 'outline' }),*/}
              {/*    'border-2 border-[#9370DB] text-[#9370DB] hover:bg-[#9370DB] hover:text-white',*/}
              {/*  )}*/}
              {/*  onClick={() => props.selectType('select-counseling-data-type')}*/}
              {/*>*/}
              {/*  <span className='relative z-10 flex items-center'>*/}
              {/*    <FolderOpen className='w-4 h-4 mr-2' />*/}
              {/*    マイページからカードを選択*/}
              {/*  </span>*/}
              {/*</Button>*/}
              <Button
                className={buttonVariants({ variant: 'primary' })}
                onClick={() => props.selectType('input-counseling-data')}
              >
                <span className='relative z-10 flex items-center'>
                  <PlusCircle className='mr-2 h-4 w-4' />
                  カウンセリングカードを新たに作成
                </span>
                <span className='absolute inset-0 bg-white opacity-0 transition-opacity duration-200 group-hover:opacity-20'></span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

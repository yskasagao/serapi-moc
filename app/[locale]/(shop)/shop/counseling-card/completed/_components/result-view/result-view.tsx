import { cva } from 'class-variance-authority'
import { CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const cardVariants = cva('w-full max-w-md mx-auto shadow-lg bg-white relative overflow-hidden', {
  variants: {
    gradient: {
      default:
        'before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-[#9370DB] before:via-[#7B68EE] before:to-[#9370DB]',
    },
  },
  defaultVariants: {
    gradient: 'default',
  },
})

// const buttonVariants = cva(
//   'w-full transition-all duration-200 py-3 text-base font-medium relative overflow-hidden group',
//   {
//     variants: {
//       variant: {
//         primary: 'bg-[#9370DB] hover:bg-[#7B68EE] text-white',
//         outline:
//           'bg-white hover:bg-[#F8F8FF] text-[#9370DB] border-[#9370DB] hover:border-[#7B68EE]',
//         link: 'text-[#7B68EE] hover:text-[#9370DB]',
//         submit: 'bg-[#4A4A4A] hover:bg-[#666666] text-white py-4',
//       },
//     },
//     defaultVariants: {
//       variant: 'primary',
//     },
//   },
// )

export const ResultView = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-[#E6E6FA] to-[#F8F8FF] p-4 font-sans text-[#4A4A4A]'>
      <Card className={cardVariants()}>
        <CardHeader className='pb-6 text-center'>
          <CardTitle className='flex items-center justify-center font-serif text-xl font-bold text-[#9370DB]'>
            <CheckCircle className='mr-2 h-6 w-6 text-[#7FD48E]' />
            送信完了
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <p className='text-center text-base'>追って連絡いたします</p>

          {/*<div className='space-y-4'>*/}
          {/*  <div className='flex items-center bg-[#F8F8FF] p-3 rounded-lg'>*/}
          {/*    <Camera className='w-5 h-5 mr-2 text-[#9370DB]' />*/}
          {/*    <span className='text-sm'>作成したカウンセリングカードを写真に保存できます</span>*/}
          {/*  </div>*/}
          {/*  <div className='flex items-center bg-[#F8F8FF] p-3 rounded-lg'>*/}
          {/*    <QrCode className='w-5 h-5 mr-2 text-[#9370DB]' />*/}
          {/*    <span className='text-sm'>*/}
          {/*      作成したカウンセリングカードはQRコードとしても保存できます*/}
          {/*    </span>*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/*<Button className={buttonVariants({ variant: 'primary' })}>*/}
          {/*  <QrCode className='w-5 h-5 mr-2' />*/}
          {/*  <span className='relative z-10'>QRコードを表示</span>*/}
          {/*  <span className='absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200'></span>*/}
          {/*</Button>*/}

          {/*<Button variant='outline' className={buttonVariants({ variant: 'outline' })}>*/}
          {/*  <Home className='w-5 h-5 mr-2' />*/}
          {/*  <span className='relative z-10'>マイページへ</span>*/}
          {/*  <span className='absolute inset-0 bg-[#9370DB] opacity-0 group-hover:opacity-10 transition-opacity duration-200'></span>*/}
          {/*</Button>*/}
        </CardContent>
      </Card>
    </div>
  )
}

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const StoreRegistrationSection = () => {
  return (
    <div className='px-4 py-16 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-2xl lg:max-w-6xl'>
        <Card className='transform border-2 border-[#1a1a1a] bg-white shadow-2xl transition-all duration-200 hover:shadow-3xl hover:border-[#000000]'>
        <CardContent className='p-10'>
          {/* モバイル・タブレット用: 縦積みレイアウト */}
          <div className='text-center lg:hidden'>
            <div className='mb-8'>
              <h2 className='mb-4 text-2xl font-black tracking-tight text-[#000000] md:text-3xl'>
                店舗オーナー様へ
              </h2>
              <div className='mx-auto h-1 w-24 bg-[#000000]' />
            </div>
            
            <div className='mb-8 space-y-4'>
              <p className='text-base font-medium leading-relaxed text-[#333333]'>
                セラピストの皆様により良いサービスを提供していただくため、<br />
                店舗の公認登録をお勧めしています。
              </p>
            </div>

            <div className='mb-10 border border-[#e8e8e8] bg-[#f8f9fa] px-4 py-8 shadow-sm'>
              <h3 className='mb-6 text-lg font-bold tracking-wide text-[#2c2c2c]'>
                公認店舗のメリット
              </h3>
              <div className='space-y-4'>
                <div className='flex items-center justify-start border-b border-[#f0f0f0] pb-3'>
                  <div className='mr-4 flex h-6 w-6 items-center justify-center bg-[#333333] text-xs text-white'>
                    ✓
                  </div>
                  <span className='text-left text-[#4a4a4a]'>優先的な露出で集客力アップ</span>
                </div>
                <div className='flex items-center justify-start border-b border-[#f0f0f0] pb-3'>
                  <div className='mr-4 flex h-6 w-6 items-center justify-center bg-[#333333] text-xs text-white'>
                    ✓
                  </div>
                  <span className='text-left text-[#4a4a4a]'>公認店舗マークで信頼度向上</span>
                </div>
                <div className='flex items-center justify-start pb-1'>
                  <div className='mr-4 flex h-6 w-6 items-center justify-center bg-[#333333] text-xs text-white'>
                    ✓
                  </div>
                  <span className='text-left text-[#4a4a4a]'>詳細な店舗情報掲載が可能</span>
                </div>
              </div>
            </div>

            <div className='flex justify-center'>
              <Link href='/store-application'>
                <Button 
                  className='border-2 border-[#000000] bg-[#000000] px-10 py-5 text-base font-bold tracking-wider text-white transition-all duration-200 hover:bg-white hover:text-[#000000] hover:shadow-xl sm:min-w-[280px] uppercase'
                >
                  公認店舗登録はこちら
                </Button>
              </Link>
            </div>
          </div>

          {/* PC用: 横長レイアウト */}
          <div className='hidden lg:block'>
            <div className='grid grid-cols-2 gap-20 items-center'>
              {/* 左側: タイトルとメッセージ */}
              <div className='text-left'>
                <div className='mb-8'>
                  <h2 className='mb-4 text-3xl font-black tracking-tight text-[#000000]'>
                    店舗オーナー様へ
                  </h2>
                  <div className='h-1 w-28 bg-[#000000]' />
                </div>
                
                <div className='space-y-6'>
                  <p className='text-lg font-medium leading-relaxed text-[#333333]'>
                    セラピストの皆様により良いサービスを<br />
                    提供していただくため、<br />
                    店舗の公認登録をお勧めしています。
                  </p>
                </div>

                <div className='mt-10'>
                  <Link href='/store-application'>
                    <Button 
                      className='border-2 border-[#000000] bg-[#000000] px-12 py-6 text-lg font-bold tracking-wider text-white transition-all duration-200 hover:bg-white hover:text-[#000000] hover:shadow-xl min-w-[320px] uppercase'
                    >
                      公認店舗登録はこちら
                    </Button>
                  </Link>
                </div>
              </div>

              {/* 右側: メリット一覧 */}
              <div className='border border-[#e8e8e8] bg-[#f8f9fa] p-10 shadow-sm'>
                <h3 className='mb-8 text-xl font-bold tracking-wide text-[#2c2c2c]'>
                  公認店舗のメリット
                </h3>
                <div className='space-y-6'>
                  <div className='flex items-center justify-start border-b border-[#f0f0f0] pb-4'>
                    <div className='mr-5 flex h-7 w-7 items-center justify-center bg-[#333333] text-sm text-white'>
                      ✓
                    </div>
                    <span className='text-left text-lg text-[#4a4a4a]'>優先的な露出で集客力アップ</span>
                  </div>
                  <div className='flex items-center justify-start border-b border-[#f0f0f0] pb-4'>
                    <div className='mr-5 flex h-7 w-7 items-center justify-center bg-[#333333] text-sm text-white'>
                      ✓
                    </div>
                    <span className='text-left text-lg text-[#4a4a4a]'>公認店舗マークで信頼度向上</span>
                  </div>
                  <div className='flex items-center justify-start pb-2'>
                    <div className='mr-5 flex h-7 w-7 items-center justify-center bg-[#333333] text-sm text-white'>
                      ✓
                    </div>
                    <span className='text-left text-lg text-[#4a4a4a]'>詳細な店舗情報掲載が可能</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        </Card>
      </div>
    </div>
  )
}
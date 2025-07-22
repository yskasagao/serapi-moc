import { type Metadata } from 'next'
import { Terms } from '@/components/terms'

export const metadata: Metadata = {
  title: '利用規約 | TikTokで推しセラピスト探し - 女性用風俗のコミュニティサイト',
  description:
    'TikTokで推しの女性用風俗セラピストを見つけて応援。女子目線のリアルな口コミが見れて、推し活仲間も見つかるコミュニティサイトです。',
}

export default async function Page() {
  return (
    <div className='container mx-auto max-w-[980px] px-4 py-8'>
      <Terms />
    </div>
  )
}

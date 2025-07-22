'use server'

import { StoreApplicationSchema } from './schema'
import mediaPrisma from '@/lib/prisma'

type Result =
  | {
      success: true
      message: string
    }
  | {
      success: false
      error: string
    }

export const submitStoreApplication = async (formData: FormData): Promise<r> => {
  const parsed = StoreApplicationSchema.safeParse({
    storeName: formData.get('storeName'),
    homepageUrl: formData.get('homepageUrl'),
    storeImage: formData.get('storeImage'),
    businessNumber: formData.get('businessNumber'),
    prefecture: formData.get('prefecture'),
    email: formData.get('email'),
  })

  if (!parsed.success) {
    return { success: false, error: '入力内容に誤りがあります。' }
  }

  try {
    // TODO: データベースのテーブルが作成されたら、実際のデータを保存
    // 現在は仮実装として、ログのみ出力
    console.log('Store application data:', parsed.data)
    
    // await mediaPrisma.storeApplication.create({
    //   data: {
    //     storeName: parsed.data.storeName,
    //     homepageUrl: parsed.data.homepageUrl || null,
    //     businessNumber: parsed.data.businessNumber,
    //     prefecture: parsed.data.prefecture,
    //     email: parsed.data.email,
    //     // storeImageUrl: imageUrl, // 画像アップロード機能実装後に追加
    //   },
    // })

    return { 
      success: true, 
      message: '申請ありがとうございます。\\n審査には数日かかる場合があります。\\n結果はメールでお知らせいたします。'
    }
  } catch (error) {
    console.error('Store application error:', error)
    return { success: false, error: '申請処理中にエラーが発生しました。' }
  }
}

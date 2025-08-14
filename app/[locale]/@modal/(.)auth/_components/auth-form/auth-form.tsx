'use client'

import { Clock } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { Link } from '@/i18n/routing'
import GoogleIcon from '@assets/icon-google.svg'
import XIcon from '@assets/x.svg'
import type { AuthFormProps } from './schema'

export const AuthForm = ({ featureName }: AuthFormProps) => {
  return (
    <div>
      {/* メインコピー */}
      <div className="text-center mb-6">
        <h2 className="text-sm font-semibold text-gray-800 leading-relaxed">
          アカウント登録するとより多くの機能がご利用できます
        </h2>
      </div>

      {/* 機能一覧 */}
      <div className="mb-12">
        <div className="flex justify-center">
          <div className="bg-white rounded-lg p-5 border border-brand-ui-static shadow-sm max-w-[480px] w-full">
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-brand-ui-static rounded-full flex-shrink-0"></div>
                <span>逆オファー、体験談のSERAPIへの投稿</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <div className="w-1.5 h-1.5 bg-brand-ui-static rounded-full flex-shrink-0"></div>
                <span className="font-semibold text-brand-ui-static">口コミ・ファンメ投稿</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-brand-ui-static rounded-full flex-shrink-0"></div>
                <span>ブックマーク</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ログインボタンエリア */}
      <div className="space-y-6">
        {/* 簡単登録の案内 */}
        <div className="text-center">
          <div className="text-sm text-gray-600 bg-blue-50 rounded-full px-5 py-2.5 inline-flex items-center gap-2 border border-blue-100">
            <Clock className="w-4 h-4" />
            アカウント登録は1分で簡単にできます
          </div>
        </div>

        {/* ソーシャルログインボタン */}
        <div className="flex flex-col items-center gap-3 py-2">
          <button
            onClick={() => signIn('google')}
            className="flex h-[48px] w-full max-w-[320px] items-center justify-center gap-3 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors shadow-[0_3px_6pt_#00000029] rounded-lg"
          >
            <GoogleIcon width={20} height={20} />
            <span className="font-medium">Googleでログイン</span>
          </button>

          <button
            onClick={() => signIn('twitter')}
            className="flex h-[48px] w-full max-w-[320px] items-center justify-center gap-3 bg-black text-white hover:bg-gray-800 transition-colors shadow-[0_3px_6pt_#00000029] rounded-lg"
          >
            <XIcon width={20} height={20} />
            <span className="font-medium">X(Twitter)でログイン</span>
          </button>
        </div>

        {/* 注意事項 */}
        <div className="text-center pt-2">
          <p className="text-xs text-gray-500 leading-relaxed max-w-[360px] mx-auto">
            ログインすることで、
            <Link href="/terms" className="text-brand-ui hover:underline">利用規約</Link>
            および
            <Link href="/privacy" className="text-brand-ui hover:underline">プライバシーポリシー</Link>
            に同意したものとします
          </p>
        </div>

        {/* ログインせずに利用する */}
        <div className="text-center pt-8 mt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4 leading-relaxed max-w-[640px] mx-auto">
            ※{featureName ? `${featureName}の` : ''}SNS投稿画像の作成はアカウント登録なしでもご利用いただけます
          </p>
          <Link 
            href="#" 
            className="text-sm text-gray-600 hover:text-gray-800 underline transition-colors"
          >
            ログインせずに利用する
          </Link>
        </div>
      </div>
    </div>
  )
}

# 技術スタック・アーキテクチャ

## フレームワーク・ライブラリ
- **Next.js 15.1.6**: App Router使用
- **React**: フロントエンドフレームワーク
- **TypeScript**: 型安全性の確保
- **Tailwind CSS**: スタイリング
- **Prisma ORM**: データベース操作
- **NextAuth.js**: 認証システム

## UI・スタイリング
- **Radix UI**: 高品質UIコンポーネント
- **Tailwind CSS**: ユーティリティファーストCSS
- **Class Variance Authority (CVA)**: コンポーネントバリアント管理
- **Framer Motion**: アニメーション
- **Lucide React**: アイコンライブラリ

## データ管理
- **@tanstack/react-query**: サーバー状態管理
- **Zod**: スキーマバリデーション
- **React Hook Form**: フォーム管理

## 開発ツール
- **ESLint**: コード品質管理
- **Docker Compose**: 開発環境データベース
- **Sass**: CSSプリプロセッサ

## アーキテクチャパターン
- **Monorepo構成**: apps/web, apps/admin, apps/company
- **App Router**: Next.js 14のファイルベースルーティング
- **Server Actions**: サーバーサイド処理
- **責任分離**: UI Layer / Logic Layer / Data Layer / Validation Layer

## ファイル構造パターン
```
feature/
├── page.tsx                    # ページコンポーネント
├── _components/                # 機能固有コンポーネント
│   ├── component-name/
│   │   ├── index.ts           # エクスポート
│   │   ├── component.tsx      # UIコンポーネント
│   │   ├── action.ts          # Server Actions
│   │   └── schema.ts          # 型定義・バリデーション
```
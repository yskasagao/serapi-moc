# SERAPI-STAR コードベース分析

## 📊 アーキテクチャ概要

### 🏗️ 全体アーキテクチャ
**現代的なフルスタックNext.jsアプリケーション**
- **フレームワーク**: Next.js 15 App Router
- **言語**: TypeScript (strict モード)
- **アーキテクチャパターン**: レイヤード・アーキテクチャ + ドメイン駆動設計の要素

### 🎯 設計思想
1. **責任分離の原則**: UI/Logic/Data/Validationの明確な分離
2. **型安全性ファースト**: Zod + TypeScriptによるランタイム・コンパイル時両方の安全性
3. **Colocation**: 機能ごとのディレクトリ構造（`_components`フォルダパターン）

## 🗄️ データベース設計

### デュアルデータベース構成
```typescript
// メディアデータベース (media-db)
import { PrismaClient } from '@prisma/client/media-db'

// 会社データベース (company-db)  
import { PrismaClient } from '@prisma/client/company-db'
```

### 特徴
- **分離された責務**: メディア系データと会社系データの分離
- **Prisma ORM**: 型安全なデータベースアクセス
- **グローバルシングルトン**: 開発環境でのコネクション最適化
- **クエリログ**: 開発時の詳細ログ出力

### 型安全なクエリパターン
```typescript
// Prisma Validatorを使用した型定義
export const SerapistarDetailSelect = Prisma.validator<Prisma.SerapistarDefaultArgs>()({
  select: {
    id: true,
    slug: true,
    // ... 詳細な選択
  }
})
export type SerapistarDetail = Prisma.SerapistarGetPayload<typeof SerapistarDetailSelect>
```

## 🧩 コンポーネント設計パターン

### 1. ディレクトリベース機能分割
```
feature/
├── page.tsx                    # ページコンポーネント
├── _components/                # 機能固有コンポーネント
│   ├── component-name/
│   │   ├── index.ts           # エクスポート管理
│   │   ├── component.tsx      # UIコンポーネント
│   │   ├── action.ts          # Server Actions
│   │   └── schema.ts          # バリデーション
```

### 2. レイヤード設計
- **Presentation Layer**: React コンポーネント（UI専用）
- **Business Logic Layer**: Server Actions（ビジネスロジック）
- **Data Access Layer**: Prisma（データアクセス）
- **Validation Layer**: Zod schemas（入力検証）

### 3. 型安全なフォーム処理
```typescript
const formSchema = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
  images: z.array(z.instanceof(File)),
})

export const createDiary = async (formData: FormData): Promise<Result> => {
  const parsed = formSchema.safeParse({ /* ... */ })
  // 型安全な処理
}
```

## 🔐 認証・セキュリティ

### NextAuth.js ベース認証システム
```typescript
export const getAuthOptions = (): NextAuthOptions => ({
  providers: [GoogleProvider, TwitterProvider],
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 * 7 },
  adapter: PrismaAdapter(prisma),
  // ...
})
```

### セキュリティ特徴
- **JWT戦略**: ステートレスセッション管理
- **OAuth統合**: Google・Twitter認証
- **Prisma Adapter**: データベース自動同期
- **セッション管理**: 7日間の有効期限
- **カスタムコールバック**: ユーザー情報の動的更新

### 開発時認証バイパス
```typescript
// 開発効率化のための認証バイパス機能
export const getSessionWithDevBypass = async () => {
  // 開発環境での柔軟な認証処理
}
```

## 🌐 API設計とデータフロー

### RESTful API + Server Actions
```typescript
// GET APIの例
export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  
  // モックデータサポート
  if (useMockData()) {
    return Response.json(generateMockData())
  }
  
  // 実データベース処理
  const result = await prisma.experienceDiary.findMany({
    // Prismaクエリ
  })
  
  // Zodによるレスポンス検証
  return Response.json(ResponseDataSchema.parse(result))
}
```

### Server Actions パターン
```typescript
'use server'
export const createDiary = async (formData: FormData): Promise<Result> => {
  // 1. 認証チェック
  const session = await getServerSession(getAuthOptions())
  
  // 2. 入力検証 (Zod)
  const parsed = formSchema.safeParse(data)
  
  // 3. ビジネスロジック処理
  // 4. データベース操作
  // 5. 結果の返却
}
```

### データフロー特徴
- **モックデータサポート**: 開発時の柔軟性
- **カーソルベースページネーション**: 大量データの効率的処理
- **画像最適化**: Sharp + WebP変換
- **ファイルアップロード**: S3統合

## 🌍 国際化とルーティング

### Next-intl による多言語対応
```typescript
export const routing = defineRouting({
  locales: ['ja', 'ch'],
  defaultLocale: 'ja',
  localePrefix: 'as-needed',
})
```

### 特徴
- **2言語サポート**: 日本語・中国語
- **App Router統合**: ネイティブNext.js統合
- **型安全なナビゲーション**: カスタムLink/Router

## 📊 状態管理とパフォーマンス

### クライアントサイド状態管理
- **React State**: ローカル状態管理
- **Server Actions**: サーバー状態の同期
- **React Query**: 不使用（Next.js App Routerの恩恵）

### パフォーマンス最適化
```typescript
// 無限スクロール実装
export const useInfiniteScroll = <T extends Element>({
  target, hasMore, onIntersect
}: UseInfiniteScrollProps<T>) => {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && hasMore) {
        onIntersect()
      }
    })
    // ...
  }, [target, hasMore, onIntersect])
}
```

### 最適化手法
- **Image最適化**: Next.js Image + Sharp
- **遅延読み込み**: IntersectionObserver
- **Canvas処理**: html2canvas（画像生成）
- **メディアクエリフック**: レスポンシブ対応

## 🎨 UI/UXシステム

### Design System
- **Radix UI**: アクセシブルなプリミティブ
- **Tailwind CSS**: ユーティリティファースト
- **CVA**: バリアント管理
- **shadcn/ui**: 高品質コンポーネント

### カラーシステム
```javascript
// 統一ブランドカラー
colors: {
  brand: {
    'icon': '#FE2C55',           // インタラクティブアイコン
    'icon-hover': '#E8254A',     // ホバー状態
    'ui': '#ff7e8a',             // UIパーツ
    'ui-hover': '#ff6b7a',       // UIパーツホバー
  }
}
```

## 🔧 開発体験 (DX)

### モックデータシステム
```typescript
export const useMockData = (): boolean => {
  return process.env.USE_MOCK_DATA === 'true'
}

// 条件分岐によるデータソース切り替え
if (useMockData()) {
  return generateMockData()
} else {
  return await prisma.query()
}
```

### TypeScript設定
- **Strict Mode**: 厳格な型チェック
- **Path Mapping**: `@/*` エイリアス
- **noUncheckedIndexedAccess**: 配列アクセスの安全性

## 💼 ビジネスロジック特徴

### ドメイン固有実装
- **セラピスト管理**: プロフィール・評価システム
- **体験日記**: UGC（User Generated Content）
- **コメント・レビューシステム**: コミュニティ機能
- **ブックマーク機能**: ユーザーエンゲージメント

### 外部統合
- **TikTok API**: ライブチェック
- **Twitter/X**: クローリング機能
- **LINE連携**: OAuth認証
- **AWS S3**: ファイルストレージ

## 📈 スケーラビリティと保守性

### 優秀な設計ポイント
1. **型安全性の徹底**: コンパイル時・ランタイム両方での安全性
2. **責務の明確な分離**: 各レイヤーの独立性
3. **再利用可能性**: コンポーネントの適切な抽象化
4. **テスタビリティ**: Server Actionsによる単体テスト容易性
5. **開発効率**: モックデータシステムによる並行開発

### 拡張ポイント
- **モジュラー設計**: 新機能追加の容易性
- **国際化対応**: 新言語追加のシンプルさ
- **データベース分離**: マイクロサービス化への準備
- **型定義の中央集権**: 全体の整合性保持

## 🏆 総合評価

このコードベースは**現代的なフルスタック開発のベストプラクティス**を多数採用しており、特に以下の点で優秀：

1. **型安全性**: TypeScript + Zod の組み合わせによる堅牢性
2. **開発体験**: モックデータシステムによる効率的な開発フロー
3. **アーキテクチャ**: 清潔で保守しやすい責任分離
4. **スケーラビリティ**: 将来の拡張を見据えた設計
5. **パフォーマンス**: Next.js App Routerの最適化活用

**技術的負債は少なく**、継続的な開発・保守に適した高品質なコードベースです。
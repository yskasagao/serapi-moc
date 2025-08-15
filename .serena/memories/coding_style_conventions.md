# コーディングスタイル・規約

## TypeScript設定
- **strictモード**: 有効
- **noUncheckedIndexedAccess**: 有効
- **isolatedModules**: 有効
- **checkJs**: 有効

## プロジェクト構造
```
apps/web/
├── app/                    # Next.js App Router
│   ├── [locale]/          # 国際化対応
│   ├── api/               # API Routes
│   └── _components/       # 共通コンポーネント
├── components/            # 再利用可能コンポーネント
├── lib/                   # ユーティリティ・設定
├── types/                 # 型定義
├── styles/                # スタイルファイル
├── public/                # 静的ファイル
└── providers/             # React Context Provider
```

## 設計原則

### 1. 責任分離の原則
- **UI Layer**: コンポーネント（表示のみ）
- **Logic Layer**: Server Actions（ビジネスロジック）
- **Data Layer**: Prisma（データアクセス）
- **Validation Layer**: Zod（入力検証）

### 2. 型安全性ファースト
- Zodスキーマによるランタイム検証
- `z.infer<typeof Schema>`による型推論
- 手動型定義の最小化

### 3. コンポーネント設計
```typescript
// 推奨パターン
const EditSchema = z.object({
  name: z.string().min(1, { message: 'nameを入力してください。' }),
  message: z.string().max(160, { message: '160文字以内で入力してください。' }).nullable(),
})

type EditFormData = z.infer<typeof EditSchema>
```

## カラーシステム
### ブランドカラー使用ルール
- **インタラクティブアイコン**: `text-brand-icon` (#FE2C55)
- **インタラクティブアイコンホバー**: `text-brand-icon-hover` (#E8254A)
- **インタラクティブUIパーツ**: `bg-brand-ui` (#ff7e8a)
- **インタラクティブUIパーツホバー**: `bg-brand-ui-hover` (#ff6b7a)

## ファイル命名規則
- **コンポーネント**: PascalCase (e.g., `UserProfile.tsx`)
- **ページ**: kebab-case (e.g., `user-profile/page.tsx`)
- **ユーティリティ**: camelCase (e.g., `formatDate.ts`)
- **型定義**: PascalCase (e.g., `UserData`)

## ESLint・コード品質
- ESLint設定は`../../eslint.config.mjs`を継承
- `npm run lint`で品質チェック
- `npm run lint:fix`で自動修正

## 国際化(i18n)
- Next-intlを使用
- ルートパス: `/[locale]/`
- デフォルトロケール: `ja`

## タスク完了時の確認事項
1. `npm run lint`でコード品質確認
2. TypeScriptエラーがないことを確認
3. 適切なカラーシステムを使用
4. Zodスキーマによる型安全性確保
# SERAPI プロジェクト 開発思想ドキュメント

## プロジェクト概要

### アーキテクチャ
- **Monorepo構成**: `apps/admin`, `apps/company`, `apps/web` の3つのアプリケーション
- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS + Class Variance Authority (CVA)
- **データベース**: Prisma ORM
- **認証**: NextAuth.js

## 核となる設計思想

### 1. **明確な責任分離の原則**

#### ファイル構造による責任分離
```
feature/
├── page.tsx                    # ページコンポーネント（ルーティング）
├── _components/                # 機能固有のコンポーネント
│   ├── component-name/         # 個別コンポーネント
│   │   ├── index.ts           # エクスポート
│   │   ├── component.tsx      # UIコンポーネント
│   │   ├── action.ts          # Server Actions（データ操作）
│   │   └── schema.ts          # 型定義・バリデーション
```

#### レイヤー分離
- **UI Layer**: コンポーネント（表示のみ）
- **Logic Layer**: Server Actions（ビジネスロジック）
- **Data Layer**: Prisma（データアクセス）
- **Validation Layer**: Zod（入力検証）

### 2. **型安全性ファーストアプローチ**

#### Zodによるスキーマ中心設計
```typescript
// スキーマ定義
const EditSchema = z.object({
  name: z.string().min(1, { message: 'nameを入力してください。' }),
  message: z.string().max(160, { message: '160文字以内で入力してください。' }).nullable(),
})

// 型の自動生成
type EditFormData = z.infer<typeof EditSchema>
```

#### 利点
- **ランタイム検証**: 実行時の型安全性
- **型推論**: 手動型定義の削減
- **一元管理**: バリデーションルールと型の統一

### 3. **コンポーネント設計パターン**

#### 単一責任の原則
```typescript
// ❌ 悪い例：複数の責任を持つコンポーネント
const BadComponent = () => {
  // データフェッチ + UI表示 + ビジネスロジック
}

// ✅ 良い例：UIのみに集中
const ProfileView = ({ user }: { user: ProfileSchema }) => {
  // UI表示のみ
}
```

#### Props設計
```typescript
// 型安全なProps
type Props = {
  user: ProfileSchema        // 具体的な型
  isOpen: boolean           // プリミティブ型
  onClose: () => void       // 明確な関数シグネチャ
}
```

### 4. **Server Actions パターン**

#### 構造化されたレスポンス
```typescript
type Result =
  | { success: true; message: string }
  | { success: false; error: string }

export const edit = async (formData: FormData): Promise<Result> => {
  // バリデーション
  const parsed = EditSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.message }
  }
  
  // ビジネスロジック
  // ...
  
  return { success: true, message: 'success' }
}
```

#### Server Actionsの責任
- **入力検証**: Zodによるvalidation
- **認証チェック**: セッション確認
- **ビジネスロジック**: データ操作
- **エラーハンドリング**: 構造化されたエラーレスポンス

### 5. **定数管理戦略**

#### 中央集約管理
```typescript
// lib/constants.ts
export const presetUserIconMap = new Map([
  [1, 'https://assets.serapi-star.club/user-icons/preset-user-icon-1.webp'],
  // ...
])

export const areaGroupMap = new Map([
  ['北海道', 'hokkaido'],
  // ...
])
```

#### 利点
- **一元管理**: 変更時の影響範囲を限定
- **型安全**: Map型による型推論
- **性能**: Mapによる高速な参照

### 6. **スタイリング戦略**

#### CVA (Class Variance Authority) パターン
```typescript
const buttonVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white',
        secondary: 'bg-secondary text-gray',
      },
      size: {
        sm: 'h-8 px-3',
        lg: 'h-12 px-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  },
)
```

#### 利点
- **型安全なバリアント**: コンパイル時チェック
- **一貫性**: デザインシステムの強制
- **保守性**: スタイルの中央管理

### 7. **状態管理パターン**

#### ローカルステート優先
```typescript
// React Hooks による状態管理
const [isOpen, toggleIsOpen] = useToggle(false)
const [formData, setFormData] = useState(initialData)
```

#### サーバーステート
```typescript
// Server Actions + revalidatePath による同期
await prisma.user.update({ /* ... */ })
revalidatePath('/my')  // キャッシュ無効化
```

### 8. **エラーハンドリング戦略**

#### 構造化されたエラー処理
```typescript
// カスタムエラークラス
export class HttpError extends Error {
  constructor(public response: Response) {
    super(`HTTP Error: ${response.status}`)
  }
}

// 統一されたエラーレスポンス
type ActionResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string }
```

## 命名規則とコーディング規約

### ファイル・ディレクトリ命名
- **ケース**: kebab-case（例：`edit-profile-modal`）
- **構造**: 機能名/目的が明確
- **一貫性**: プロジェクト全体で統一

### 関数・変数命名
- **関数**: camelCase（例：`handleSubmit`）
- **コンポーネント**: PascalCase（例：`ProfileView`）
- **定数**: SCREAMING_SNAKE_CASE（例：`API_ORIGIN`）

### TypeScript規約
- **型定義**: `type` preferrence over `interface`
- **Props型**: `Props` という明確な命名
- **Generic**: 意味のある名前（`T` より `TData`）

## 禁止パターンと推奨パターン

### ❌ 避けるべきパターン

#### 1. 過度な汎用化
```typescript
// ❌ 悪い例
const hasValue = (value: any): boolean => {
  // 将来的に必要になるかもしれない複雑なロジック
}

// ✅ 良い例
{data.location && <Component />}
```

#### 2. Props地獄
```typescript
// ❌ 悪い例
interface ComponentProps {
  prop1: string
  prop2: string
  prop3: string
  // ... 20個のprops
}

// ✅ 良い例
interface ComponentProps {
  data: SchemaType
  config: ConfigType
}
```

#### 3. ページコンポーネントからの型インポート
```typescript
// ❌ 悪い例
import { ColorTheme } from "@/app/page"

// ✅ 良い例
import { ColorTheme } from "@/lib/constants"
```

### ✅ 推奨パターン

#### 1. スキーマファーストアプローチ
```typescript
// 1. スキーマ定義
const UserSchema = z.object({/* ... */})

// 2. 型推論
type User = z.infer<typeof UserSchema>

// 3. コンポーネント使用
const Component = ({ user }: { user: User }) => {/* ... */}
```

#### 2. 段階的な抽象化
```typescript
// 1. まず直接実装
const handleClick = () => { /* specific logic */ }

// 2. パターンが3回出現したら抽象化を検討
// 3. 実際の需要に基づいて共通化
```

#### 3. 明確な境界線
```typescript
// UI Layer
const Component = ({ data }: Props) => <div>{data.name}</div>

// Logic Layer  
const action = async (formData: FormData) => { /* business logic */ }

// Data Layer
const userData = await prisma.user.findFirst()
```

## 開発プロセス

### 1. 新機能開発フロー
1. **要件定義**: 機能要件の明確化
2. **スキーマ設計**: Zodスキーマの定義
3. **UI設計**: コンポーネント分割
4. **Action実装**: Server Actionsの実装
5. **統合**: コンポーネントとActionの接続
6. **テスト**: 型安全性とロジックの確認

### 2. リファクタリング方針
- **YAGNI原則**: 必要になってから実装
- **3回ルール**: 同じパターンが3回出現したら抽象化を検討
- **段階的改善**: 大規模な変更より小さな改善を積み重ね

### 3. コードレビューポイント
- 型安全性の確保
- 責任分離の遵守
- 命名規則の一貫性
- エラーハンドリングの適切性
- パフォーマンスへの影響

## まとめ

このプロジェクトの開発思想は以下の3つの軸で構成されています：

1. **シンプルさ**: KISS原則に基づいた直接的な実装
2. **型安全性**: TypeScript + Zodによる堅牢な型システム
3. **保守性**: 明確な責任分離と一貫した構造

これらの原則に従うことで、長期的に保守可能で拡張性の高いアプリケーションを構築することを目指しています。
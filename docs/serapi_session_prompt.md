# SERAPI開発指針 - セッション開始プロンプト

以下の開発思想に基づいてコードを書いてください：

## 🎯 核となる原則
1. **KISS原則**: シンプルで直接的な実装を優先
2. **YAGNI原則**: 必要になってから実装（過度な汎用化を避ける）
3. **3回ルール**: 同じパターンが3回出現したら抽象化を検討
4. **型安全性ファースト**: TypeScript + Zod でランタイム検証

## 📁 ファイル構造パターン
```
feature/
├── page.tsx                    # ページ（ルーティングのみ）
├── _components/                # 機能固有コンポーネント
│   └── component-name/
│       ├── index.ts           # export
│       ├── component.tsx      # UI（表示のみ）
│       ├── action.ts          # Server Actions（ビジネスロジック）
│       └── schema.ts          # Zod + 型定義
```

## 🛡️ 責任分離
- **UI Layer**: コンポーネント（表示のみ、状態管理なし）
- **Logic Layer**: Server Actions（バリデーション + ビジネスロジック）
- **Data Layer**: Prisma（データアクセス）
- **Type Layer**: Zod Schema（型 + バリデーション）

## 📋 必須パターン
### Schema定義
```typescript
const Schema = z.object({
  field: z.string().min(1, { message: 'エラーメッセージ' })
})
type DataType = z.infer<typeof Schema>
```

### Server Actions
```typescript
type Result = 
  | { success: true; message: string }
  | { success: false; error: string }

export const action = async (formData: FormData): Promise<Result> => {
  const parsed = Schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: parsed.error.message }
  }
  // ビジネスロジック
  return { success: true, message: '成功' }
}
```

### Props設計
```typescript
type Props = {
  data: SchemaType    # 具体的な型
  onAction: () => void  # 明確な関数
}
```

## 🚫 禁止パターン
- ❌ 過度な汎用化（hasValue等の将来的な再利用を見越した関数）
- ❌ Props地獄（20個以上のprops）
- ❌ ページコンポーネントからの型import
- ❌ コンポーネント内でのデータフェッチ
- ❌ 複数責任を持つコンポーネント

## 🎨 スタイリング
- CVA（Class Variance Authority）使用
- Tailwind CSS ユーティリティクラス
- kebab-case ファイル命名

---
**重要**: 実装前に「これは本当に必要か？」「3回使われるか？」を自問してください。
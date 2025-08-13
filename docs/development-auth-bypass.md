# 開発環境での認証バイパス設定

ローカル開発時に認証が必要なページにアクセスしやすくするための設定です。

## 設定方法

`.env.local`ファイルで以下の環境変数を`true`に設定するだけです：

```bash
USE_MOCK_DATA=true
```

## 自動的に適用される箇所

### 1. `withAuth` HOC
認証が必要なページコンポーネントで自動的にモックユーザーが提供されます。

```typescript
const ProtectedPage = withAuth(({ user }) => {
  // user = 開発用モックユーザー
  return <div>Welcome {user.name}</div>
})
```

### 2. `getUserOrRedirect`
ページやServer Actionsで直接認証チェックを行う場合も自動的にバイパスされます。

```typescript
export default async function Page() {
  const user = await getUserOrRedirect() // モックユーザーを返す
  // ...
}
```

### 3. Server Actions
Server Actions内でも同様に動作します：

```typescript
export const someAction = async (formData: FormData) => {
  const user = await getUserOrRedirect() // モックユーザーを返す
  // ...
}
```

## モックユーザー情報

開発環境で使用されるモックユーザーの情報：

```typescript
{
  id: 'mock-user-id',
  name: '開発用ユーザー',
  email: 'dev@example.com',
  image: 'https://via.placeholder.com/150',
  message: '開発用のユーザーです',
}
```

## 新しいServer Actionsでの使用方法

新しく作成するServer Actionsで認証が必要な場合は、以下のパターンを使用してください：

```typescript
import { getSessionWithDevBypass } from '@/lib/get-session-with-dev-bypass'

export const newAction = async (formData: FormData) => {
  // 認証チェック（開発環境では自動でバイパス）
  const session = await getSessionWithDevBypass()
  if (!session?.user) {
    return { success: false, error: '認証が必要です' }
  }

  // ビジネスロジック
  // ...
}
```

## 本番環境への影響

この設定は`USE_MOCK_DATA`環境変数が`true`の場合のみ有効です。本番環境では通常の認証フローが動作するため、セキュリティに影響はありません。

## 開発思想への準拠

- ✅ **KISS原則**: 環境変数による簡単な設定
- ✅ **型安全性**: 既存の型システムを維持
- ✅ **YAGNI原則**: 必要な機能のみ実装
- ✅ **責任分離**: 認証ロジックの中央管理

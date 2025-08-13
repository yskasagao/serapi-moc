# SERAPI 赤系カラーシステムガイド

## 📋 概要

SERAPI全体で統一された赤系カラーシステムの完全ガイドです。**インタラクション別分類**に基づいた明確なルールに従って、一貫性のあるブランド体験を提供します。

## 🎨 統一カラーシステム

### 基本カラーパレット

| カラー分類 | Tailwindクラス | カラーコード | 用途 |
|------------|---------------|-------------|------|
| **インタラクティブアイコン** | `text-brand-icon` | `#FE2C55` | クリック可能なアイコン |
| **インタラクティブアイコンホバー** | `text-brand-icon-hover` | `#E8254A` | ホバー状態 |
| **非インタラクティブアイコン** | `text-brand-icon-static` | `#FE2C55` | 装飾アイコン |
| **インタラクティブUIパーツ** | `bg-brand-ui` | `#ff7e8a` | ボタン、フォーム等 |
| **インタラクティブUIパーツホバー** | `bg-brand-ui-hover` | `#ff6b7a` | ホバー状態 |
| **非インタラクティブUIパーツ** | `bg-brand-ui-static` | `#ff7e8a` | 装飾要素 |

### Tailwind Config設定

```javascript
// tailwind.config.js
colors: {
  brand: {
    // アイコン系統
    'icon': '#FE2C55',           // インタラクティブアイコン
    'icon-hover': '#E8254A',     // インタラクティブアイコンホバー
    'icon-static': '#FE2C55',    // 非インタラクティブアイコン（装飾等）
    
    // UIパーツ系統
    'ui': '#ff7e8a',             // インタラクティブUIパーツ
    'ui-hover': '#ff6b7a',       // インタラクティブUIパーツホバー
    'ui-static': '#ff7e8a',      // 非インタラクティブUIパーツ（装飾等）
  }
}
```

## 🎯 分類ルール

### アイコン系統 vs UIパーツ系統

| 要素タイプ | 使用するカラー系統 | 判断基準 |
|-----------|------------------|----------|
| **⭐ アイコン** | `brand-icon` 系統 | SVG、Lucide-reactアイコン、絵文字等 |
| **🔲 UIパーツ** | `brand-ui` 系統 | ボタン、フォーム、テキスト、ボーダー等 |

### インタラクティブ vs 非インタラクティブ

| インタラクション | 使用クラス | ホバー状態 |
|-----------------|-----------|-----------|
| **クリック可能** | `text-brand-icon` | `hover:text-brand-icon-hover` |
| **装飾のみ** | `text-brand-icon-static` | ホバーなし |
| **フォーム要素** | `bg-brand-ui` | `hover:bg-brand-ui-hover` |
| **装飾要素** | `bg-brand-ui-static` | ホバーなし |

## 🔧 実装パターン

### 1. インタラクティブアイコン

```tsx
// ✅ 正しい実装
<button className="group text-brand-icon hover:text-brand-icon-hover">
  <Star className="h-6 w-6 transition-colors" />
  <span>+{totalStar}</span>
</button>

// ❌ 間違った実装
<button style={{ color: '#FE2C55' }}>
  <Star className="h-6 w-6" />
</button>
```

### 2. インタラクティブUIパーツ

```tsx
// ✅ 正しい実装
<Button className="bg-brand-ui text-white hover:bg-brand-ui-hover">
  投稿する
</Button>

// ✅ フォーム要素
<Input 
  className="focus:border-brand-ui focus:ring-brand-ui"
  placeholder="メッセージを入力"
/>
```

### 3. 非インタラクティブ装飾

```tsx
// ✅ 装飾アイコン
<Heart className="h-4 w-4 text-brand-icon-static" />

// ✅ 装飾ボーダー
<div className="border-l-4 border-brand-ui-static">
  著者情報
</div>

// ✅ 装飾テキスト
<h2 className="text-brand-ui-static">ユーザー名</h2>
```

## 📋 コンポーネント別実装例

### ボタン系

```tsx
// プライマリボタン
<Button className="bg-brand-ui hover:bg-brand-ui-hover">
  アクション
</Button>

// アウトラインボタン
<Button className="border-brand-ui text-brand-ui hover:bg-brand-ui hover:text-white">
  セカンダリ
</Button>

// アイコンボタン
<button className="text-brand-icon hover:text-brand-icon-hover">
  <Plus className="h-5 w-5" />
</button>
```

### フォーム系

```tsx
// 入力フィールド
<Input className="focus:border-brand-ui focus:ring-brand-ui" />

// 必須マーク
<Label>
  フィールド名 <span className="text-brand-ui-static">*</span>
</Label>

// セレクトボックス（React Select）
const customStyles = {
  control: (provided) => ({
    ...provided,
    '&:hover': {
      borderColor: '#ff7e8a', // brand-ui
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#ff7e8a' : 'white', // brand-ui
    '&:hover': {
      backgroundColor: '#ff9eb8', // brand-light (後方互換)
    },
  }),
}
```

### カード・コンテンツ系

```tsx
// ボーダーアクセント
<Card className="border-l-4 border-l-brand-ui-static">
  <CardContent>コンテンツ</CardContent>
</Card>

// ハートアイコン（いいね表示）
<div className="flex items-center space-x-1">
  <Heart className="h-4 w-4 text-brand-icon-static" />
  <span>{likeCount}</span>
</div>

// タイトルホバー
<h3 className="hover:text-brand-ui transition-colors">
  {title}
</h3>
```

## 🚫 禁止パターン

### ❌ ハードコード

```tsx
// ❌ 絶対に禁止
<div style={{ color: '#FE2C55' }}>テキスト</div>
<div className="text-[#ff7e8a]">テキスト</div>

// ✅ 正しい方法
<div className="text-brand-ui-static">テキスト</div>
```

### ❌ 不適切な分類

```tsx
// ❌ アイコンにUIパーツの色を使用
<Star className="text-brand-ui" />

// ❌ UIパーツにアイコンの色を使用  
<Button className="bg-brand-icon">ボタン</Button>

// ✅ 正しい分類
<Star className="text-brand-icon" />
<Button className="bg-brand-ui">ボタン</Button>
```

### ❌ ホバー状態の不整合

```tsx
// ❌ インタラクティブ要素にホバーなし
<button className="text-brand-icon">クリック可能</button>

// ❌ 非インタラクティブ要素にホバーあり
<span className="text-brand-icon-static hover:text-brand-icon-hover">
  装飾テキスト
</span>

// ✅ 正しいホバー設定
<button className="text-brand-icon hover:text-brand-icon-hover">
  クリック可能
</button>
<span className="text-brand-icon-static">装飾テキスト</span>
```

## 📋 実装チェックリスト

### 新規コンポーネント作成時

- [ ] **分類確認**: アイコン系統 or UIパーツ系統？
- [ ] **インタラクション確認**: クリック可能 or 装飾のみ？
- [ ] **適切なクラス使用**: `brand-icon` or `brand-ui`？
- [ ] **ホバー状態**: インタラクティブ要素にホバーが設定されているか？
- [ ] **ハードコード排除**: `text-[#xxx]`や`style={{color}}`を使用していないか？

### コードレビュー時

- [ ] **一貫性**: 同じ機能で異なるカラーを使用していないか？
- [ ] **アクセシビリティ**: 十分なコントラストが確保されているか？
- [ ] **レスポンシブ**: モバイルでも適切に表示されるか？
- [ ] **パフォーマンス**: 不要なtransitionクラスが追加されていないか？

## 🔄 実装フロー

### 1. 要素の特定
```
この要素は何？
├── アイコン → アイコン系統
└── UIパーツ → UIパーツ系統
```

### 2. インタラクションの確認
```
ユーザーはこの要素をクリックする？
├── Yes → インタラクティブ（ホバーあり）
└── No → 非インタラクティブ（ホバーなし）
```

### 3. 適切なクラス選択
```
アイコン系統 + インタラクティブ → text-brand-icon hover:text-brand-icon-hover
アイコン系統 + 非インタラクティブ → text-brand-icon-static
UIパーツ系統 + インタラクティブ → bg-brand-ui hover:bg-brand-ui-hover
UIパーツ系統 + 非インタラクティブ → bg-brand-ui-static
```

## 🎯 特殊ケース

### モーダル・ダイアログ

```tsx
// ヘッダーアイコン（装飾）
<DialogTitle className="flex items-center">
  <MessageSquare className="mr-2 h-5 w-5 text-brand-icon-static" />
  タイトル
</DialogTitle>

// 閉じるボタン（インタラクティブ）
<button className="text-brand-icon hover:text-brand-icon-hover">
  <X className="h-4 w-4" />
</button>
```

### リスト・カード

```tsx
// スターカウント（インタラクティブ）
<button className="text-brand-icon hover:text-brand-icon-hover">
  <Star className="h-5 w-5" />
  <span>+{count}</span>
</button>

// いいね表示（非インタラクティブ）
<div className="flex items-center">
  <Heart className="h-4 w-4 text-brand-icon-static" />
  <span>{likeCount}</span>
</div>
```

### フォーム

```tsx
// フォーカス状態
<Input className="focus:border-brand-ui focus:ring-brand-ui" />

// エラー状態（destructiveを使用）
<Input className="border-destructive focus:border-destructive" />

// 必須マーク
<Label>
  フィールド名 <span className="text-brand-ui-static">*</span>
</Label>
```

## 🔍 トラブルシューティング

### Q: 新しいコンポーネントでどの色を使うべきかわからない

A: **実装フロー**に従って判断してください：
1. アイコン or UIパーツ？
2. インタラクティブ or 非インタラクティブ？
3. 該当するクラスを適用

### Q: 既存コンポーネントでカラーがバラバラになっている

A: このガイドに従って統一してください：
1. 現在のハードコードを特定
2. 要素を分類
3. 適切なTailwindクラスに置換

### Q: ホバー状態が思った通りに動作しない

A: 以下を確認してください：
1. `transition-colors`クラスが追加されているか
2. 親要素に`group`クラスが必要か
3. インタラクティブ要素に正しいホバークラスが設定されているか

## 📚 関連ドキュメント

- [SERAPI開発指針 - セッション開始プロンプト](./serapi_session_prompt.md)
- [SERAPI プロジェクト 開発思想ドキュメント](./serapi_development_philosophy.md)
- [Tailwind CSS 公式ドキュメント](https://tailwindcss.com/)
- [Class Variance Authority (CVA)](https://cva.style/)

## 🚀 更新履歴

| 日付 | 変更内容 |
|------|----------|
| 2025-08-14 | 初版作成：赤系カラーシステム統一完了 |

---

**重要**: このカラーシステムは、SERAPIブランドの一貫性を保つための重要な要素です。新規開発時は必ずこのガイドに従って実装してください。
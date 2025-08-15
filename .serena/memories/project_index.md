# SERAPI-STAR プロジェクトインデックス

## 📁 プロジェクト構造概要

### ルートディレクトリ
```
serapi-star-main/apps/web/
├── app/                    # Next.js App Router
├── components/             # 再利用可能コンポーネント
├── lib/                    # ユーティリティ・設定
├── types/                  # TypeScript型定義
├── docs/                   # プロジェクトドキュメント
├── public/                 # 静的ファイル
├── styles/                 # スタイルファイル
├── providers/              # React Context Provider
├── i18n/                   # 国際化設定
├── messages/               # 言語ファイル
└── job/                    # バックグラウンドジョブ
```

## 🎯 主要機能別ディレクトリ構造

### 1. App Router (`app/`)
Next.js 15 App Routerによるページ・レイアウト管理

#### API Routes (`app/api/`)
- `auth/[...nextauth]/` - NextAuth.js認証
- `experience-diary/search/` - 体験日記検索API
- `serapist/` - セラピスト関連API
- `store-sns-account/` - SNSアカウント管理API

#### ページグループ (`app/[locale]/`)
##### Web向けページ (`(web)/`)
- **トップページ**: `page.tsx`
- **セラピスト関連**:
  - `areas/` - 地域別セラピスト一覧
  - `therapists/[slug]/` - セラピスト詳細・コメント投稿
- **体験日記**:
  - `experience-diary/` - 一覧・検索
  - `experience-diary/create/` - 新規作成
  - `experience-diary/[id]/` - 詳細表示
- **認証**: `login/` - ログインページ

##### 保護されたページ (`(protected)/`)
- `my/` - マイページ機能
  - プロフィール管理
  - ブックマーク表示
  - コメント履歴
  - 広告表示

##### セラピスト向けページ (`(serapist)/`)
- `therapist-application/` - セラピスト申請フォーム

##### 店舗向けページ (`(shop)/`)
- `store-application/` - 店舗申請フォーム
- `shop/counseling-card/` - カウンセリングカード作成

#### モーダル (`@modal/`)
- `(.）auth/` - 認証モーダル
- `(.)privacy/` - プライバシーポリシーモーダル
- `(.)terms/` - 利用規約モーダル

### 2. 共有コンポーネント (`components/`)
#### UI基盤コンポーネント
- `ui/` - 基本UIコンポーネント（Button, Card, Dialog等）
- `header/` - ヘッダーコンポーネント
- `base-modal/` - モーダル基盤

#### 機能別コンポーネント
- `serapist-card/` - セラピストカード
- `company-card/` - 会社カード
- `store-sns-account-card/` - SNSアカウントカード
- `age-gate/` - 年齢確認ゲート
- `main-visual/` - メインビジュアル
- `privacy-policy/` - プライバシーポリシー
- `terms/` - 利用規約

### 3. アプリケーション共通コンポーネント (`app/_components/`)
- `banner/` - バナー表示
- `breadcrumb/` - パンくずナビ
- `checkbox/` - チェックボックス
- `comment-button/` - コメントボタン
- `section-title/` - セクションタイトル
- `toaster/` - トースト通知

### 4. ライブラリ・ユーティリティ (`lib/`)
#### データベース・認証
- `prisma.ts` - Prismaクライアント（media-db）
- `company-prisma.ts` - Prismaクライアント（company-db）
- `auth.ts` - NextAuth.js設定

#### 定数・設定
- `constants.ts` - アプリケーション定数
- `utils.ts` - 共通ユーティリティ関数
- `dayjs.ts` - 日付処理設定
- `meta.ts` - メタデータ管理

#### モックデータ
- `mock-data/` - 開発用モックデータ
  - `serapist.ts` - セラピストデータ
  - `company.ts` - 会社データ
  - `diary.ts` - 体験日記データ
  - `store-sns-account.ts` - SNSアカウントデータ

#### サーバーサイド専用
- `server-only/` - サーバーサイド処理
  - `company/` - 会社関連処理
  - `serapist/` - セラピスト関連処理
  - `line/` - LINE連携処理

#### カスタムフック
- `use-infinite-scroll.ts` - 無限スクロール
- `use-media-query.tsx` - メディアクエリ
- `with-auth.tsx` - 認証HOC

### 5. 型定義 (`types/`)
- `api.d.ts` - API型定義
- `environment.d.ts` - 環境変数型定義
- `next-auth.d.ts` - NextAuth.js拡張型
- `prisma.d.ts` - Prisma拡張型

### 6. 国際化 (`i18n/`, `messages/`)
- `i18n/routing.ts` - ルーティング設定
- `i18n/request.ts` - リクエスト設定
- `messages/ja.json` - 日本語メッセージ
- `messages/ch.json` - 中国語メッセージ

### 7. バックグラウンドジョブ (`job/`)
- `check-tiktok-live.ts` - TikTokライブチェック
- `kaikan-crawl.ts` - 快感データクローリング
- `twitter-crawl.ts` - Twitterクローリング

## 🔧 設定ファイル

### フレームワーク設定
- `next.config.mjs` - Next.js設定
- `tailwind.config.js` - Tailwind CSS設定
- `tsconfig.json` - TypeScript設定
- `eslint.config.mjs` - ESLint設定

### 開発環境
- `docker-compose.dev.yml` - 開発用データベース
- `package.json` - 依存関係・スクリプト
- `components.json` - shadcn/ui設定

### その他
- `middleware.ts` - Next.js Middleware
- `svg.d.ts` - SVG型定義
- `postcss.config.js` - PostCSS設定

## 📝 重要なファイルパス

### 主要設定ファイル
- **Prisma設定**: `lib/prisma.ts`, `lib/company-prisma.ts`
- **認証設定**: `lib/auth.ts`
- **定数定義**: `lib/constants.ts`
- **国際化設定**: `i18n/routing.ts`

### メインページ
- **トップページ**: `app/[locale]/(web)/page.tsx`
- **セラピスト一覧**: `app/[locale]/(web)/areas/page.tsx`
- **体験日記一覧**: `app/[locale]/(web)/experience-diary/page.tsx`
- **マイページ**: `app/[locale]/(protected)/my/page.tsx`

### 重要コンポーネント
- **ヘッダー**: `components/header/header.tsx`
- **セラピストカード**: `components/serapist-card/serapist-card.tsx`
- **認証モーダル**: `app/[locale]/@modal/(.)auth/`

## 🎨 スタイル・UI

### カラーシステム
- **設定**: `tailwind.config.js` - ブランドカラー定義
- **ドキュメント**: `docs/serapi_color_system_guide.md`

### グローバルスタイル
- **CSS**: `app/[locale]/globals.css`
- **SCSS変数**: `styles/variables.scss`
- **ファッション背景**: `components/fashion-background/`

## 📚 ドキュメント (`docs/`)
- **README**: 開発ドキュメント総合目次
- **開発思想**: `serapi_development_philosophy.md`
- **開発指針**: `serapi_session_prompt.md`
- **環境構築**: `development-setup.md`
- **チーム運用**: `team-guide.md`
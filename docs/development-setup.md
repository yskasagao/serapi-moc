# Web App 開発環境セットアップ

webアプリケーション（apps/web）専用の開発環境構築ガイドです。

## 🚀 クイックスタート

### 🐳 Docker環境（推奨）- Jest Workerエラー完全解決済み

#### 1. 初回セットアップ（推奨: 段階的実行）
```bash
# webアプリディレクトリに移動
cd apps/web

# 1. Docker環境でビルド & 起動（自動でDB起動＋アプリ起動）
yarn docker:up --build
# または段階的に
yarn docker:build
yarn docker:up
```

#### 2. 日常的な開発（Docker）
```bash
# Docker環境起動（最速）
yarn docker:up

# Docker環境起動（リビルド付き）
yarn docker:dev
```

#### 3. Docker環境の操作
```bash
# ログ確認
yarn docker:logs

# コンテナにシェル接続
yarn docker:shell

# 環境停止
yarn docker:down

# 完全クリーンアップ
yarn docker:clean
```

**💡 Docker環境の利点:**
- ✅ Jest Worker エラーが完全解決（Node.js 22.6.0 + Alpine Linux）
- ✅ 環境の統一性（Windows/Mac/Linux 問わず同じ環境）
- ✅ 依存関係の分離
- ✅ ワンコマンドで起動

### 📦 従来のローカル環境
```bash
# webアプリディレクトリに移動
cd apps/web

# 1. 依存関係インストール
yarn install

# 2. データベース起動
yarn db:start

# 3. Prismaクライアント生成（データベース起動後）
yarn db:generate

# 4. マイグレーション実行
yarn db:migrate

# 5. 開発サーバー起動
yarn dev
```

アプリケーションは http://localhost:3000 で起動します。

## 🌱 仮データ投入

デザイン確認用の仮データを投入できます：

### Docker環境の場合
```bash
# Docker環境内でのデータベース操作（Prismaクライアントが利用可能になった場合）
yarn docker:shell
# コンテナ内で：
yarn db:seed
yarn db:reset-with-seed
```

### ローカル環境の場合
```bash
# 仮データのみ投入
yarn db:seed

# データベースをリセットして仮データ投入（推奨）
yarn db:reset-with-seed
```

### 投入されるデータ
- **店舗**: 5店舗（東京、大阪、名古屋、横浜、福岡）
- **セラピスト**: 10名（プロフィール画像、評価パラメータ付き）
- **ユーザー**: 5名
- **コメント**: 30件
- **体験日記**: 10件
- **ブックマーク**: 最大15件

## 📋 利用可能なコマンド

### 🐳 Docker環境（推奨）
```bash
# Docker環境管理
yarn docker:build          # Dockerイメージをビルド
yarn docker:up              # コンテナ起動（バックグラウンド）
yarn docker:up:detached     # コンテナ起動（デタッチモード）
yarn docker:down            # コンテナ停止・削除
yarn docker:restart         # コンテナ再起動
yarn docker:dev             # ビルド＆起動（開発用）
yarn docker:logs            # コンテナログを表示
yarn docker:shell           # コンテナにシェル接続
yarn docker:clean           # 完全クリーンアップ（ボリューム削除）

# 開発用（Docker環境内で実行）
yarn dev                    # 開発サーバー起動（port 3000）
yarn build                  # プロダクションビルド  
yarn lint                   # ESLint実行
yarn lint:fix               # ESLint自動修正
```

### 📦 ローカル環境（従来）
```bash
# 開発用
yarn dev                    # 開発サーバー起動（port 3000）
yarn build                  # プロダクションビルド
yarn lint                   # ESLint実行
yarn lint:fix               # ESLint自動修正

# データベース管理
yarn db:start               # PostgreSQLデータベース起動
yarn db:stop                # データベース停止
yarn db:reset               # データベースリセット（全データ削除）
yarn db:generate            # Prismaクライアント生成
yarn db:migrate             # マイグレーション実行
yarn db:studio              # Prisma Studio起動（データベースGUI）
yarn db:seed                # 仮データ投入
yarn db:reset-with-seed     # リセット＋マイグレーション＋仮データ投入

# システム
yarn setup:manual           # セットアップ手順表示
```

## 🗄️ データベース構成

webアプリは2つのデータベースを使用：
- **media-db**: メインコンテンツ（Serapistar、Comment、Bookmarkなど）
- **company-db**: 会社・予約データ（Company、ReservationDataなど）

## 🔧 トラブルシューティング

### Docker環境のトラブル

#### コンテナが起動しない
```bash
# Docker環境の状態確認
docker ps -a

# ログ確認
yarn docker:logs

# 完全リセット
yarn docker:clean
yarn docker:dev
```

#### Jest Worker エラー (解決済み)
```bash
# Docker環境では完全に解決済みです
# もしローカル環境で発生した場合は、Docker環境に切り替えてください
yarn docker:dev
```

### ローカル環境のトラブル

#### データベース接続エラー
```bash
# データベースの状態確認
docker ps

# データベースリセット
yarn db:reset

# 再セットアップ
yarn setup:manual
```

#### Prismaクライアントエラー
```bash
# クライアント再生成
yarn db:generate
```

#### ポート占有エラー
```bash
# Windows の場合
yarn port:check
yarn port:kill

# Mac/Linux の場合
lsof -i :3000
kill -9 <PID>
```

## 📁 開発ファイル構成

```
apps/web/
├── app/                    # Next.js App Router
├── components/             # 共通コンポーネント
├── lib/
│   ├── prisma.ts          # media-db Prismaクライアント（モック対応済み）
│   └── company-prisma.ts  # company-db Prismaクライアント（モック対応済み）
├── .env.local             # 環境変数
├── .env.development       # Docker環境用設定
├── Dockerfile             # Docker環境設定（Node.js 22.6.0）
├── docker-compose.dev.yml # 開発用Docker環境
├── .dockerignore          # Docker除外ファイル
├── package.json           # Yarn + Docker スクリプト
└── yarn.lock              # Yarn依存関係ロック
```

## 🎯 開発のベストプラクティス

### Docker環境（推奨）
1. **簡単起動**: `yarn docker:dev` でワンコマンド起動
2. **環境統一**: Node.js 22.6.0 + Alpine Linux で Jest Worker エラー完全解決
3. **分離環境**: ホスト環境に依存しない
4. **自動設定**: データベース含めて自動起動

### ローカル環境（従来）
1. **起動順序**: データベース → Prismaクライアント → 開発サーバー
2. **環境変数**: `.env.local`で管理、実データベースに接続
3. **データベース**: Docker Composeで管理、ローカル専用
4. **パッケージ管理**: Yarn使用（npm から移行済み）

---

**💡 推奨**: Jest Workerエラーが完全に解決されたDocker環境（`yarn docker:dev`）での開発をお勧めします！

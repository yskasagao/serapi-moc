# Web App 開発環境セットアップ

webアプリケーション（apps/web）専用の開発環境構築ガイドです。

## 🚀 クイックスタート

### 1. 初回セットアップ（推奨: 段階的実行）
```bash
# webアプリディレクトリに移動
cd apps/web

# 1. データベース起動
npm run db:start

# 2. Prismaクライアント生成（データベース起動後）
npm run db:generate

# 3. マイグレーション実行
npm run db:migrate

# 4. 開発サーバー起動
npm run dev
```

### 2. 日常的な開発
```bash
# データベース起動
npm run db:start

# 開発サーバー起動
npm run dev
```

アプリケーションは http://localhost:3000 で起動します。

## 🌱 仮データ投入

デザイン確認用の仮データを投入できます：

```bash
# 仮データのみ投入
npm run db:seed

# データベースをリセットして仮データ投入（推奨）
npm run db:reset-with-seed
```

### 投入されるデータ
- **店舗**: 5店舗（東京、大阪、名古屋、横浜、福岡）
- **セラピスト**: 10名（プロフィール画像、評価パラメータ付き）
- **ユーザー**: 5名
- **コメント**: 30件
- **体験日記**: 10件
- **ブックマーク**: 最大15件

### 開発用
- `npm run dev` - 開発サーバー起動（port 3000）
- `npm run build` - プロダクションビルド
- `npm run lint` - ESLint実行
- `npm run lint:fix` - ESLint自動修正

### データベース管理
- `npm run db:start` - PostgreSQLデータベース起動
- `npm run db:stop` - データベース停止
- `npm run db:reset` - データベースリセット（全データ削除）
- `npm run db:generate` - Prismaクライアント生成
- `npm run db:migrate` - マイグレーション実行
- `npm run db:studio` - Prisma Studio起動（データベースGUI）
- `npm run db:seed` - 仮データ投入
- `npm run db:reset-with-seed` - リセット＋マイグレーション＋仮データ投入

### システム
- `npm run setup:manual` - セットアップ手順表示

## 🗄️ データベース構成

webアプリは2つのデータベースを使用：
- **media-db**: メインコンテンツ（Serapistar、Comment、Bookmarkなど）
- **company-db**: 会社・予約データ（Company、ReservationDataなど）

## 🔧 トラブルシューティング

### データベース接続エラー
```bash
# データベースの状態確認
docker ps

# データベースリセット
npm run db:reset

# 再セットアップ
npm run setup
```

### Prismaクライアントエラー
```bash
# クライアント再生成
npm run db:generate
```

### ポート占有エラー
```bash
# ポート3000を使用中のプロセス確認
lsof -i :3000

# 強制終了
kill -9 <PID>
```

## 📁 開発ファイル構成

```
apps/web/
├── app/                    # Next.js App Router
├── components/             # 共通コンポーネント
├── lib/
│   ├── prisma.ts          # media-db Prismaクライアント
│   └── company-prisma.ts  # company-db Prismaクライアント
├── .env.local             # 環境変数
├── docker-compose.dev.yml # 開発用データベース
└── package.json           # 開発用スクリプト
```

## 🎯 開発のベストプラクティス

1. **起動順序**: データベース → Prismaクライアント → 開発サーバー
2. **環境変数**: `.env.local`で管理、実データベースに接続
3. **データベース**: Docker Composeで管理、ローカル専用
4. **コード変更**: webフォルダ内のみで開発

---

**💡 ヒント**: 初回は段階的セットアップ、日常は`npm run db:start && npm run dev`でスムーズに開発できます！

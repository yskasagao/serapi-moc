# ローカル開発環境立ち上げ手順

**🐳 Docker環境が推奨されています（Jest Worker エラー完全解決済み）**

## 🚀 毎回の環境立ち上げ手順

### 🐳 Docker環境（推奨）

#### 1. プロジェクトディレクトリに移動
```bash
cd serapi-star-main/serapi-star-main/apps/web
```

#### 2. Docker環境起動（ワンコマンド）
```bash
# 初回または大きな変更後
yarn docker:dev

# 日常的な開発
yarn docker:up
```

#### 3. ブラウザでアクセス
- メインページ: http://localhost:3000/ja
- セラピスト一覧: http://localhost:3000/ja/areas  
- 体験日記: http://localhost:3000/ja/experience-diary

**💡 Docker環境の利点:**
- ✅ Jest Worker エラー完全解決
- ✅ Node.js 22.6.0 + Alpine Linux環境
- ✅ データベース自動起動
- ✅ 環境統一（OS問わず同じ環境）

### 📦 従来のローカル環境

#### 1. プロジェクトディレクトリに移動
```bash
cd serapi-star-main/serapi-star-main/apps/web
```

#### 2. データベース起動
```bash
yarn db:start
```

#### 3. データベース設定（初回または設定変更時のみ）
```bash
# Prismaクライアント生成
yarn db:generate

# マイグレーション実行
yarn db:migrate
```

#### 4. 開発サーバー起動
```bash
yarn dev
```

---

## ワンライナーコマンド

### Docker環境（推奨）
```bash
cd serapi-star-main/serapi-star-main/apps/web && yarn docker:dev
```

### ローカル環境
```bash
cd serapi-star-main/serapi-star-main/apps/web && yarn db:start && yarn dev
```

---

## 環境停止時

### Docker環境
```bash
# 開発停止（コンテナは稼働継続）
Ctrl+C

# 完全停止
yarn docker:down
```

### ローカル環境
```bash
# 開発サーバー停止: Ctrl+C

# データベース停止  
yarn db:stop
```

---

## トラブル時のリセットコマンド

### Docker環境
```bash
# コンテナ完全リセット
yarn docker:clean

# 再構築 & 起動
yarn docker:dev
```

### ローカル環境
```bash
# データベース完全リセット
yarn db:reset

# データベース再構築（リセット + セットアップ）
yarn db:reset-with-seed
```

---

## 現在の設定

### Docker環境（推奨）
- **Node.js**: 22.6.0（Alpine Linux）
- **パッケージマネージャー**: Yarn
- **データベース**: PostgreSQL（Docker内）
- **ポート**: 3000
- **Jest Worker エラー**: ✅ 完全解決済み

### ローカル環境
- **モックデータ**: 有効（`.env.local`の`USE_MOCK_DATA=true`）
- **データベース**: Docker Compose使用
- **パッケージマネージャー**: Yarn（npm から移行）
- **ポート**: 3000

## 注意事項

### Docker環境
- 初回は`yarn docker:dev`でイメージビルドが必要
- コンテナ内でPrismaクライアントが自動生成されない場合はモックモードで動作
- Jest Workerエラーが発生しないため、安定した開発環境

### ローカル環境
- 初回起動時は`yarn install`が必要
- モックデータ使用時はデータベース接続エラーが出ても正常動作
- データベースが必要な機能を使う場合は`USE_MOCK_DATA=false`に変更
- Windows環境ではJest Workerエラーが発生する可能性あり

---

**💡 推奨**: Jest Workerエラーを避けるため、Docker環境での開発を強く推奨します！

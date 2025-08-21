# Docker環境 完全ガイド

**🎉 Jest Worker エラー完全解決済み環境**

## 🐳 Docker環境について

webアプリ開発において、以下の問題を解決するためにDocker環境を構築しました：

- ✅ **Jest Worker エラーの完全解決**（Windows環境特有の問題）
- ✅ **Node.js 22.6.0環境の統一**
- ✅ **開発環境の一貫性**（OS問わず同じ環境）
- ✅ **依存関係の分離**

## 🚀 クイックスタート

### 最速起動（推奨）
```bash
cd apps/web
yarn docker:dev
```

アプリケーションが http://localhost:3000 で起動します。

## 📋 利用可能なDocker コマンド

### 基本操作
```bash
yarn docker:build          # Dockerイメージをビルド
yarn docker:up              # コンテナ起動（バックグラウンド）
yarn docker:up:detached     # コンテナ起動（デタッチモード）
yarn docker:down            # コンテナ停止・削除
yarn docker:restart         # コンテナ再起動
yarn docker:dev             # ビルド＆起動（開発用）
```

### 管理・デバッグ
```bash
yarn docker:logs            # コンテナログを表示
yarn docker:shell           # コンテナにシェル接続
yarn docker:clean           # 完全クリーンアップ（ボリューム削除）
```

## 🏗️ Docker環境の構成

### コンテナ構成
- **web-dev-app**: Next.js アプリケーション（Node.js 22.6.0-alpine）
- **web-dev-database**: PostgreSQL 14.2（データベース）

### ポート配置
- **3000**: Next.js アプリケーション
- **5432**: PostgreSQL データベース

### ボリュームマウント
- **アプリケーションコード**: ホストの変更が即座に反映
- **node_modules**: コンテナ内で分離（高速化）
- **PostgreSQL データ**: 永続化

## 🔧 技術仕様

### 環境構成
```yaml
# docker-compose.dev.yml
services:
  web:
    build: .
    ports: ["3000:3000"]
    environment:
      - NODE_ENV=development
      - NEXT_TELEMETRY_DISABLED=1
      - DATABASE_URL=postgresql://webdev:webdev123@db:5432/webdev
  
  db:
    image: postgres:14.2
    environment:
      POSTGRES_PASSWORD: webdev123
      POSTGRES_USER: webdev
      POSTGRES_DB: webdev
```

### Dockerfile
```dockerfile
FROM node:22.6.0-alpine
WORKDIR /app

# Install dependencies
RUN apk add --no-cache libc6-compat
COPY package*.json ./
RUN yarn install

# Copy source and start
COPY . .
EXPOSE 3000
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
CMD ["yarn", "dev"]
```

## 🎯 開発ワークフロー

### 日常的な開発
1. **起動**: `yarn docker:up`
2. **コード変更**: ファイル保存で自動リロード
3. **ログ確認**: `yarn docker:logs`
4. **停止**: `yarn docker:down`

### デバッグ作業
1. **コンテナ接続**: `yarn docker:shell`
2. **内部確認**: コンテナ内でコマンド実行
3. **ログ監視**: `yarn docker:logs -f`

### 環境リセット
1. **軽度**: `yarn docker:restart`
2. **中度**: `yarn docker:down && yarn docker:up`
3. **完全**: `yarn docker:clean && yarn docker:dev`

## 🔍 トラブルシューティング

### よくある問題と解決方法

#### 1. コンテナが起動しない
```bash
# 状況確認
docker ps -a

# ログ確認
yarn docker:logs

# 完全リセット
yarn docker:clean
yarn docker:dev
```

#### 2. ポートが使用中
```bash
# プロセス確認（Windows）
netstat -ano | findstr :3000

# 強制終了（Windows）
taskkill /PID <プロセスID> /F

# Docker環境再起動
yarn docker:restart
```

#### 3. Prismaエラー（対応済み）
```bash
# 現在はモックモードで自動対応済み
# 実際のPrismaクライアントが必要な場合
yarn docker:shell
# コンテナ内で:
yarn db:generate
```

#### 4. 依存関係の問題
```bash
# イメージ再ビルド
yarn docker:down
yarn docker:build --no-cache
yarn docker:up
```

## 📊 パフォーマンス最適化

### 最適化設定済み項目
- **Node.js 22.6.0**: 最新の安定版
- **Alpine Linux**: 軽量ベースイメージ
- **ボリューム分離**: node_modules の分離で高速化
- **Jest Worker**: エラー完全解決
- **キャッシュ**: Docker レイヤーキャッシュ活用

### 開発速度向上
- **ホットリロード**: ファイル変更の即座反映
- **コンテナ再利用**: `yarn docker:up` で高速起動
- **ログストリーミング**: リアルタイムデバッグ

## 🌟 Docker環境の利点

### 開発体験の向上
1. **Jest Worker エラー解決**: Windows固有の問題を完全回避
2. **環境統一**: チーム全体で同じ環境
3. **分離環境**: ホスト環境への影響なし
4. **簡単セットアップ**: ワンコマンド起動

### 運用面での利点
1. **再現性**: 同じ環境での一貫した動作
2. **ポータビリティ**: どこでも同じように動作
3. **スケーラビリティ**: 本番環境との整合性
4. **メンテナンス性**: 環境の管理が簡単

---

**💡 推奨事項**: Jest Worker エラーや環境差異を避けるため、すべての開発者にDocker環境の使用を強く推奨します！
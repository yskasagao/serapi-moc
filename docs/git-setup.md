# Git管理セットアップ手順

## 📋 概要
web配下のディレクトリをgitリポジトリとして管理するための手順です。

## 🚀 Git初期化手順

### 1. webディレクトリに移動
```bash
cd serapi-star-main/serapi-star-main/apps/web
```

### 2. 環境変数ファイルの設定
```bash
# サンプルファイルをコピー
cp .env.local.example .env.local

# 必要に応じて .env.local を編集
# （既に設定済みの場合はスキップ可能）
```

### 3. Gitリポジトリ初期化
```bash
# Gitリポジトリとして初期化
git init

# 初回コミット用のファイルをステージング
git add .

# 初回コミット
git commit -m "Initial commit: Next.js web application setup"
```

### 4. リモートリポジトリ追加（任意）
```bash
# GitHubなどのリモートリポジトリがある場合
git remote add origin https://github.com/your-username/your-repo.git

# リモートにプッシュ
git branch -M main
git push -u origin main
```

## 📁 追加された/更新されたファイル

### ✅ 更新されたファイル
- **`.gitignore`** - Next.js + Prisma + Docker環境用に強化
  - 開発環境、ビルド出力、データベースファイルなどを除外
  - IDE設定、OS固有ファイル、ログファイルなどを追加

### ✅ 新規追加されたファイル  
- **`.env.local.example`** - 環境変数のサンプルファイル
  - 新しい開発者向けの設定例
  - 機密情報を含まない安全な共有用

## 🔧 日常的なGit操作

### 基本的なワークフロー
```bash
# 変更をステージング
git add .

# コミット
git commit -m "機能追加: ○○機能を実装"

# リモートにプッシュ（リモートリポジトリがある場合）
git push
```

### ブランチ運用（推奨）
```bash
# 新機能用ブランチ作成
git checkout -b feature/new-feature

# 作業後にメインブランチにマージ
git checkout main
git merge feature/new-feature

# 不要なブランチを削除
git branch -d feature/new-feature
```

## 🛡️ Gitignoreされる主要ファイル

### 開発環境関連
- `node_modules/` - npm/yarnパッケージ
- `.next/` - Next.jsビルド出力
- `.env.local` - 個人の環境変数設定

### データベース関連
- `postgres-data/` - PostgreSQLデータファイル
- `*.sqlite`, `*.db` - SQLiteファイル

### IDE・OS関連
- `.vscode/`, `.idea/` - エディタ設定
- `.DS_Store`, `Thumbs.db` - OS生成ファイル

### ログ・キャッシュ
- `*.log` - 各種ログファイル
- `.cache/` - キャッシュディレクトリ

## 🚨 注意事項

### セキュリティ
- **`.env.local`** は機密情報を含むため、絶対にコミットしない
- API キーやパスワードは `.env.local.example` に含めない

### チーム開発
- **`.env.local.example`** を更新した場合は、チームメンバーに通知
- 新しい環境変数を追加した際は、ドキュメントも更新

### データベース
- マイグレーションファイルはコミットする
- データベースの実データはコミットしない

## 🔄 既存プロジェクトからの移行

他の開発者が既存のgitリポジトリからクローンする場合：

```bash
# リポジトリをクローン
git clone https://github.com/your-username/your-repo.git
cd your-repo

# 環境変数を設定
cp .env.local.example .env.local
# .env.local を編集

# 依存関係をインストール
npm install

# 開発環境を起動
npm run db:start && npm run dev
```

## 📚 参考リンク

- [Git基本コマンド](https://git-scm.com/docs)
- [GitHub使い方ガイド](https://docs.github.com/ja)
- [.gitignoreベストプラクティス](https://www.gitignore.io/)

---

💡 **ヒント**: 定期的なコミットでバージョン管理を効果的に活用しましょう！

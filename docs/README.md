# 📋 開発ドキュメント総合目次

このフォルダには、webアプリケーション開発に関する全てのガイドが統一されています。

## 🎯 **用途別クイックナビ**

### 🚀 **今すぐ開発を始めたい**
→ **[ローカル環境立ち上げ手順](./local-environment.md)** （🐳 Docker環境推奨）

### 🛠️ **初回環境構築**
→ **[開発環境セットアップ](./development-setup.md)** 

### 🐳 **Docker環境について（Jest Worker エラー解決済み）**
→ **[Docker環境完全ガイド](./docker-environment.md)**

### 📖 **開発思想・ルールを知りたい**
→ **[開発思想](./serapi_development_philosophy.md)** → **[開発指針](./serapi_session_prompt.md)**

### 👥 **チーム運用方法**
→ **[チーム運用ガイド](./team-guide.md)**

---

## 📁 **全ドキュメント一覧**

### 🏃‍♂️ **日常開発系（よく使う）**

| ファイル | 用途 | 使用頻度 |
|---------|------|----------|
| **[ローカル環境立ち上げ手順](./local-environment.md)** | 毎回の開発時に使用。環境起動・停止コマンド（🐳 Docker推奨） | ⭐⭐⭐ |
| **[Docker環境完全ガイド](./docker-environment.md)** | Docker環境の詳細・Jest Worker エラー解決済み | ⭐⭐⭐ |
| **[赤系カラーシステムガイド](./serapi_color_system_guide.md)** | UI開発時の色選択・統一ルール。新規ページ開発必須 | ⭐⭐⭐ |
| **[モックデータ設定](./mock-data.md)** | デザイン確認・フロントエンド開発。データのカスタマイズ | ⭐⭐⭐ |
| **[開発チェックリスト](./serapi_development_checklist.md)** | 開発時の確認事項・品質チェック項目 | ⭐⭐ |

### 🛠️ **環境構築系（初回・トラブル時）**

| ファイル | 用途 | 使用頻度 |
|---------|------|----------|
| **[開発環境セットアップ](./development-setup.md)** | 初回環境構築の詳細手順・トラブルシューティング（Docker+Yarn対応） | ⭐ |
| **[Git管理セットアップ](./git-setup.md)** | リポジトリ初期化・チーム開発ワークフロー | ⭐ |

### 📖 **開発思想・ルール系（理解必須）**

| ファイル | 用途 | 重要度 |
|---------|------|--------|
| **[開発思想](./serapi_development_philosophy.md)** | プロジェクト全体のコーディング哲学 | 🔥 必読 |
| **[開発指針](./serapi_session_prompt.md)** | 実装時の具体的なルール・パターン | 🔥 必読 |
| **[赤系カラーシステムガイド](./serapi_color_system_guide.md)** | ブランド統一カラールール・UI開発規約 | 🔥 必読 |

### 👥 **プロジェクト管理系**

| ファイル | 用途 | 対象者 |
|---------|------|--------|
| **[チーム運用ガイド](./team-guide.md)** | プロジェクト全体の構成・役割分担 | 全員 |
| **[CLAUDE.md](./CLAUDE.md)** | AI開発支援用プロジェクト情報 | AI・新メンバー |

---

## ⚡ **超クイックリファレンス**

### 基本コマンド

#### 🐳 Docker環境（推奨）
```bash
# 環境立ち上げ（毎回・推奨）
cd serapi-star-main/serapi-star-main/apps/web && yarn docker:dev

# 日常的な起動
yarn docker:up

# 環境停止
yarn docker:down

# トラブル時リセット
yarn docker:clean && yarn docker:dev
```

#### 📦 ローカル環境（従来）
```bash
# 環境立ち上げ（従来）
cd serapi-star-main/serapi-star-main/apps/web && yarn db:start && yarn dev

# 環境停止
yarn db:stop

# トラブル時リセット
yarn db:reset
```

### アクセス先
- **メインページ**: http://localhost:3000/ja
- **セラピスト一覧**: http://localhost:3000/ja/areas  
- **体験日記**: http://localhost:3000/ja/experience-diary
- **セラピスト申請**: http://localhost:3000/ja/therapist-application
- **店舗申請**: http://localhost:3000/ja/store-application

---

## 🎯 **レベル別学習パス**

### 🔰 **初心者**
1. **[開発思想](./serapi_development_philosophy.md)** - まず思想を理解
2. **[開発環境セットアップ](./development-setup.md)** - 環境構築（Docker+Yarn）
3. **[Docker環境完全ガイド](./docker-environment.md)** - Docker環境の詳細（推奨）
4. **[ローカル環境立ち上げ手順](./local-environment.md)** - 日常操作

### 🚀 **実装者**  
1. **[開発指針](./serapi_session_prompt.md)** - 具体的なルール
2. **[赤系カラーシステムガイド](./serapi_color_system_guide.md)** - UI開発カラールール
3. **[開発チェックリスト](./serapi_development_checklist.md)** - 品質担保
4. **[モックデータ設定](./mock-data.md)** - 開発効率化

### 👑 **リーダー・新メンバー指導**
1. **[チーム運用ガイド](./team-guide.md)** - 全体把握
2. **[CLAUDE.md](./CLAUDE.md)** - プロジェクト詳細情報

---

💡 **迷ったら**: README.md（このファイル）→ 目的のファイル の順で確認してください。

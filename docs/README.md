# 📋 開発ドキュメント一覧

このフォルダには、webアプリケーション開発に関するガイドが整理されています。

## 📁 ガイド一覧

### 🚀 [ローカル環境立ち上げ手順](./local-environment.md)
**毎回の開発時に使用**
- 基本的な環境立ち上げコマンド
- ワンライナーでの起動方法
- トラブル時のリセット手順

### 🛠️ [開発環境セットアップ](./development-setup.md)
**初回セットアップ・詳細設定時に使用**
- 初回環境構築の詳細手順
- データベースセットアップ
- 仮データ投入方法
- トラブルシューティング

### 🎭 [モックデータ設定](./mock-data.md)
**デザイン確認・フロントエンド開発時に使用**
- モックデータの仕組み
- データのカスタマイズ方法
- UIデザイン確認手順

### 📝 [Git管理セットアップ](./git-setup.md)
**バージョン管理・チーム開発時に使用**
- Gitリポジトリ初期化手順
- .gitignore設定
- チーム開発のワークフロー

## 🎯 使い分けガイド

### 日常的な開発作業
→ **[ローカル環境立ち上げ手順](./local-environment.md)** を参照

### 初回セットアップ・環境構築
→ **[開発環境セットアップ](./development-setup.md)** を参照

### デザイン確認・モックデータ作業
→ **[モックデータ設定](./mock-data.md)** を参照

### バージョン管理・チーム開発
→ **[Git管理セットアップ](./git-setup.md)** を参照

## ⚡ クイックリファレンス

### 基本コマンド
```bash
# 環境立ち上げ（毎回）
cd serapi-star-main/serapi-star-main/apps/web && npm run db:start && npm run dev

# 環境停止
npm run db:stop

# トラブル時リセット
npm run db:reset
```

### アクセス先
- メインページ: http://localhost:3000/ja
- セラピスト一覧: http://localhost:3000/ja/areas
- 体験日記: http://localhost:3000/ja/experience-diary

---

💡 **初めての方**: [開発環境セットアップ](./development-setup.md) → [ローカル環境立ち上げ手順](./local-environment.md) の順番で確認してください。

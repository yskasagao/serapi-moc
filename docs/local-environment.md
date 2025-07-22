# ローカル開発環境立ち上げ手順

## 毎回の環境立ち上げ手順（コマンド実行順）

### 1. プロジェクトディレクトリに移動
```bash
cd serapi-star-main/serapi-star-main/apps/web
```

### 2. データベース起動
```bash
npm run db:start
```

### 3. データベース設定（初回または設定変更時のみ）
```bash
# Prismaクライアント生成
npm run db:generate

# マイグレーション実行
npm run db:migrate
```

### 4. 開発サーバー起動
```bash
npm run dev
```

### 5. ブラウザでアクセス
- メインページ: http://localhost:3000/ja
- セラピスト一覧: http://localhost:3000/ja/areas
- 体験日記: http://localhost:3000/ja/experience-diary

---

## ワンライナーコマンド（まとめて実行）
```bash
cd serapi-star-main/serapi-star-main/apps/web && npm run db:start && npm run dev
```

---

## 環境停止時
```bash
# 開発サーバー停止: Ctrl+C

# データベース停止
npm run db:stop
```

---

## トラブル時のリセットコマンド
```bash
# データベース完全リセット
npm run db:reset

# データベース再構築（リセット + セットアップ）
npm run db:reset-with-seed
```

---

## 現在の設定
- **モックデータ**: 有効（`.env.local`の`USE_MOCK_DATA=true`）
- **データベース**: Docker Compose使用
- **ポート**: 3000

## 注意事項
- 初回起動時は`npm install`が必要
- モックデータ使用時はデータベース接続エラーが出ても正常動作
- データベースが必要な機能を使う場合は`USE_MOCK_DATA=false`に変更

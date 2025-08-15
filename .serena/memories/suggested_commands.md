# 開発用推奨コマンド

## 日常開発コマンド

### 環境起動・停止
```bash
# 開発環境起動（ワンライナー）
cd serapi-star-main/serapi-star-main/apps/web && npm run db:start && npm run dev

# 個別実行
cd apps/web
npm run db:start       # データベース起動
npm run dev           # 開発サーバー起動（port 3000）

# 環境停止
npm run db:stop       # データベース停止
# 開発サーバー停止: Ctrl+C
```

### 開発・ビルド
```bash
npm run build         # プロダクションビルド
npm run start         # プロダクションサーバー起動
npm run lint          # ESLint実行
npm run lint:fix      # ESLint自動修正
```

### データベース管理
```bash
npm run db:generate   # Prismaクライアント生成
npm run db:migrate    # マイグレーション実行
npm run db:studio     # Prisma Studio起動（データベースGUI）
npm run db:seed       # 仮データ投入
npm run db:reset      # データベースリセット（全データ削除）
npm run db:reset-with-seed  # リセット＋マイグレーション＋仮データ投入
```

### セットアップ・トラブルシューティング
```bash
npm run setup:manual  # セットアップ手順表示

# 初回セットアップ（段階的実行推奨）
npm run db:start
npm run db:generate
npm run db:migrate
npm run dev
```

## Windowsシステムコマンド
```bash
# ファイル操作
dir                   # ディレクトリ一覧表示（ls相当）
cd                    # ディレクトリ移動
type filename         # ファイル内容表示（cat相当）
findstr "pattern" file # ファイル内検索（grep相当）

# Git操作
git status
git add .
git commit -m "message"
git push
git pull

# プロセス管理
netstat -ano | findstr :3000  # ポート3000使用プロセス確認
taskkill /F /PID <PID>        # プロセス強制終了
```

## 開発フロー
1. `npm run db:start` でデータベース起動
2. `npm run dev` で開発サーバー起動
3. コード修正・テスト
4. `npm run lint` でコード品質チェック
5. 必要に応じて `npm run db:seed` でテストデータ追加
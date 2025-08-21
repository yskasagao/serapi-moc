# Claude Code開発環境管理コマンド

## Claude専用コマンド（推奨）
これらのコマンドを使用することで、プロセス管理の問題を回避できます。

### 基本コマンド
```bash
npm run claude:clean    # 環境クリーンアップ（プロセス強制終了）
npm run claude:start    # クリーンな状態で開発サーバー起動
npm run claude:restart  # 完全リスタート（DB + 開発サーバー）
npm run claude:db       # データベースの状態確認・起動
```

### その他の管理コマンド
```bash
npm run port:check      # ポート3000の使用状況確認
npm run dev:kill        # Next.jsプロセス強制終了
npm run dev:clean       # プロセス終了 + 待機
npm run env:status      # 環境全体の状況確認
```

## Claude Codeでの使用パターン

### 開発サーバー起動時
1. `npm run claude:clean` - 環境クリーンアップ
2. `npm run claude:start` - 開発サーバー起動

### 問題発生時の対処
1. `npm run claude:restart` - 完全リスタート

### データベースのみ必要な場合
1. `npm run claude:db` - データベース起動確認

## 技術的な仕組み
- `claude-dev-manager.js` でプロセス管理を自動化
- 複数の方法でプロセスを確実に終了
- ポート解放の待機処理
- データベース状態の自動確認

## 従来の問題点と解決策
**問題**: Next.js開発サーバーが適切に終了せずポートが残る
**解決**: 複数の終了方法を順次実行し、ポート解放を確認してから次の処理へ

**問題**: データベース起動忘れ
**解決**: `claude:restart`で自動的にDB状態確認・起動

これにより、Claude Codeが自動でプロセス管理を行う際の問題を解消できます。
# SERAPI-STAR プロジェクト概要

## プロジェクト目的
SERAPI-STARは、セラピストとユーザーをつなぐWebアプリケーションです。セラピスト検索、予約管理、体験日記、レビューシステムなどの機能を提供しています。

## アプリケーション構成
- **apps/web**: メインのWebアプリケーション（ユーザー向け）
- **apps/admin**: 管理者向けダッシュボード
- **apps/company**: 企業向け管理画面

## 主要機能
- セラピスト検索・一覧表示
- 店舗検索・地域別表示
- 体験日記の投稿・閲覧
- ブックマーク機能
- コメント・レビューシステム
- セラピスト申請機能
- 店舗申請機能

## アクセス先（開発環境）
- メインページ: http://localhost:3000/ja
- セラピスト一覧: http://localhost:3000/ja/areas
- 体験日記: http://localhost:3000/ja/experience-diary
- セラピスト申請: http://localhost:3000/ja/therapist-application
- 店舗申請: http://localhost:3000/ja/store-application

## データベース構成
- **media-db**: メインコンテンツ（Serapistar、Comment、Bookmarkなど）
- **company-db**: 会社・予約データ（Company、ReservationDataなど）
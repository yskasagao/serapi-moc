@echo off
echo ========================================
echo   開発環境管理ユーティリティ
echo ========================================
echo.
echo 1. 開発サーバー強制停止 + 再起動
echo 2. ポート3000の使用状況確認
echo 3. 残存プロセスを強制終了
echo 4. データベース再起動
echo 5. 完全環境リセット
echo.
set /p choice="選択してください (1-5): "

if "%choice%"=="1" goto restart_dev
if "%choice%"=="2" goto check_port
if "%choice%"=="3" goto kill_processes
if "%choice%"=="4" goto restart_db
if "%choice%"=="5" goto full_reset
goto end

:restart_dev
echo Next.js開発サーバーを強制停止中...
wmic process where "commandline like '%%next%%start-server%%'" delete >nul 2>&1
timeout /t 2 >nul
echo 開発サーバーを再起動中...
start cmd /k "yarn dev"
goto end

:check_port
echo ポート3000の使用状況:
netstat -ano | findstr :3000
goto end

:kill_processes
echo Node.jsプロセスを確認中...
wmic process where "name='node.exe' and commandline like '%%next%%'" get processid,commandline
echo 上記のプロセスを終了しますか？ (Y/N)
set /p confirm=
if /i "%confirm%"=="Y" (
    wmic process where "name='node.exe' and commandline like '%%next%%'" delete
    echo プロセスを終了しました
)
goto end

:restart_db
echo データベースを再起動中...
yarn db:stop
yarn db:start
goto end

:full_reset
echo 完全リセット実行中...
wmic process where "commandline like '%%next%%start-server%%'" delete >nul 2>&1
yarn db:stop
timeout /t 2 >nul
yarn db:start
yarn db:generate
yarn dev
goto end

:end
pause
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Top-Level Rules

- To maximize efficiency, **if you need to execute multiple independent processes, invoke those tools concurrently, not sequentially**.
- **You must think exclusively in English**. However, you are required to **respond in Japanese**.

## Programming Rules

- Avoid hard-coding values unless absolutely necessary.
- Do not use `any` or `unknown` types in TypeScript.
- You must not use a TypeScript `class` unless it is absolutely necessary (e.g., extending the `Error` class for custom error handling that requires `instanceof` checks).
- **Before completing any task, ensure all ESLint warnings and errors are resolved**. Run the appropriate lint commands and fix any issues that arise.

## Project Structure

This is a monorepo containing a multi-application system called "serapi-star" with the following architecture:

- **apps/web** - Main web application (Next.js, port 3000) - Public-facing website
- **apps/admin** - Admin dashboard (Next.js, port 3001) - Administrative interface
- **apps/company** - Company portal (Next.js, port 3500) - Business management interface
- **packages/media-db** - Media database package (Prisma schema for media content)
- **packages/admin-db** - Admin database package (Prisma schema for admin operations)
- **packages/company-db** - Company database package (Prisma schema for company data)
- **tiktok-proxy** - TikTok proxy service (Node.js, port 8080)

## Development Commands

### Root Level Commands

```bash
# Database operations
npm run db:generate    # Generate all database clients
npm run db:deploy      # Deploy media database migrations
npm run db:studio      # Open Prisma Studio

# Development servers
npm run dev:web        # Start web app on port 3000
npm run dev:admin      # Start admin app on port 3001
npm run dev:company    # Start company app on port 3500

# Build commands
npm run build:web      # Build web app (includes media-db and company-db generation)
npm run build:admin    # Build admin app (includes all database generation)
npm run build:company  # Build company app (includes company-db generation)

# Production
npm run start:web      # Start web app in production mode
```

### Individual Application Commands

```bash
# Web app (apps/web) - Docker環境推奨（Jest Worker エラー解決済み）
cd apps/web && yarn docker:dev   # Docker development environment (推奨)
cd apps/web && yarn docker:up    # Start Docker containers
cd apps/web && yarn docker:logs  # View container logs
cd apps/web && yarn docker:shell # Connect to container shell
cd apps/web && yarn docker:down  # Stop containers

# Web app - ローカル環境（従来）
cd apps/web && yarn dev           # Development server
cd apps/web && yarn lint          # ESLint
cd apps/web && yarn build         # Production build

# Admin app (apps/admin)
cd apps/admin && yarn dev         # Development server
cd apps/admin && yarn lint        # ESLint
cd apps/admin && yarn lint:fix    # ESLint with auto-fix

# Company app (apps/company)
cd apps/company && yarn dev       # Development server
cd apps/company && yarn lint      # Next.js lint
```

## Database Architecture

The project uses multiple Prisma databases:

- **media-db**: Handles user data, content, comments, bookmarks, experience diaries
- **admin-db**: Manages admin users and administrative operations
- **company-db**: Stores company information, reservations, LINE integration data

All database packages are located in `packages/` and are workspace dependencies referenced as `@serapi/*`.

## Key Technologies

- **Frontend**: Next.js 15 (web/admin), Next.js 14 (company)
- **UI Components**: Radix UI primitives with Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Forms**: React Hook Form with Zod validation
- **Internationalization**: next-intl (web app)
- **Containerization**: Docker with docker-compose
- **Package Manager**: Yarn (npm から移行済み)
- **Runtime**: Node.js 22.6.0 (Docker環境)

## Development Notes

- **Package Manager**: Yarn を使用（npm から移行済み）
- **Docker Environment**: Web app は Docker 環境推奨（Jest Worker エラー解決済み）
- Use npm workspaces - run commands from root with `-w` flag or navigate to specific app directories
- Database generation is automatically handled by build commands but can be run manually with `yarn db:generate`
- Each app runs on different ports to avoid conflicts
- The admin app includes specific lint configuration and should use `yarn lint:fix` for auto-fixing
- Docker setup includes nginx reverse proxy, PostgreSQL database, and TikTok proxy service
- **Jest Worker Issue**: Docker環境で完全解決（Node.js 22.6.0 + Alpine Linux）

## Common Patterns

- Components are typically organized in `_components/` directories with index.ts exports
- Forms use React Hook Form with Zod schemas in separate `schema.ts` files
- Actions are separated into `actions.ts` or `action.ts` files
- Database operations use app-specific Prisma clients from workspace packages

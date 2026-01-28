# Featul App

The core SaaS application for Featul.

## 🔎 Overview

This workspace contains the main application logic, including the user dashboard, workspace management, and core features. It is built using Next.js 16 with the App Router.

## 🛠 Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Authentication**: Better Auth (Passkeys, Socials, Email)
- **Database**: Drizzle ORM (Neon / Postgres)
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand & React Query
- **Editor**: Tiptap 

## 🚀 Getting Started

### Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in the required environment variables in `.env.local` (Database URL, Auth secrets, etc.).

### Development

Run the development server:

```bash
bun dev
```
(Note: This runs via TurboRepo from the root, filtering for `app`)

Or directly from the root:
```bash
bun run app:dev
```

The app will be available at `http://localhost:3000`.

## 📦 Key Libraries

- `@featul/ui`: Shared UI components.
- `@featul/api`: API client and definitions.
- `@featul/db`: Database schema and client.

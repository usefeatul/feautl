# Featul

A modern, full-stack monorepo for the Featul platform, built with TurboRepo.

## 🚀 Overview

Featul is a comprehensive platform containing:
- **Core SaaS Application** (`apps/app`): The main workspace for users, built with Next.js 16.
- **Marketing Site** (`apps/web`): The public-facing website and blog.
- **Shared Packages**: Reusable components, utilities, and configurations.

## 🛠 Tech Stack

- **Monorepo**: TurboRepo
- **Package Manager**: Bun & npm
- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Drizzle ORM
- **Deployment**: Vercel / Cloudflare

## 📁 Project Structure

```bash
.
├── apps/
│   ├── app/          # Core SaaS application
│   └── web/          # Marketing website and blog
├── packages/
│   ├── api/          # Shared API logic (Hono/Elysia)
│   ├── auth/         # Authentication (Better Auth)
│   ├── db/           # Database schema and Drizzle config
│   ├── editor/       # Shared rich text editor
│   ├── ui/           # Shared UI components (featured UI library)
│   └── tsconfig/     # Shared TypeScript configurations
└── ...
```

## ⚡ Quick Start

### Prerequisites

- Node.js >= 20
- Bun (for local development speed)

### Installation

```bash
bun install
```

### Development

To start the development server for all apps:

```bash
bun dev
```

To run a specific app:

```bash
bun run app:dev   # Start core app
bun run web:dev   # Start marketing site
```

## 📜 License

Proprietary © Featul

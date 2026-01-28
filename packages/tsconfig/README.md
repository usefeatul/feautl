# @featul/tsconfig

Shared TypeScript configurations for the Featul monorepo.

## 📦 Purpose

This package provides a standardized TypeScript configuration to ensure consistency across all apps and packages in the monorepo.

## 🛠 Usage

Extend the base configuration in your `tsconfig.json`:

```json
{
  "extends": "@featul/tsconfig/base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

## Available Configs

- `base.json`: The standard configuration used by most packages.
- `nextjs.json`: Configuration tailored for Next.js applications (if available).
- `react-library.json`: Configuration for React component libraries.

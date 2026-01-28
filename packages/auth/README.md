# @featul/auth

Shared authentication package for the Featul monorepo, powered by Better Auth.

## 📦 Features

- **Better Auth Integration**: Core authentication logic with social providers and passkeys.
- **Client & Server SDKs**: Helpers for both client-side and server-side usage.
- **Workspace Management**: Utilities for handling organization and workspace context.
- **Email & Password**: Standard credential authentication support.

## 🚀 Exports

### Core
- `.` (Root): Main entry point (often re-exports standard auth helpers).
- `./client`: Client-side React hooks and utilities.
- `./server`: Server-side validation and session management.
- `./auth`: Auth configuration definition.

### Modules
- `./workspace`: Workspace-related operations.
- `./password`: Password management utilities.
- `./session`: Session handling.
- `./email`: Email related auth functions.
- `./trust`: Trust and verification utilities.

## 🛠 Usage

```typescript
import { auth } from "@featul/auth/server";
import { useSession } from "@featul/auth/client";
```

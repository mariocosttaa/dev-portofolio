# AGENTS.md

## Cursor Cloud specific instructions

This is a React/TypeScript portfolio SPA (no backend, no database). All data is static JSON in `src/data/`.

### Services

| Service | Command | Port |
|---------|---------|------|
| Vite Dev Server | `npm run dev` | 8080 |

### Key commands

See `package.json` scripts. Standard commands:
- **Dev server**: `npm run dev` (port 8080, configured in `vite.config.ts`)
- **Lint**: `npm run lint` (ESLint; pre-existing warnings/errors in codebase — 5 errors, 9 warnings as of initial setup)
- **Build**: `npm run build`
- **Preview**: `npm run preview`

### Notes

- The lockfile is `package-lock.json` — use **npm**, not pnpm/yarn.
- `bun.lockb` also exists but npm is the primary package manager per README.
- Vite dev server binds to `::` (all interfaces) on port **8080** (not the default 5173).
- No environment variables are required; `VITE_API_URL` is mentioned in README but unused — all data is local JSON files.

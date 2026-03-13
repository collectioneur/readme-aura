# AGENTS.md

> Concise guide for AI agents working on this codebase.
> All code, comments, variable names, commit messages, and documentation MUST be in English.

---

## Core Rules

### 1. Language Policy

Every artifact in this repository — code, comments, variable names, type names,
commit messages, documentation, and issue/PR descriptions — must be written in English.
No exceptions.

### 2. TDD Policy (Test-Driven Development)

Medium and large changes (new features, refactors touching multiple files, new modules)
**must** follow strict TDD:

1. **Red** — Write failing tests that describe the expected behavior.
2. **Green** — Implement the minimum code to make tests pass.
3. **Refactor** — Clean up while keeping tests green.
4. Run `npm test` after every implementation step.

**Exempt**: small changes (<10 lines), config tweaks, documentation-only edits.

Test framework: **Vitest**. Tests live in `src/__tests__/`, mirroring `src/` structure.

### 3. Reflection & Decision Logging

After completing a medium or large change, reflect on it and append an entry
to `docs/decisions.md` using the ADR-lite format:

```
## YYYY-MM-DD: Short title
- **Context**: Why was this change needed?
- **Decision**: What was chosen and why?
- **Alternatives**: What else was considered?
- **Avoid**: What should NOT be done in the future?
```

Keep entries concise (5-10 lines each).

### 4. Code Quality Checks

After any medium or large change, run and verify zero errors from:

1. `npm run lint` — ESLint (no warnings or errors).
2. `npm run format:check` — Prettier (all files formatted).
3. `npm run build` — TypeScript compilation (no type errors).

The IDE is configured to auto-format (Prettier) and auto-fix (ESLint) on save
via `.vscode/settings.json`, but always verify before committing.

---

## Project Map

### Source Code (`src/`)

| File | Role |
|------|------|
| `cli.ts` | CLI entry point (Commander). Orchestrates parsing, rendering, file output. |
| `parser.ts` | Parses source Markdown via remark, extracts `aura` code blocks, replaces them with image nodes. |
| `renderer.ts` | Transpiles JSX (Sucrase) and renders to SVG (Satori). Contains `createElement`, `parseMeta`, `transpileJsx`, `renderBlock`. |
| `fonts.ts` | Loads Inter from `@fontsource/inter` or Google Fonts CDN. Supports custom font directories. |
| `github.ts` | Fetches GitHub user/repo data via GraphQL API. Auto-detects username from git remote. Provides mock data fallback. |
| `types.ts` | All shared TypeScript interfaces (`ExtractedBlock`, `ParseResult`, `FontConfig`, `RenderOptions`, `GitHubData`, etc.). |

### Components (`src/components/`)

| File | Role |
|------|------|
| `index.ts` | Re-exports component factories. |
| `StatsCard.ts` | Neon/cyberpunk stats card (stars, commits, repos, forks + languages). |
| `MockupPhone.ts` | Phone-frame mockup showing profile info, mini stats, top repos. |

### Tests (`src/__tests__/`)

| File | Covers |
|------|--------|
| `renderer.test.ts` | `parseMeta`, `createElement`, `transpileJsx` |
| `parser.test.ts` | `parseSource` (block extraction, image replacement, relative paths) |

### Documentation (`docs/`)

| File | Purpose |
|------|---------|
| `architecture.md` | High-level pipeline overview, module responsibilities, data flow. |
| `decisions.md` | Architecture Decision Records (ADR-lite log). |

### Configuration & CI

| File | Purpose |
|------|---------|
| `package.json` | ESM package, bin `readme-aura`, scripts: `build`, `test`, `lint`, `format`, `dev`, `start`. |
| `tsconfig.json` | TypeScript strict, ES2022, Node16 modules, declarations + source maps. |
| `eslint.config.js` | ESLint 9 flat config: strict TypeScript rules + Prettier compat. |
| `.prettierrc` | Prettier config: single quotes, trailing commas, 100 char width. |
| `action.yml` | GitHub Action (composite): setup Node, build, run readme-aura, auto-commit. |
| `.github/workflows/generate-readme.yml` | Dogfooding workflow: rebuilds project README on push to main. |
| `.github/workflows/readme-aura.example.yml` | Template workflow for users to copy into their repos. |

### Other

| Path | Purpose |
|------|---------|
| `readme.source.md` | Source Markdown for the project's own README (dogfooding). |
| `examples/` | Example source/output pairs for showcase. |
| `dist/` | Compiled JS output (gitignored in spirit, committed for Action). |

---

## Key Commands

| Command | Purpose |
|---------|---------|
| `npm run build` | Compile TypeScript (`tsc`) |
| `npm test` | Run all tests once (`vitest run`) |
| `npm run test:watch` | Run tests in watch mode (`vitest`) |
| `npm run lint` | Run ESLint on `src/` |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format `src/` with Prettier |
| `npm run format:check` | Check formatting without writing |
| `npm run dev` | Run CLI from source (`tsx src/cli.ts`) |
| `npm start` | Run compiled CLI (`node dist/cli.js`) |

---

## Conventions

- **Module system**: ESM (`"type": "module"`). Use `.js` extensions in all imports.
- **TypeScript**: Strict mode. Prefer explicit types for public API functions.
- **Commits**: Conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`). Single line, max 100 chars. No body.
- **Dependencies**: Minimize. Every new dependency must be justified in `docs/decisions.md`.
- **Generated files**: SVGs use `readme-aura-component-{index}-{hash}.svg` naming.
- **Source files**: User-facing source Markdown uses `*.source.md` extension.

---

## Pipeline Overview

```
*.source.md
    │
    ▼
  parser.ts (remark)
    │ extracts ```aura blocks
    ▼
  renderer.ts (sucrase → satori)
    │ JSX string → element tree → SVG
    ▼
  cli.ts (orchestrator)
    │ writes SVGs to assets dir
    │ replaces blocks with <img> refs
    ▼
  README.md + .github/assets/*.svg
```

# Architecture Decision Records

Chronological log of significant technical decisions.
Each entry follows the ADR-lite format.

---

## 2025-01-01: Use Satori for SVG rendering

- **Context**: readme-aura needs to convert JSX/React-like components into SVG images that can be embedded in GitHub READMEs. The rendering must work in Node.js without a browser.
- **Decision**: Use [Vercel Satori](https://github.com/vercel/satori) — a library that renders React-like element trees directly to SVG using a custom layout engine (Yoga/flexbox).
- **Alternatives**: Puppeteer/Playwright (headless browser screenshot → too heavy for CI, large dependency), canvas-based rendering (limited SVG output quality, needs native deps).
- **Avoid**: Do not introduce browser-based rendering into the core pipeline. Keep the core dependency-light and CI-friendly. If animated output (GIF/WebP) is needed later, it should be a separate optional plugin.

## 2025-01-01: Use Sucrase for JSX transpilation

- **Context**: Users write JSX inside Markdown code blocks. This JSX needs to be transformed into `createElement` calls at runtime.
- **Decision**: Use [Sucrase](https://github.com/alangpierce/sucrase) — a fast, focused transpiler that handles JSX transformation without needing a full Babel setup.
- **Alternatives**: Babel (full-featured but heavy, slower), TypeScript compiler API (overkill for JSX-only transform), esbuild (would work but larger API surface than needed).
- **Avoid**: Don't use Babel unless Sucrase proves insufficient. Don't try to implement a custom JSX parser.

## 2026-03-13: Adopt Vitest for testing

- **Context**: Project had zero tests. Need a test framework that works natively with the existing ESM + TypeScript setup.
- **Decision**: Use [Vitest](https://vitest.dev/) — native ESM support, zero-config TypeScript, Jest-compatible API, fast execution via esbuild.
- **Alternatives**: Jest (experimental ESM support, requires `ts-jest` or `@swc/jest` for TypeScript — 3+ extra dependencies), Mocha + Chai (manual setup, no built-in TypeScript support).
- **Avoid**: Don't use Jest for ESM+TypeScript projects — the configuration overhead and experimental ESM flags are not worth it.

## 2026-03-13: Add ESLint 9 + Prettier for code quality

- **Context**: Project had no linter or formatter. Inconsistent code style across files, no automated checks for common mistakes beyond TypeScript strict mode.
- **Decision**: Use ESLint 9 (flat config) with `typescript-eslint` strict rules + Prettier for formatting. ESLint handles logic errors and best practices; Prettier handles formatting. `eslint-config-prettier` disables ESLint rules that conflict with Prettier. IDE auto-formats/fixes on save via `.vscode/settings.json`.
- **Alternatives**: ESLint alone with stylistic rules (mixing concerns — linter doing formatter's job), Biome (newer all-in-one tool but smaller ecosystem and less mature TypeScript support), dprint (fast formatter but less IDE integration).
- **Avoid**: Don't use `eslint-plugin-prettier` (runs Prettier as an ESLint rule — slow, noisy). Don't add heavy presets like `eslint-config-airbnb`. Keep the config minimal and let TypeScript strict mode handle type safety.

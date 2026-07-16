---
name: readme-aura
description: Create or edit GitHub READMEs using readme-aura, which renders React/JSX components into static SVGs embedded in Markdown (bypassing GitHub's JS/CSS stripping). Use this whenever the user wants a fancy/animated/stylized GitHub README, a profile README, banner graphics, stat cards, or social buttons in a README — or asks to run `readme-aura`, edit `readme.source.md`, or add an `aura` code block. Also use it when working inside a repo that already contains a `readme.source.md` file or a `.github/workflows/readme-aura.yml` workflow.
---

# readme-aura

readme-aura turns JSX written inside fenced ` ```aura ` code blocks in a source Markdown file into static SVG images, then stitches the result into `README.md`. GitHub strips `<script>`/`<style>` from rendered READMEs, so this compiles designs to SVG at build time instead of relying on runtime JS. Rendering is done by [Satori](https://github.com/vercel/satori) (JSX → SVG, no browser).

## Mental model

```
readme.source.md  →  parser.ts (remark)  →  renderer.ts (sucrase → satori)  →  README.md + .github/assets/*.svg
```

- `readme.source.md` is the file you (the agent) edit. It's normal Markdown, except some code blocks are tagged ` ```aura ` instead of a language name.
- Each `aura` block's content is a single JSX expression — it must evaluate to **one root element**.
- `npx readme-aura build` extracts every `aura` block, renders it to an SVG, writes the SVGs to an assets directory, and replaces each block with an `<img>`/`<a><img/></a>` in the generated `README.md`. It also deletes stale SVGs from the assets dir that are no longer referenced.
- Never hand-edit `README.md` directly if a `readme.source.md` exists — it gets overwritten on the next build. Edit `readme.source.md` and rebuild.

## Workflow

1. **New repo / no `readme.source.md` yet**: run `npx readme-aura init`. This scaffolds `.github/workflows/readme-aura.yml` (auto-rebuilds on push to `main`), a starter `readme.source.md` (auto-picks a `profile` template for `username/username` repos, otherwise `project`), and audits `.gitignore` so generated assets/workflow files aren't ignored.
   - Pass `--template <Name>` to start from a community template in `examples/custom-templates/` (e.g. `DarkOrbs`, `PurpleGlow`, `LightOrbs`) instead of the default — fetched live from GitHub.
   - Pass `--force` to overwrite existing files.
2. **Edit `readme.source.md`**: write normal prose/Markdown for regular sections, and use ` ```aura ` blocks for anything that should render as a graphic (banners, badges, stat cards, animated elements). See "Writing an aura block" below.
3. **Build locally to check the result**: `npx readme-aura build`. Read the console output — it reports each block rendered and any transpile/render errors with the offending block index. Open the generated SVGs or the rendered `README.md` (e.g. via a Markdown preview) to sanity check layout before pushing; Satori's layout model does not always match a browser's.
4. **Push to `main`**: if the workflow from `init` is in place, GitHub Actions rebuilds and auto-commits `README.md` + assets on every push that touches `readme.source.md`, plus a daily cron (keeps GitHub stats fresh). You can also build-and-commit yourself locally instead of relying on CI.

## Writing an aura block

Fence syntax: opening line is ` ```aura ` followed by space-separated parameters, then a single JSX expression, then the closing fence.

```markdown
```aura width=800 height=200 link="https://example.com"
<div style={{ display: 'flex', width: '100%', height: '100%', background: '#111' }}>
  <span style={{ color: 'white', fontSize: 32 }}>Hello</span>
</div>
```
```

Block parameters (all on the opening fence line):

| Parameter | Type | Default | Effect |
|-----------|------|---------|--------|
| `width` | number | `800` | SVG width in px |
| `height` | number | `400` | SVG height in px |
| `link` | string | – | Wraps the rendered `<img>` in `<a href="...">` |
| `inline` | flag | – | Renders as `<img>` instead of a block `<p>`. Consecutive `inline` blocks auto-join onto one line — use this for rows of badges/buttons |
| `align` | `left`\|`center`\|`right` | `left` | Wraps a run of consecutive `inline` blocks in `<p align="...">`. Only meaningful with `inline`; the value is read from the first block in the group that sets it |

### JSX rules (important — this is not full React/DOM)

- The block content is transpiled with Sucrase and evaluated as `return (<jsx>);` — it **must be a single expression that returns one root element**. Multiple top-level siblings will throw "JSX did not produce a valid element."
- Use `style={{ ... }}` (camelCase JS objects), not string `style="..."` or CSS classes — there's no stylesheet, only inline styles interpreted by Satori.
- Satori requires explicit `display: 'flex'` (or `'none'`) on containers with multiple children — it doesn't do implicit block layout the way a browser does. When in doubt, default every container `div` to `display: 'flex'` and set `flexDirection`.
- Layout CSS is Satori's flexbox subset — no CSS grid, no floats, limited support for some shorthand properties.
- Available JSX intrinsics include plain HTML-ish tags (`div`, `span`, `img`, `p`, ...) *and* raw SVG tags (`svg`, `defs`, `radialGradient`, `ellipse`, `path`, `g`, `animate`, `animateTransform`, `animateMotion`, ...) — you can freely mix them, e.g. an absolutely-positioned `<svg>` behind flex `div`s for glow/gradient effects (see the project's own `readme.source.md` for a worked example).
- `<img src>` accepts an `http(s)://` URL, a `data:` URI, or a local file path relative to the source file's directory — local files are read and base64-inlined at build time.
- Emoji in text are auto-fetched from a Twemoji CDN and inlined as SVG.

### Injected context variables

These are available by name inside every `aura` block without importing anything:

| Name | Type | Notes |
|------|------|-------|
| `github` | `GitHubData \| null` | The configured user's profile, stats, top languages, repos. `null` if no token/user resolved — always guard with `github && (...)` or optional chaining |
| `repo` | `RepositoryData \| null` | Stats for the current repository (stars, forks, commits, language). `null` if not resolvable — guard the same way |
| `SocialMediaButton` | component | Built-in animated button, see below |

Because `github`/`repo` can be `null` (e.g. running `build` with no `GITHUB_TOKEN`, or locally without network), always write conditional JSX (`{repo && <div>...}`) rather than assuming the data is present — the project's own `readme.source.md` does this throughout.

### Built-in components

**`SocialMediaButton`** — animated holographic-border button, commonly used inline in a centered row of social links.

```jsx
<SocialMediaButton
  icon="https://example.com/icon.svg"
  text="Follow"
  backgroundColor="#111111"
  textColor="#f5f5f5"
  fontSize={13}
  width={150}
  height={40}
  iconSize={18}
  borderColor="#AAAAAA"
  gradientStops={[
    { offset: '0%', color: '#ffffff' },
    { offset: '50%', color: '#eeeeee' },
    { offset: '100%', color: '#555555' },
  ]}
  gradientStrokeWidth={2}
/>
```

Check `src/components/index.ts` for the current full list of exported components before assuming one exists — it changes over time; don't invent a component name that isn't exported there.

### Animations

Satori renders one static frame; the *browser* (GitHub) animates the resulting SVG, via either:
- **CSS**: put a `<style>{`@keyframes ... #id { animation: ... }`}</style>` block inside the JSX. The renderer extracts `<style>` nodes and injects them into the final `<svg>...</svg>`. Target elements with `id` (raw SVG elements preserve `id` reliably; Satori-rendered HTML elements may not preserve `className`).
- **SMIL**: `<animate>`, `<animateTransform>`, `<animateMotion>` directly on raw SVG elements — no extraction step needed, these render as-is.

Animatable-safely: `transform` (translate/scale/rotate), `opacity`, `fill`, `stroke-dasharray`/`stroke-dashoffset`. Avoid animating layout properties (`width`, `height`, `margin`) — unreliable across renderers. No JavaScript is possible (GitHub strips it), so animation must be pure CSS/SMIL.

## Commands reference

| Command | Purpose |
|---------|---------|
| `npx readme-aura init [--template <name>] [--force]` | Scaffold workflow + `readme.source.md` + gitignore audit |
| `npx readme-aura build [-s source] [-o output] [-a assets] [-f fontsDir] [-g githubUser] [-t githubToken] [--owner] [--repo]` | Render `aura` blocks and generate the README |

Useful build flags when the defaults don't fit: `--source`/`--output` to point at non-default file locations, `--fonts-dir` for custom fonts (Inter is bundled by default), `--github-user`/`--owner`/`--repo` to override auto-detection from the git remote when it's wrong or unavailable, `--github-token` if `GITHUB_TOKEN` isn't set in the environment.

## Contributing a template

If asked to package a finished design for reuse: drop the `readme.source.md` into `examples/custom-templates/<Name>/` in this repo. Once merged, anyone can pull it via `npx readme-aura init --template <Name>`. See `CONTRIBUTING.md` for the full process.

## Working in this repository specifically

If the task is developing readme-aura itself (not just using it to build a README), see `AGENTS.md` at the repo root — it defines TDD requirements, commit conventions, and the source layout (`src/parser.ts`, `src/renderer.ts`, `src/cli.ts`, etc.) in detail.

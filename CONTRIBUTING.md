# Contributing to readme-aura

There are two ways to contribute:

1. **[Add a community template](#adding-a-community-template)** - share your design so anyone can install it with `npx readme-aura init --template YourName`
2. **[Contribute code](#contributing-code)** - bug fixes, new features, built-in components

---

## Adding a Community Template

### Step 1 - Design your template

Build your `readme.source.md` as usual. Run it against your own profile to get it looking exactly how you want:

```bash
npx readme-aura build
```

### Step 2 - Generalize it

Your template will be used by other people, so replace every piece of personal data with a clear, ALL_CAPS placeholder. This makes it obvious what each person needs to fill in.

Common things to replace:

| Personal data | Placeholder |
|---------------|-------------|
| Your GitHub username | `YOUR_GITHUB_USERNAME` |
| Your display name | `YOUR_NAME` |
| Your Twitter/X handle | `YOUR_TWITTER_HANDLE` |
| Your Telegram | `YOUR_TELEGRAM_HANDLE` |
| Your email | `YOUR_EMAIL` |
| Your website | `YOUR_WEBSITE_URL` |
| Your tagline / bio | `YOUR_TAGLINE` |

Example - before:

```jsx
link="https://github.com/collectioneur"
```

After:

```jsx
link="https://github.com/YOUR_GITHUB_USERNAME"
```

**Note:** Don't replace `github` and `repo` - these are injected automatically at build time and will display real stats for whoever runs the template.

### Step 3 - Add attribution

At the very bottom of `readme.source.md`, add a one-line comment crediting yourself:

```html
<!-- Template by @YOUR_GITHUB_USERNAME - https://github.com/YOUR_GITHUB_USERNAME -->
```

### Step 4 - Create the template folder

Add your template under `examples/custom-templates/`. The folder name is the template identifier - this is what users will type after `--template`. Use PascalCase, no spaces, no special characters.

```
examples/custom-templates/
  YourTemplateName/
    readme.source.md    ← your generalized source (required)
    README.md           ← generated preview (required, see step 5)
    assets/             ← generated SVGs (required, see step 5)
```

### Step 5 - Build the preview locally

From the root of the repository, run:

```bash
npx readme-aura build \
  --source examples/custom-templates/YourTemplateName/readme.source.md \
  --output examples/custom-templates/YourTemplateName/README.md \
  --assets examples/custom-templates/YourTemplateName/assets
```

This generates `README.md` and the `assets/` folder directly inside your template folder. Both must be committed - they serve as the preview on GitHub.

### Step 6 - Add your template to the main README

Open `readme.source.md` (in the root) and find the **Example Templates** section. Add one line for your template:

```bash
npx readme-aura init --template YourTemplateName
```

### Step 7 - Open a pull request

- Branch name: `template/your-template-name`
- PR title: `feat: add YourTemplateName community template`
- **Attach a screenshot** of what the rendered README looks like. You can take a screenshot of the generated `README.md` in the GitHub preview or your browser.

---

## Contributing Code

For bug fixes and new features, follow the standard flow:

1. Fork the repo and create a branch from `main`
2. Write failing tests first (`src/tests/`), then implement the fix - see [TDD policy](#tdd-policy) below
3. Run the quality checks and make sure all three pass:

```bash
npm run lint           # ESLint - no errors
npm run format:check   # Prettier - all files formatted
npm run build          # TypeScript - no type errors
```

4. Open a PR against `main` with a clear description of what changed and why

### TDD Policy

New features and refactors touching more than one file must follow TDD:

1. **Red** - write tests in `src/tests/` that describe the expected behavior and confirm they fail
2. **Green** - write the minimum code to make them pass
3. **Refactor** - clean up while keeping tests green

Exempt: config tweaks, dependency bumps, documentation-only edits, fixes under 10 lines.

### Commit conventions

```
feat: add --output-dir option to build command
fix: resolve local image paths on Windows
test: cover inline block grouping in parser
docs: update SocialMediaButton prop table
```

Format: `type: short description`, max 100 characters, English only.

---

## Questions?

Open an [issue](https://github.com/collectioneur/readme-aura/issues) or start a [Discussion](https://github.com/collectioneur/readme-aura/discussions).

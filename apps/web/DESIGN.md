# Design System Document



## 1. Overview & Creative North Star: "The Deep Signal"



This design system builds a premium developer tool experience rooted in **depth, luminance, and precision**. The Creative North Star is **"The Deep Signal"** — a visual language borrowed from deep-sea bioluminescence and neon-lit data terminals.

The interface lives in a very dark navy space where teal/cyan light sources pierce through the darkness, giving everything a sense of depth and active energy. Typography adopts the **liquid glass** aesthetic — text that feels cast from light rather than painted on. Layout is editorial: generous whitespace, bold type scales, and deliberate asymmetry.



---



## 2. Colors & Surface Philosophy



The palette is anchored in **deep navy blues** with **teal/cyan** as the primary luminance accent and **emerald green** for success/positive states.



### Surface Hierarchy

- **Base Layer:** `surface.base` (#060d1c) — deepest background, near-black navy
- **Secondary Sections:** `surface.low` (#0c1929) — subtle step up
- **Nested Content/Cards:** `surface.DEFAULT` (#0f1f35) or `surface.high` (#162540)
- **Focal Points/Code Blocks:** `surface.highest` (#1e2e4a)

### Accent Colors

- **Primary (Teal/Cyan):** `teal-500` (#06b6d4) — CTAs, glow orbs, active states
- **Teal Light:** `teal-300` (#67e8f9) — code highlights, active nav links
- **Secondary (Emerald):** `emerald-400` (#34d399) — success states, check marks, build output
- **Accent Border:** `linear-gradient(teal → indigo → purple → pink)` — for special/featured cards

### Glow & Atmosphere

Large radial gradient orbs placed behind hero sections and key content areas simulate light sources:
- Primary orb: `teal-500` at 7% opacity, 120px blur
- Secondary orb: `teal-400` at 6% opacity, 80px blur

### The "No Harsh Line" Rule

Do not use solid 1px borders for structural layout. Use `border border-white/[0.06]` (6% white) for card glass containers. Active/hover states can use `border-white/[0.12]`.



---



## 3. Typography: Liquid Glass & Precision



### Display (Inter, font-black)

Hero headings use **Inter** at maximum weight (`font-black`, 900) with tight tracking (`tracking-tight`). The signature `.text-liquid-glass` utility applies:

```css
background: linear-gradient(
  180deg,
  rgba(255,255,255,0.97) 0%,
  rgba(200,238,255,0.88) 28%,
  rgba(140,215,255,0.70) 58%,
  rgba(80,190,255,0.45) 100%
);
-webkit-background-clip: text;
filter: drop-shadow(0 0 24px rgba(6,182,212,0.35));
```

This creates the illusion of text molded from ice or glass — solid white at the top, dissolving into teal-blue light at the bottom.

### Section Headings (Inter, font-bold)

H2 and H3 use `.text-gradient-bright` (white to cyan gradient) with `font-bold` (700) and `tracking-tight`.

### Labels & Metadata (Space Grotesk)

Uppercase eyebrow labels use `font-grotesk`, `tracking-[0.22em]` to `tracking-[0.28em]`, `text-xs`, and `text-teal-400`.

### Body (Inter)

Body text at `text-sm` or `text-base` with `leading-relaxed`. Color: `text-ink-secondary` (#7a98b8).



---



## 4. Glassmorphism & Card System

All cards use the `.card-glass` utility:
```css
background: rgba(15, 31, 53, 0.80);
backdrop-filter: blur(8px);
border: 1px solid rgba(255, 255, 255, 0.06);
```

Navbar uses `.surface-glass` (darker, heavier blur):
```css
background: rgba(9, 20, 40, 0.72);
backdrop-filter: blur(14px);
```

Cards have a subtle ambient teal glow in the top-right corner (small blurred radial) that intensifies on hover.

Featured/accent cards use `.border-gradient-accent` — a CSS mask trick that renders a gradient border (teal → indigo → purple → pink) without affecting the card background.



---



## 5. Components



### Buttons

- **Primary:** `bg-teal-500 hover:bg-teal-400` + `.glow-teal` box-shadow, `rounded-full`, white text
- **Secondary (Ghost):** `bg-surface-high hover:bg-surface-highest` + `border border-white/[0.08]`, `rounded-full`

### Code Blocks

- Background: `.card-glass` (navy glass)
- Monospace font: system `font-mono`
- Syntax colors: `text-teal-300` for commands, `text-emerald-400` for keywords/success
- Check marks: `text-emerald-400`

### Step Cards (How It Works)

Three-column grid of `.card-glass` cards. Each has:
- Eyebrow in `text-teal-400/70` at `tracking-[0.25em]`
- Bold Inter title (`font-sans font-bold`)
- Optional inline code pill with `bg-surface-base/60`
- Ambient teal orb top-right corner via `bg-teal-500/[0.05] blur-2xl`

### Feature Cards

Six-column (3×2) grid. Last card uses `.border-gradient-accent` as a visual accent.



---



## 6. Do's and Don'ts



### Do:
- **Use Inter at font-black for all hero text.** This is non-negotiable for the liquid glass effect.
- **Layer glow orbs behind key sections.** They create the bioluminescent atmosphere.
- **Use `text-liquid-glass` for all display-size headings.** The gradient dissolve is the signature visual.
- **Use `text-teal-400` for all eyebrow labels.** Consistency is key.
- **Animate glow intensities on hover** with 200–300ms transitions.

### Don't:
- **Don't use Playfair Display or italic serif for main headings.** The new system is Inter-first.
- **Don't use violet/purple as primary accent.** Teal/cyan is the signal; violet appears only in gradient borders.
- **Don't use pure black (#000000).** Use `surface.base` (#060d1c).
- **Don't add opaque borders.** Use `border-white/[0.06]` maximum for card edges.
- **Don't crowd the layout.** Each section needs breathing room; use `pb-24` or `pb-28` between sections.



---



**Director's Final Note:** Every luminance source in this system should feel like it's *emitting* rather than *reflecting*. The teal glows should look like circuit traces or ocean bioluminescence — alive and precise. The liquid glass typography should feel like the text itself is made of light.

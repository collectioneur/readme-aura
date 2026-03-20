# Design System Document



## 1. Overview & Creative North Star: "The Luminous Architect"



This design system is built to elevate a technical utility into a premium editorial experience. Moving away from the cluttered, "boxy" nature of traditional developer tools, our Creative North Star is **"The Luminous Architect."**



This system treats the interface not as a flat grid, but as a three-dimensional environment where light, depth, and clarity coexist. We break the "template" look through intentional asymmetry, high-contrast typography scales, and a departure from structural lines. By using "aura-like" gradients and glassmorphism, we mirror the core function of the library: rendering beautiful, light-weight visual elements within a structured environment.



---



## 2. Colors & Surface Philosophy



The color strategy is anchored in deep indigos and vibrant violets, creating a high-contrast, "dark mode" default that feels sophisticated and professional.



### Surface Hierarchy & Nesting

We reject the concept of flat backgrounds. Depth is achieved by stacking the `surface-container` tiers to guide the eye toward information density:

- **Base Layer:** `surface` (#0f1419)

- **Secondary Sections:** `surface_container_low` (#171c22)

- **Nested Content/Cards:** `surface_container` (#1b2026) or `surface_container_high` (#252a30)

- **Focal Points/Code Blocks:** `surface_container_highest` (#30353b)



### The "No-Line" Rule

**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. A `surface_container_low` section sitting on a `surface` background provides enough contrast to be felt without being seen as a harsh "box."



### Signature Textures & Glassmorphism

To move beyond a generic "out-of-the-box" UI, utilize the **Glass & Gradient Rule**:

- **CTAs & Heroes:** Use subtle gradients transitioning from `primary` (#c0c1ff) to `primary_container` (#8083ff).

- **Floating Overlays:** Use semi-transparent versions of `surface_variant` with a 12px to 20px backdrop-blur to create a "frosted glass" effect. This ensures the vibrant mesh gradients in the background bleed through the UI, creating a sense of "soul" and integration.



---



## 3. Typography: Editorial Precision



The typography system balances the approachable clarity of **Inter** with the technical, developer-centric edge of **Space Grotesk**.



- **Display & Headlines (Inter):** Large-scale headers (e.g., `display-lg` at 3.5rem) should use tight letter-spacing and high contrast. This creates a "magazine" feel that commands attention.

- **Labels & Metadata (Space Grotesk):** Use `label-md` and `label-sm` for technical details, version numbers, and tag markers. This font’s geometric nature signals "code" and "innovation" without requiring a monospace block.

- **Body (Inter):** Optimized for readability at `body-md` (0.875rem) with a generous line-height to ensure documentation is scannable and professional.



---



## 4. Elevation & Depth: Tonal Layering


Traditional drop shadows are too heavy for a minimalist library. We use **Tonal Layering** to convey hierarchy.



- **The Layering Principle:** Instead of a shadow, place a `surface_container_lowest` card on a `surface_container_low` background to create a soft, natural "recessed" look.

- **Ambient Shadows:** For floating elements (like tooltips or dropdowns), use extra-diffused shadows (Blur: 32px, Y: 16px) at 6% opacity. The shadow color should be a tinted version of the `primary` token rather than black, mimicking the glow of an "aura."

- **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline_variant` token at **15% opacity**. Never use a 100% opaque border. This maintains the "luminous" quality of the system.



---



## 5. Components



### Buttons

- **Primary:** High-contrast `primary` background with `on_primary` text. Use `xl` (1.5rem) or `full` roundedness. Add a soft outer glow using a 10% opacity `surface_tint` shadow.

- **Secondary:** Use the `ghost-border` technique (outline-variant at 20%) with a subtle `surface_bright` hover state.

- **Tertiary:** Text-only, using the `primary` color token.



### Code Blocks (The Signature Component)

As a developer-focused library, code is the hero.

- **Style:** Use `surface_container_highest` background. No borders.

- **Spacing:** Use `spacing-6` (1.5rem) internal padding.

- **Typography:** Use `ui-monospace` for the code itself, ensuring high-contrast syntax highlighting against the dark background.



### Cards & Lists

- **Prohibition:** Divider lines are strictly forbidden.

- **Execution:** Separate list items using `spacing-4` (1rem) vertical gaps or by alternating between `surface_container` and `surface_container_low` background shades.

- **Corners:** Use `lg` (1rem) roundedness for large containers and `md` (0.75rem) for internal elements.



### Chips & Tags

- **Style:** Small, `label-sm` (Space Grotesk) text inside a `secondary_container` background.

- **Interaction:** Hovering should trigger a slight "lift" through a color shift to `secondary_fixed`.



---



## 6. Do’s and Don’ts



### Do:

- **Embrace White Space:** Use the `spacing-16` and `spacing-24` tokens to separate major sections. Let the UI breathe.

- **Use Color for Intent:** Use `tertiary` (#89ceff) for secondary actions that still need high visibility without competing with the main `primary` flow.

- **Animate Transitions:** Subtle 200ms fades for hover states to maintain the "aura" feel.



### Don't:

- **Don't use pure black (#000000):** Use `surface` or `surface_container_lowest` to keep the palette rich and deep.

- **Don't use default "Drop Shadows":** They break the glassmorphism effect. Use backdrop blurs and tonal shifts instead.

- **Don't crowd the layout:** If three elements feel tight, move to a vertical, asymmetrical stack. This system rewards "premium" spacing.

- **Don't use high-contrast dividers:** If you think you need a line, use a 1px gap of `surface` color between two `surface_container` blocks.



---

**Director's Final Note:** This design system is about the *absence* of noise. Every element should feel like it was placed with surgical precision. If an element doesn't serve a functional or atmospheric purpose, remove it. Allow the "aura" of the gradients to do the heavy lifting.
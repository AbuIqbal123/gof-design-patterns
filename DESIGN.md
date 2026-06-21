---
name: GoF Patterns
description: Visual learning platform for all 23 Gang of Four design patterns
colors:
  aqua-signal: "#22d3ee"
  violet-wire: "#a78bfa"
  signal-green: "#4ade80"
  ember: "#fb923c"
  deep-slate: "#0f0f12"
  graphite: "#18181c"
  warm-graphite: "#222228"
  steel-gray: "#2e2e35"
  fog-white: "#e8e8ed"
  silver-gray: "#9898a3"
  muted-iron: "#6b6b75"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.01em"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
  mono:
    fontFamily: "JetBrains Mono, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
components:
  button-primary:
    backgroundColor: "{colors.violet-wire}"
    textColor: "{colors.deep-slate}"
    rounded: "{rounded.sm}"
    padding: "12px 32px"
  button-secondary:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.fog-white}"
    rounded: "{rounded.sm}"
    padding: "12px 32px"
  card-pattern:
    backgroundColor: "{colors.graphite}"
    rounded: "{rounded.lg}"
    padding: "28px"
---

# Design System: GoF Patterns

## 1. Overview

**Creative North Star: "The Field Guide"**

A field guide works in two modes: quick identification in the wild and deep study back at the desk. The visual system serves both — scannable at speed, rewarding on sustained attention. Every pattern gets the same structural treatment so by pattern #3 you've learned the language; by pattern #23 you read it fluently.

The system is precise, calm, authoritative. It assumes the user is capable: explanations are thorough, never remedial. The dark surface recedes so the three category colors — Aqua Signal (creational), Violet Wire (structural), Signal Green (behavioral) — carry the only color on the page, and they carry it deliberately. Each appears in exactly four places: the icon block, the category label, the difficulty indicator, and the border glow on hover. Their rarity is the point.

This is not gamified, not SaaS, not terminal-native. No badges. No gradient CTAs. No green-on-black monospace walls. The reading experience has warmth and hierarchy; the dark background is chosen because code reads better on dark surfaces, not because "tools look cool dark."

**Key Characteristics:**
- Three category colors carry all semantic meaning; everything else is neutral
- Flat at rest, ambient glow on hover — depth is a response, not a default
- Inter for everything except code; JetBrains Mono for code blocks and rank badges
- Generous whitespace, restrained motion, purposeful color
- One structure repeated across 23 patterns so the system teaches itself

## 2. Colors

The palette has two layers: three semantic category colors and a neutral ramp from near-black Deep Slate to Fog White.

### Primary
- **Aqua Signal** (#22d3ee): Creational patterns. Appears on category icons, labels, difficulty stars, and the hover border of creational cards. High-chroma, precise — reads like a signal light, not decoration. Never used as a background fill above 10% opacity.

### Secondary
- **Violet Wire** (#a78bfa): Structural patterns. Softer than the aqua but equally deliberate. Used on structural badges, UML diagram labels, the primary CTA button, and focus rings. The only category color that can carry a solid button background — it has enough luminance contrast against Deep Slate.

### Tertiary
- **Signal Green** (#4ade80): Behavioral patterns. The largest category (11 patterns); green carries the longest sections without fatigue. Used on behavioral labels, checkmarks in "Use When" lists, and hover borders.

### Accent
- **Ember** (#fb923c): Warnings, common mistakes, "Don't Use When" markers. Rare — appears only where attention is needed. Warmer than the category colors so it reads as a different signal class.

### Neutral
- **Deep Slate** (#0f0f12): Page background. Near-black with subtle warmth — not cold-black, not warm-gray. Chosen so code blocks and diagrams read with maximum clarity.
- **Graphite** (#18181c): Card, section, and code-block surfaces. One step lighter than the page; enough to define containers without a border.
- **Warm Graphite** (#222228): Hover state for surfaces. The shift from Graphite (ΔL ≈ 4) is subtle but perceptible.
- **Steel Gray** (#2e2e35): Borders and dividers. Dark enough to read as structure; light enough to never dominate.
- **Fog White** (#e8e8ed): Primary text. Off-white, not pure white — easier on the eyes on dark backgrounds. 12.5:1 contrast against Deep Slate, exceeding WCAG AAA.
- **Silver Gray** (#9898a3): Secondary text and descriptions. 6.1:1 contrast against Deep Slate — meets AA for body text, appropriate for supporting copy.
- **Muted Iron** (#6b6b75): Tertiary text, placeholder labels, pattern counts. 4.0:1 against Deep Slate — borderline, used only for the least critical information (counts, timestamps, dimmed labels).

### Named Rules

**The Three-Color Rule.** Only Aqua Signal, Violet Wire, and Signal Green appear as colored elements on any page. Ember is reserved for warnings and errors. No other hues enter the palette. If a new category is added, it gets ONE hue; if a category is removed, that hue retires with it.

**The Ten-Percent Rule.** No category color occupies more than 10% of the visible surface at any scroll position. Their impact comes from scarcity — a single colored icon on an otherwise neutral card reads as loud as a full-bleed banner because nothing else competes.

**The Same-Four-Places Rule.** Each category color appears in exactly four locations on a pattern detail page: the icon block, the category label, the difficulty indicator, and the hover border. Consistency across 23 patterns makes the system learnable; deviation in one pattern breaks the contract.

## 3. Typography

**Display Font:** Inter (with system-ui, sans-serif fallback)
**Body Font:** Inter (with system-ui, sans-serif fallback)
**Mono Font:** JetBrains Mono (with Consolas, monospace fallback)

**Character:** Inter is a pragmatic grotesque — neutral enough to disappear, distinctive enough to carry weight at display sizes. JetBrains Mono provides clear code legibility with a slightly wider letterform than Consolas; its ligatures stay enabled for code rendering. The pairing is single-family-driven: Inter at multiple weights does all the hierarchical work; JetBrains Mono signals "this is code, not prose."

### Hierarchy
- **Display** (700, clamp(2.5rem, 5vw, 4.5rem), 1.1): Hero headings only. Capped at 4.5rem to avoid shouting. Letter-spacing at -0.02em — tight enough for presence, not so tight letters touch. Homepage hero and pattern detail H1.
- **Headline** (700, clamp(1.5rem, 3vw, 2.25rem), 1.2): Section headers. Body copy never exceeds 65 characters per line; headlines get the full measure.
- **Title** (600, 1.25rem, 1.3): Card titles, subsection headers, navigation labels. The workhorse heading weight.
- **Body** (400, 1rem, 1.7): All running text, descriptions, explanations. Line-height 1.7 on dark backgrounds gives enough breathing room for sustained reading. Letter-spacing 0.01em compensates for dark-mode light bleed.
- **Label** (500, 0.875rem, 1.4): Category badges, filter pills, difficulty labels, "Previous/Next" navigation. Not uppercase; the weight distinction from body is enough.
- **Mono** (400, 0.875rem, 1.6): Code blocks, inline code, rank badges (#1, #2...). JetBrains Mono at 0.875rem matches the visual weight of body Inter at 1rem.

### Named Rules

**The Single-Family Rule.** Inter is the only typeface for prose. No serif display pairing, no secondary sans. Weight (400/500/600/700) carries all hierarchy. JetBrains Mono is reserved for code and rank numbers — it never appears in body copy.

**The Code-Width Rule.** Code blocks are limited to 80 characters per line. The code font and container width are set together so no line wraps in a block that fits the viewport at 1024px+.

## 4. Elevation

Ambient depth. The system is flat at rest — cards and sections use borders and tonal shifts to define space, not shadows. Depth enters as a response: hover on a pattern card triggers a subtle category-colored glow (0 0 20px at 15% opacity) and a 2% scale lift. The navbar sits above content with a backdrop blur (backdrop-blur-sm), the only persistent z-axis treatment in the system.

The UML diagram canvas is the exception: it lives in its own elevated space with a distinct surface background, because dragging and zooming an interactive diagram needs a clear stage boundary.

### Shadow Vocabulary
- **Category glow** (`box-shadow: 0 0 20px rgba(color, 0.15)`): Applied on card hover only. Never present at rest. Each category color has its own glow — Aqua Signal for creational, Violet Wire for structural, Signal Green for behavioral.
- **Navbar backdrop** (`backdrop-filter: blur(8px); background: rgba(15, 15, 18, 0.8)`): Persistent. Gives the fixed navbar depth without a hard shadow, so the content beneath reads as behind frosted glass, not hidden.

### Named Rules

**The Flat-At-Rest Rule.** Cards, sections, and containers are flat at rest. Glows appear only as a response to hover. No element ships with a permanent shadow — if it looks like a 2014 card with a permanent drop shadow, the blur is too dark and too wide.

**The One-Elevated-Layer Rule.** Only the navbar uses persistent z-axis elevation. Everything else shares the page plane until hover. The UML canvas is the sole exception and it gets its own surface color, not a shadow.

## 5. Components

### Buttons

Precision instruments. Tight padding, clear color assignment, instant feedback.

- **Shape:** 8px radius (rounded-lg). Square enough to feel deliberate; round enough to not feel brittle.
- **Primary:** Violet Wire (#a78bfa) background, Deep Slate text, 12px 32px padding. The only solid-color button. High contrast against the dark page, reads as the primary action.
- **Secondary:** Graphite surface, Steel Gray border, Fog White text. The neutral alternative. Used for "Back to Home," "Browse Patterns" on 404, and cancel actions.
- **Hover:** Primary shifts to Violet Wire at 90% opacity (subtle darken). Secondary shifts border and text to brighter values. Transition: 150ms color and background only.
- **Focus-visible:** 2px Violet Wire outline, 2px offset. Consistent across all interactive elements.
- **Active / Pressed:** No scale transform on buttons — precision instruments don't squish. Color-only feedback.

### Filter Pills

- **Style:** Inline text buttons with no background at rest. Selected state adds Graphite background, Steel Gray border, and the category's color for text. 8px radius, 8px 16px padding.
- **Unselected:** Muted Iron text. Hover shifts to Silver Gray. No background.
- **Selected:** Category-colored text (Aqua Signal / Violet Wire / Signal Green), Graphite background, Steel Gray border. Reads as "active filter" without competing with content.

### Cards / Containers

Pattern cards are the system's signature container. Every pattern gets identical card structure — changing only the icon, category color, and content.

- **Corner Style:** 16px radius (rounded-2xl). Soft enough to distinguish from the sharper buttons and inputs; not so round it loses precision.
- **Background:** Graphite (#18181c) at rest. Border: Steel Gray (#2e2e35) at 100% opacity. No shadow.
- **Hover:** Border shifts to category color at 50% opacity. 2% scale lift (transform: scale(1.02)). Category-colored glow at 15% opacity. Transition: 300ms on border-color, box-shadow, transform.
- **Internal Padding:** 28px (p-7). Generous — the card feels like a defined space, not a tight wrapper.
- **Content structure (fixed):** Icon block (12×12, rounded-xl, category bg at 10%) → pattern name → category label → tagline → difficulty row. This structure never varies; only the values change.

### Code Blocks

- **Surface:** Graphite with a 16px-radius wrapper. Header bar (title + description) above the code area, separated by a 1px Steel Gray border.
- **Typography:** JetBrains Mono, 0.875rem, 1.6 line-height. Shiki syntax highlighting with the project's dark theme.
- **Container:** Full-width within the 4xl content column (max-width: 56rem). Horizontal scroll on overflow, never line-wrap.

### Navigation

- **Navbar:** Fixed top, 64px height, Deep Slate at 80% opacity with 8px backdrop blur. Bottom border: 1px Steel Gray.
- **Brand:** "GoF" in Fog White + "Patterns" in Violet Wire, Inter 700 at 1.25rem.
- **Nav links:** Silver Gray at rest, Fog White on active/hover. Active state adds 500 weight. No underline, no background shift — weight alone signals state.
- **Mobile:** Hamburger icon (Menu/X from Lucide), dropdown panel with Graphite background, full-width links with 16px vertical padding.

### UML Diagram Canvas

- **Surface:** Distinct from page — slightly darker, bordered, with a subtle inner vignette. The diagram lives in its own visual space.
- **Nodes:** Category-colored borders on Graphite backgrounds. Rounded-xl (12px). Method and attribute lists in JetBrains Mono.
- **Edges:** Category-colored with 30% opacity. Inheritance: solid line with hollow triangle. Implementation: dashed line with hollow triangle. Composition: solid line with filled diamond.
- **Interaction:** Drag to pan, scroll to zoom, click-and-drag to rearrange nodes. Cursor changes on interactive zones.

## 6. Do's and Don'ts

### Do:
- **Do** use the three category colors (Aqua Signal, Violet Wire, Signal Green) in exactly four places per pattern: icon block, category label, difficulty indicator, hover border.
- **Do** keep pattern card structure identical across all 23 patterns. The system teaches itself through repetition.
- **Do** use Graphite (#18181c) as the surface for all cards, code blocks, and sections. One surface color, consistent everywhere.
- **Do** limit body text to 65–75 characters per line. Dark backgrounds need tighter measures than light ones for sustained reading.
- **Do** pair every interactive element with a visible focus ring (2px Violet Wire, 2px offset). Focus management is explicit and predictable.
- **Do** respect reduced motion: all animations degrade to crossfade or instant transition under `prefers-reduced-motion: reduce`.
- **Do** use border + tonal shift for depth at rest. Shadows and glows are hover-only responses.
- **Do** use Inter weight (400/500/600/700) as the sole typographic hierarchy mechanism. Never add color or size where weight alone works.

### Don't:
- **Don't** introduce new hues. The four named colors (Aqua Signal, Violet Wire, Signal Green, Ember) are the complete palette. No teal, no pink, no yellow.
- **Don't** use gradient text. The hero "Gang of Four" gradient is the single exception — it spans all three category colors as a deliberate signature. No other text gets gradient treatment.
- **Don't** add gamification elements: no badges, XP, streaks, progress bars, confetti, or "level up" language. The product is the learning, not the meta-game.
- **Don't** use shadows at rest. If a card has a permanent drop shadow, it's wrong. Depth is earned through interaction.
- **Don't** use border-left or border-right greater than 1px as colored accent stripes on cards or callouts.
- **Don't** apply border-radius above 16px to cards or sections. Buttons top out at 8px. Tags and filter pills at 8px.
- **Don't** use glassmorphism beyond the navbar's functional backdrop blur. Decorative blur on cards or sections is prohibited.
- **Don't** ship "coming soon" as a primary content strategy. The "more patterns coming soon" notice is a temporary placeholder, not a design pattern.
- **Don't** let any single category color occupy more than 10% of the visible surface. If the page reads as "the cyan page" rather than "the neutral page with cyan signals," the color is too heavy.
- **Don't** add enterprise/tutorial aesthetic: no Oracle-style boxes-and-arrows, no 2000s beige backgrounds, no Comic Sans code blocks.

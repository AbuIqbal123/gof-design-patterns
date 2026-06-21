---
target: src/app/patterns/page.tsx
total_score: 22
p0_count: 0
p1_count: 2
timestamp: 2026-06-21T18-46-11Z
slug: src-app-patterns-page-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No visited/read state on pattern cards; no scroll-position feedback on long detail pages |
| 2 | Match Between System and Real World | 4 | Domain-perfect - GoF terminology, difficulty stars, metaphors, UML conventions |
| 3 | User Control and Freedom | 2 | Back links exist but zero intra-page navigation on 300-line detail pages |
| 4 | Consistency and Standards | 3 | Same-Four-Places Rule mostly holds; Intent section diverges from container pattern; text-muted value differs between globals.css and tailwind config |
| 5 | Error Prevention | 1 | Invalid slug -> default Next.js 404; related-pattern links use raw slugs with no validation |
| 6 | Recognition Rather Than Recall | 3 | Redundant cues work; gap: no search, no autocomplete on a 23-item reference |
| 7 | Flexibility and Efficiency | 1 | Zero keyboard shortcuts, no cmd+k, no section-jump, no progress persistence |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained palette; "coming soon" banner is the only decorative intrusion |
| 9 | Error Recovery | 1 | Only error path is default Next.js 404 with no recovery |
| 10 | Help and Documentation | 2 | Content educates but platform offers no meta-help |
| **Total** | | **22/40** | **Acceptable** |

## Anti-Patterns Verdict

This interface largely escapes AI-slop tells. The committed DESIGN.md with named rules was actually followed in code.

**LLM assessment:** The identical card grid is DESIGN.md-justified (field-guide repetition). The "more patterns coming soon" banner is the only element that reads as half-built. Clean passes on all other bans: no gradient text beyond the DESIGN.md exception, no glassmorphism beyond navbar, no side-stripe borders, no tracked eyebrows, no over-rounding.

**Deterministic scan** (6 hits, 2 false positives, 1 real):
- `overused-font` (Inter): false positive - DESIGN.md's explicit Single-Family choice
- `design-system-radius` (4px scrollbar): real - outside documented rounded scale
- `design-system-color` (#fff x3 in mask primitives): false positive - CSS mask values, not paint tokens
- `gradient-text` (hero): token false positive - DESIGN.md explicitly permits as sole exception

The detector found zero issues in React component files but missed the text-muted contrast gap (~3.8:1, below AA minimum). No browser visualization available.

## Overall Impression

The design system is unusually disciplined for an early-stage project. The three-color strategy executed at exactly four locations per pattern is rare and well-done. But the UX for returning users is underbuilt - a reference tool without search, without intra-page navigation, and without progress tracking leaves its most important use case (quick lookup during work) unsupported.

## What's Working

1. **Color-system discipline.** Three colors, four places per pattern, never decorative. A user learns the visual language by pattern #3.
2. **The metaphor section as a pedagogical bridge.** Converts abstract GoF language into concrete mental models - the best execution of "Show, then tell."
3. **Progressive depth from card to detail.** Serves both the student (reads everything) and the developer (scrolls to "Use When" and leaves).

## Priority Issues

### [P1] No search on a reference tool with 23 items
A working developer who needs "Decorator" right now must visually scan 7 structural cards. A student who heard about "Singleton" but doesn't know it's creational must scan all 23. 10-15 seconds wasted per lookup.
**Fix:** Add a text input above the filter pills that filters cards in real-time by name and tagline. Add cmd+k command palette for power users.
**Suggested:** $impeccable shape search-patterns

### [P1] No intra-page navigation on detail pages
Detail pages have 7 major sections across 300+ lines of JSX with no sticky TOC, skip links, or section-jump. A developer scrolling to "Common Mistakes" then wanting "The Problem" must manually scroll back through UML, code, and usage guidance.
**Fix:** Sticky right-side mini-TOC on desktop with section anchors that highlight current scroll position. Mobile: "Jump to" select at the top.
**Suggested:** $impeccable layout pattern-detail

### [P2] No visited/read state on pattern cards
After reading 4 patterns, users rely on memory alone to track progress. Both personas need to know what they've covered. A visited indicator is not gamification.
**Fix:** Subtle check icon in card corner after visit, or slightly dimmed background for visited patterns.
**Suggested:** $impeccable delight pattern-cards

### [P2] text-muted contrast fails WCAG AA body text
#6b6b75 on #0f0f12 = ~3.8:1. WCAG AA requires >=4.5:1. Pattern counts, difficulty labels, UML hints, prev/next subtitles all use this at 12-14px. For a project targeting AAA, this is a showstopper on all tertiary text.
**Fix:** Increase text-muted lightness to at least #8c8c98 (4.5:1) or #a0a0aa (5.4:1). Resolve globals.css/tailwind config mismatch.
**Suggested:** $impeccable audit text-muted-contrast

### [P3] UML diagram has no keyboard-accessible alternative
PRODUCT.md promises keyboard-accessible alternatives for all interactive visualizations. The UML diagram is mouse/touch-only with no ARIA, no keyboard controls, no structured data table fallback.
**Fix:** Keyboard controls, "View as table" toggle with structured HTML and ARIA labels.
**Suggested:** $impeccable harden uml-diagram

## Persona Red Flags

### Alex (Power User)
- No cmd+k/search to jump to a pattern. Must visually scan or filter.
- Detail page is a scroll wall. 3-5 seconds of friction per lookup.
- No comparison mode. Must open 2+ tabs.

### Jordan (First-Timer)
- No suggested starting point on the flat 23-card grid.
- UML interaction hint easily missed in muted text.
- Java-only code creates exclusion for non-Java learners.

### Sam (Accessibility)
- UML diagram: zero keyboard alternative. PRODUCT.md promise broken.
- Difficulty stars: raw Unicode with no aria-label. Screen reader reads "star star star."
- text-muted contrast: ~3.8:1, below AA minimum.
- Filter state distinguished primarily by color shift.

## Minor Observations

- text-muted value mismatch between globals.css (#94949e) and tailwind config (#6b6b75)
- max-w-2xl on listing page is not a standard Tailwind class
- Intent section breaks the universal container pattern without documentation
- Related pattern display names use inline slug.split() rather than data lookups
- No text-wrap: balance on pattern name headings
- hover:shadow-lg has 15px blur, borderline ghost-card pattern with border

## Questions to Consider

1. What if the listing page started with a guided "What problem are you solving?" flow instead of a flat card grid?
2. Does every pattern need its own page, or would a searchable single-page view serve reference users better?

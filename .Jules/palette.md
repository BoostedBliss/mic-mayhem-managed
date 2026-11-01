## 2026-11-01 - Range Input Accessibility
**Learning:** Custom-styled range inputs (`<input type="range">`) easily lose focus visibility and semantic context. Using `accent-color` doesn't automatically handle focus outlines, and the surrounding visual text labels aren't automatically associated with the input by screen readers.
**Action:** Always manually ensure range inputs have an `aria-label` (or `aria-labelledby`) and explicit `focus-visible` utility classes (like `focus-visible:ring-2`) for keyboard navigability, especially in dark mode.

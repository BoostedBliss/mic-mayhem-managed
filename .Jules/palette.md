## 2024-03-24 - Avoid Nested Interactive Elements
**Learning:** Using a clickable `div` wrapper with a nested empty `<button>` for icons is an accessibility anti-pattern. It creates confusing interaction models for screen reader users and keyboard navigation.
**Action:** Always use a single, semantic `<button role="checkbox">` (or appropriate role) for the entire clickable area, manage state with `aria-checked`, use `focus-visible` for keyboard focus styles, and mark purely presentational icons with `aria-hidden="true"`.

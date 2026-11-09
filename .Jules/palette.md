
## 2026-11-04 - [Checklist Accessibility]
**Learning:** Avoid nested interactive elements (e.g., button inside a div wrapper with an onClick handler). Screen readers and keyboard navigation struggle with this pattern. Instead, use a semantic button for the full-card click target.
**Action:** Always wrap the entire interactive card/item in a semantic button, change the inner checkmark icon to a decorative div with aria-hidden, and use aria-pressed for states like checked/unchecked.

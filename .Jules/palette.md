
## 2026-11-04 - [Checklist Accessibility]
**Learning:** Avoid nested interactive elements (e.g., button inside a div wrapper with an onClick handler). Screen readers and keyboard navigation struggle with this pattern. Instead, use a semantic button for the full-card click target.
**Action:** Always wrap the entire interactive card/item in a semantic button, change the inner checkmark icon to a decorative div with aria-hidden, and use aria-pressed for states like checked/unchecked.
## 2024-05-18 - Missing focus indicators on interactive tabs
**Learning:** Primary navigation tabs used as buttons did not have visible focus indicators by default, making keyboard navigation extremely confusing since users couldn't tell which tab was focused before pressing enter/space.
**Action:** Always ensure that interactive elements (especially custom styled buttons or tabs) include explicit `focus-visible:` utility classes to provide clear visual feedback for keyboard users.

## 2023-10-25 - Proper Form Labels for Range Inputs
**Learning:** Range inputs without explicitly associated labels (using `htmlFor`) are difficult for screen readers to interpret and prevent users from clicking the text to focus the slider.
**Action:** Always use `<label htmlFor="inputId">` instead of `<span>` for input descriptions to improve both a11y and click targets.
## 2025-05-18 - Semantic Buttons for Interactive Cards
**Learning:** Found a pattern of using `div` elements with `onClick` handlers to act as interactive list items/cards (e.g., in `DiscordChecklist.tsx`). This breaks keyboard accessibility as `div` elements do not natively support focus or space/enter key interaction.
**Action:** Always refactor interactive `div` elements into semantic `<button type="button">` wrappers to ensure full keyboard navigation, proper ARIA roles, and native accessibility support.

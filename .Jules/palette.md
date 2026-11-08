## 2025-05-18 - Semantic Buttons for Interactive Cards
**Learning:** Found a pattern of using `div` elements with `onClick` handlers to act as interactive list items/cards (e.g., in `DiscordChecklist.tsx`). This breaks keyboard accessibility as `div` elements do not natively support focus or space/enter key interaction.
**Action:** Always refactor interactive `div` elements into semantic `<button type="button">` wrappers to ensure full keyboard navigation, proper ARIA roles, and native accessibility support.

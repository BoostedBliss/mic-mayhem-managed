## 2024-11-06 - [Button Defaults]
**Learning:** Found that refactoring accessibility `div`s to `<button>`s requires explicitly setting `type="button"` to avoid default form submission behaviors in React, and that keeping PR size constraints small means intentionally reverting lockfile updates (like `pnpm-lock.yaml`) during purely UX tasks.
**Action:** Always add `type="button"` when creating semantic buttons, and explicitly discard lockfile changes when acting as Palette to adhere to the 50-line PR limit.

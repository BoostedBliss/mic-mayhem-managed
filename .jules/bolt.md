## 2025-02-20 - React State Updates in requestAnimationFrame
**Learning:** Calling React state setters (like `setMetrics`) directly inside a `requestAnimationFrame` loop forces the component to re-render at 60 FPS. This causes unnecessary main-thread CPU load, especially if the state only updates text metrics.
**Action:** Throttle React state updates inside animation loops to a lower frequency (e.g., 10 FPS or 100ms) using the timestamp provided by `requestAnimationFrame`, while allowing canvas drawing or other pure visual updates to continue at 60 FPS using fresh data.

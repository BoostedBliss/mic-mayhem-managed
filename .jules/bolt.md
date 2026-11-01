## 2025-02-27 - Throttle React state updates in requestAnimationFrame loop
**Learning:** Updating React state directly inside a 60fps `requestAnimationFrame` loop (e.g. for canvas rendering) causes excessive re-renders and CPU overhead.
**Action:** Throttle the React state updates to a lower framerate (e.g. ~15fps/66ms) while keeping the canvas rendering at 60fps, by tracking the last update time with a `useRef`.

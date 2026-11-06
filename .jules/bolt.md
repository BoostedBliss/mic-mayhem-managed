## 2025-02-28 - Throttling React State Updates in requestAnimationFrame
**Learning:** Mixing high-frequency canvas drawing (requestAnimationFrame) with React state updates causes excessive full-component re-renders, severely degrading performance.
**Action:** Always decouple visual canvas updates from React state updates. Throttle React `setState` calls (e.g., using a timestamp closure inside the RAF loop) to ~10fps to prevent excessive re-renders while allowing the canvas to continue drawing at a full 60 FPS.

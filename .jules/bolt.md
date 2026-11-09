## 2026-11-05 - Throttling React State in RAF Canvas Loops
**Learning:** When a component mixes high-frequency canvas drawing (60 FPS via `requestAnimationFrame`) with React state updates (like updating text metrics), updating React state on every frame causes massive unnecessary re-renders of the entire component tree.
**Action:** Always decouple visual canvas updates from React state updates in RAF loops. Throttle React `setState` calls (e.g., to 10 FPS) using a timestamp closure while allowing canvas contexts to continue drawing at full frame rate.

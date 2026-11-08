## 2024-05-15 - Decouple Canvas from React State Updates
**Learning:** Calling setState inside a requestAnimationFrame loop forces the entire React component to re-render 60 times a second, which causes significant CPU overhead.
**Action:** Always decouple visual canvas updates from React state updates. Throttle React setState calls (using a timestamp closure) while letting the canvas continue drawing at a full 60 FPS.

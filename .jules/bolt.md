## 2024-05-18 - React state updates inside requestAnimationFrame loops

**Learning:** When using `requestAnimationFrame` for canvas updates, also triggering a React state update (`setMetrics`) every frame causes the entire component tree to re-render at 60fps. This leads to extremely high CPU usage and sluggishness, even if the state change is small, because React's reconciliation process runs 60 times a second.
**Action:** Always decouple visual canvas updates from React state updates. If state must be updated during a `requestAnimationFrame` loop, throttle the state update (e.g., to 10fps using `time - lastStateUpdate > 100`) while letting the canvas render at full 60fps.

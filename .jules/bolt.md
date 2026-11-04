## 2024-11-04 - React state updates in requestAnimationFrame loops
**Learning:** State updates (`setMetrics`) inside a `requestAnimationFrame` loop cause React to re-render the component at 60fps, severely degrading performance.
**Action:** Decouple React state updates from canvas drawing updates in `requestAnimationFrame` by throttling the state update (e.g. tracking `timestamp` against a `useRef`). Canvas can remain 60fps while state updates are limited to 10fps.

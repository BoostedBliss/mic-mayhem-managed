## 2025-03-01 - Missing Label Associations
**Learning:** Found several visual labels (using `<span>` or `<label>` without `htmlFor`) in form-like interactive components (`AudioStressTest.tsx`, `HardwareWizard.tsx`), which degrades screen reader accessibility and prevents click-to-focus on small form controls like ranges and select inputs.
**Action:** Ensure all inputs, select boxes, and textareas have semantically associated labels (`htmlFor`) to enhance a11y and expand click areas.

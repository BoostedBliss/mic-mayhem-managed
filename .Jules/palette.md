## 2023-10-25 - Proper Form Labels for Range Inputs
**Learning:** Range inputs without explicitly associated labels (using `htmlFor`) are difficult for screen readers to interpret and prevent users from clicking the text to focus the slider.
**Action:** Always use `<label htmlFor="inputId">` instead of `<span>` for input descriptions to improve both a11y and click targets.

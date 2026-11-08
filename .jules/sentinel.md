## 2026-10-31 - [Secure Error Logging in Frontend]
 **Vulnerability:** [Leaking stack traces and internal error objects in frontend console logs]
 **Learning:** [Raw error objects were being logged directly to console.warn without sanitization, potentially exposing application internals in production]
 **Prevention:** [Always sanitize and cast errors before logging to console in frontend applications, e.g. using `err instanceof Error ? err.message : 'Unknown error'`]
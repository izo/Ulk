---
title: Rule Title Here
category: security | architecture | quality | performance | a11y | tests | docs
impact: CRITICAL | HIGH | MEDIUM | LOW
impactDescription: Optional description (e.g., "data breach risk", "2-10x improvement")
tags: tag1, tag2, tag3
---

## Rule Title Here

**Impact: [LEVEL] ([optional description])**

Brief explanation of the rule and why it matters. This should be clear and concise, explaining the security, performance, or quality implications.

**Incorrect (description of what's wrong):**

```typescript
// Bad code example here
// Explain why this is problematic
const bad = example()
```

**Correct (description of what's right):**

```typescript
// Good code example here
// Explain why this is the correct approach
const good = example()
```

**Detection:**

How to detect this issue:
- Grep pattern: `grep -rn "pattern" src/`
- Tool: eslint-rule-name, semgrep, etc.
- Manual: what to look for

**References:**
- [Link to documentation](https://example.com)
- [OWASP reference](https://owasp.org/...)

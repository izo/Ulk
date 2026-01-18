---
title: Secrets Exposed in Code
category: security
impact: CRITICAL
impactDescription: Immediate data breach risk
tags: secrets, credentials, api-keys, owasp
---

## Secrets Exposed in Code

**Impact: CRITICAL (Immediate data breach risk)**

Hardcoded secrets (API keys, passwords, tokens) in source code can be extracted from version control history, exposed in builds, or leaked through public repositories.

**Incorrect (hardcoded credentials):**

```typescript
// API key directly in code
const API_KEY = "sk_live_1234567890abcdef"

// Password in configuration
const dbConfig = {
  host: "localhost",
  password: "admin123"
}

// Token in header
fetch(url, {
  headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs..." }
})
```

**Correct (environment variables):**

```typescript
// API key from environment
const API_KEY = process.env.API_KEY

// Configuration from environment
const dbConfig = {
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD
}

// Token from secure storage
const token = await getSecureToken()
fetch(url, {
  headers: { "Authorization": `Bearer ${token}` }
})
```

**Detection:**

```bash
# Grep patterns
grep -rn "password\|secret\|api_key\|apikey\|token" src/ --include="*.ts" --include="*.js"
grep -rn "sk_live\|pk_live\|Bearer " src/

# Check for .env in git
git ls-files | grep -E "\.env$|\.env\."

# Tools
# - git-secrets
# - truffleHog
# - detect-secrets
```

**Remediation:**
1. Remove secrets from code immediately
2. Rotate all exposed credentials
3. Add `.env` to `.gitignore`
4. Use environment variables or secret managers
5. Audit git history with `git-filter-repo` if needed

**References:**
- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [12 Factor App - Config](https://12factor.net/config)

# Sections

This file defines all audit rule categories, their ordering, impact levels, and descriptions.
The section ID (prefix) is used to group rules by category.

---

## 1. Security (sec)

**Impact:** CRITICAL
**Description:** Security vulnerabilities that could lead to data breaches, unauthorized access, or system compromise. These must be fixed immediately.

**Examples:**
- Secrets in code
- SQL/NoSQL injection
- XSS vulnerabilities
- Insecure authentication
- Missing authorization checks

---

## 2. Architecture (arch)

**Impact:** CRITICAL
**Description:** Fundamental architecture issues that affect scalability, maintainability, and system reliability. Addressing these early prevents costly rewrites.

**Examples:**
- God classes/files
- Circular dependencies
- Layer violations
- Missing abstractions
- Tight coupling

---

## 3. Performance (perf)

**Impact:** HIGH
**Description:** Performance issues that degrade user experience, increase costs, or cause system instability under load.

**Examples:**
- N+1 queries
- Missing indexes
- Memory leaks
- Unoptimized bundles
- Blocking operations

---

## 4. Quality (qual)

**Impact:** HIGH
**Description:** Code quality issues affecting maintainability, readability, and developer experience.

**Examples:**
- High cyclomatic complexity
- Poor naming conventions
- Excessive duplication
- Missing error handling
- Magic numbers/strings

---

## 5. Tests (test)

**Impact:** MEDIUM
**Description:** Testing gaps that increase risk of regressions and reduce confidence in changes.

**Examples:**
- Missing unit tests
- No integration tests
- Flaky tests
- Low coverage
- Tests without assertions

---

## 6. Accessibility (a11y)

**Impact:** MEDIUM
**Description:** Accessibility issues that prevent users with disabilities from using the application. May also have legal implications.

**Examples:**
- Missing alt text
- Poor color contrast
- Keyboard navigation issues
- Missing ARIA labels
- Focus management problems

---

## 7. Documentation (doc)

**Impact:** LOW
**Description:** Documentation gaps that slow down onboarding and increase knowledge silos.

**Examples:**
- Missing README
- Outdated API docs
- No architecture docs
- Missing JSDoc/TSDoc
- Incomplete CHANGELOG

---

## 8. Style (style)

**Impact:** LOW
**Description:** Style inconsistencies that reduce code readability but don't affect functionality.

**Examples:**
- Inconsistent formatting
- Mixed naming conventions
- Inconsistent file structure
- Missing linter rules

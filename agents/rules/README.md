# Audit Rules

This directory contains detailed rule definitions for the code-auditor and other auditing agents. Rules follow a standardized format inspired by [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills).

## Structure

```
rules/
├── _template.md          # Template for creating new rules
├── _sections.md          # Category definitions with impact levels
├── sec-*.md              # Security rules (CRITICAL)
├── arch-*.md             # Architecture rules (CRITICAL)
├── perf-*.md             # Performance rules (HIGH)
├── qual-*.md             # Quality rules (HIGH)
├── test-*.md             # Test coverage rules (MEDIUM)
├── a11y-*.md             # Accessibility rules (MEDIUM)
├── doc-*.md              # Documentation rules (LOW)
└── style-*.md            # Style rules (LOW)
```

## Rule Categories by Priority

| Priority | Prefix | Impact | Description |
|----------|--------|--------|-------------|
| 1 | `sec-` | CRITICAL | Security vulnerabilities |
| 2 | `arch-` | CRITICAL | Architecture issues |
| 3 | `perf-` | HIGH | Performance bottlenecks |
| 4 | `qual-` | HIGH | Code quality issues |
| 5 | `test-` | MEDIUM | Testing gaps |
| 6 | `a11y-` | MEDIUM | Accessibility violations |
| 7 | `doc-` | LOW | Documentation gaps |
| 8 | `style-` | LOW | Style inconsistencies |

## Creating New Rules

1. Copy `_template.md` to `{category}-{rule-name}.md`
2. Fill in the frontmatter (title, category, impact, tags)
3. Provide clear incorrect/correct code examples
4. Include detection methods (grep patterns, tools)
5. Add references to documentation

## Usage

Rules are referenced from agent files using progressive disclosure:

```markdown
**Detailed rules:** See `rules/sec-secrets-exposed.md` for in-depth explanation.
```

This keeps the main agent file under 500 lines while providing comprehensive documentation on demand.

## Credits

This rules system is inspired by the **[vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)** repository, specifically:

- Rule template structure with frontmatter (title, impact, tags)
- Category organization with impact levels (CRITICAL → LOW)
- Progressive disclosure pattern for context efficiency
- Before/After code examples format

See also: [AGENTS.md](../../AGENTS.md) for complete skill conventions.

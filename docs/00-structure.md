# Structure /docs - Convention ulk

Tous les agents qui génèrent des rapports DOIVENT écrire dans `/docs` selon cette structure.

## Arborescence

```
docs/
├── 00-structure.md          # Ce fichier (convention)
│
├── audits/                   # Tous les rapports d'audit
│   ├── audit-code-YYYYMMDD.md
│   ├── audit-perf-YYYYMMDD.md
│   ├── audit-a11y-YYYYMMDD.md
│   ├── audit-shadcn-YYYYMMDD.md
│   ├── audit-frontend-YYYYMMDD.md
│   └── audit-landing-YYYYMMDD.md
│
├── reports/                  # Rapports d'orchestrateurs
│   ├── legacy-revival-YYYYMMDD.md
│   ├── pre-release-YYYYMMDD.md
│   └── simplifier-YYYYMMDD.md
│
├── imports/                  # Imports externes (Notion, etc.)
│   ├── spec_notion.md
│   ├── todo_notion.md
│   ├── spec_landing.md
│   └── todo_landing.md
│
└── communications/           # Sorties de brigitte
    └── update-YYYYMMDD.md
```

## Convention de nommage

| Type | Pattern | Exemple |
|------|---------|---------|
| Audit | `audit-{type}-YYYYMMDD.md` | `audit-code-20260126.md` |
| Report | `{type}-YYYYMMDD.md` | `pre-release-20260126.md` |
| Import | `{type}_{source}.md` | `spec_notion.md` |
| Communication | `update-YYYYMMDD.md` | `update-20260126.md` |

## Agents concernés

| Agent | Output | Dossier |
|-------|--------|---------|
| 05-code-auditor | audit-code-*.md | `docs/audits/` |
| 06-a11y-auditor | audit-a11y-*.md | `docs/audits/` |
| 07-perf-auditor | audit-perf-*.md | `docs/audits/` |
| 16-frontend-qa | audit-frontend-*.md | `docs/audits/` |
| 17-code-simplifier | simplifier-*.md | `docs/reports/` |
| 18-audit-complet | (via sous-agents) | `docs/audits/` |
| 19-legacy-revival | legacy-revival-*.md | `docs/reports/` |
| 20-pre-release | pre-release-*.md | `docs/reports/` |
| 21-notion-importer | spec_notion.md, todo_notion.md | `docs/imports/` |
| 22-landing-page-auditor | audit-landing-*.md, spec_landing.md | `docs/audits/`, `docs/imports/` |
| 23-shadcn-auditor | audit-shadcn-*.md | `docs/audits/` |
| 24-brigitte | update-*.md | `docs/communications/` |

## Règle absolue

**JAMAIS** de rapport à la racine du projet. Tous les outputs vont dans `/docs`.

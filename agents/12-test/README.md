# Test Agents

Agents d'automatisation des tests (unitaires, E2E, intégration, performance).

---

## 🎯 Mission

Ces agents automatisent la création, configuration et exécution de tests pour assurer la qualité et la fiabilité des applications.

---

## 🧪 Agents Disponibles

### test-unit (`unit.md`)
**Framework** : Jest, Vitest

**Focus** :
- Configuration framework de test
- Génération tests unitaires (fonctions, composants, hooks)
- Coverage reports avec seuils
- CI/CD integration

**Frameworks supportés** :
- React (Jest + Testing Library)
- Vue (Vitest + Vue Test Utils)
- Node.js utilities
- TypeScript

**Usage** :
```
"Configure Jest pour ce projet React"
"Génère des tests unitaires pour mes composants"
"Setup coverage avec seuil 80%"
```

---

### test-e2e (`e2e.md`)
**Framework** : Playwright, Cypress

**Focus** :
- Configuration Playwright/Cypress
- Tests end-to-end automatisés
- Multi-browser testing (Chrome, Firefox, Safari, Mobile)
- Screenshots et vidéos sur échec
- CI/CD integration

**Cas d'usage** :
- User flows critiques (auth, checkout, formulaires)
- Navigation et routing
- Tests cross-browser
- Tests mobile responsive

**Usage** :
```
"Setup Playwright pour tester le flow d'authentification"
"Crée des tests E2E avec Cypress"
"Configure tests multi-browser"
```

---

## 🔄 Workflows d'Utilisation

### Workflow 1 : Setup Tests Complet

```
"Setup testing complet pour ce projet"
→ test-unit configure Jest/Vitest
→ test-e2e configure Playwright/Cypress
→ Génère tests de base
→ Configure CI/CD
```

---

### Workflow 2 : TDD Nouveau Feature

```
01-spec-writer (spécifier feature)
    ↓
test-unit (écrire tests)
    ↓
04-task-runner (implémenter feature)
    ↓
test-unit + test-e2e (valider)
```

**Commande** :
```
"Feature login : spec → tests → implémentation"
```

---

### Workflow 3 : Audit Qualité

```
test-unit (coverage report)
    ↓
test-e2e (user flows critiques)
    ↓
05-code-auditor (analyse statique)
```

**Use case** : Avant release, vérifier couverture et qualité

---

### Workflow 4 : CI/CD Integration

```
12-test/unit + 12-test/e2e génèrent workflows GitHub Actions
    ↓
.github/workflows/test.yml
    ↓
Tests automatiques sur chaque PR
```

---

## 📊 Comparaison des Frameworks

### Tests Unitaires

| Framework | Best For | Speed | Watch Mode | Coverage | TypeScript |
|-----------|----------|-------|------------|----------|------------|
| **Jest** | React, Node.js | ⚡⚡ Rapide | ✅ | ✅ Built-in | ✅ |
| **Vitest** | Vite, Vue, Nuxt | ⚡⚡⚡ Très rapide | ✅ | ✅ v8 | ✅ Native |

**Recommandation** :
- **Vitest** pour projets Vite (Nuxt, Vue, Astro)
- **Jest** pour projets Webpack (Create React App, Next.js)

### Tests E2E

| Framework | Best For | Speed | Debug | Multi-browser | Mobile |
|-----------|----------|-------|-------|---------------|--------|
| **Playwright** | Moderne, robuste | ⚡⚡⚡ | ✅ UI Mode | ✅ Chrome, FF, Safari, Edge | ✅ |
| **Cypress** | DX, facilité | ⚡⚡ | ✅ Time-travel | ⚠️ Chrome, FF, Edge | ❌ |

**Recommandation** :
- **Playwright** pour nouveaux projets (multi-browser, mobile, plus rapide)
- **Cypress** pour projets legacy ou équipes Cypress

---

## 🎯 Pyramide de Tests

```
        /\
       /  \  E2E Tests (test-e2e)
      /____\  ~10% des tests - User flows critiques
     /      \
    / Intég. \ Integration Tests
   /__________\  ~20% des tests - Modules ensemble
  /            \
 /  Unitaires   \ Unit Tests (test-unit)
/________________\ ~70% des tests - Fonctions, composants
```

**Principe** :
- **70% unitaires** : Rapides, isolés, nombreux
- **20% intégration** : Modules ensemble, API calls
- **10% E2E** : User flows critiques uniquement

---

## 💡 Bonnes Pratiques

### 1. Coverage Goals

```javascript
// jest.config.js / vitest.config.ts
coverageThresholds: {
  global: {
    statements: 80,
    branches: 75,
    functions: 85,
    lines: 80
  }
}
```

**Targets** :
- **Statements** : 80%+
- **Branches** : 75%+
- **Functions** : 85%+
- **Lines** : 80%+

### 2. Test Organization

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx        # Co-located
├── utils/
│   ├── formatDate.ts
│   └── formatDate.test.ts
└── __tests__/                 # Ou dossier centralisé
    └── integration/
```

### 3. Naming Conventions

```typescript
// ✅ Descriptif
describe('Button component', () => {
  it('should call onClick when clicked', () => {})
  it('should be disabled when disabled prop is true', () => {})
})

// ❌ Vague
describe('Button', () => {
  it('works', () => {})
})
```

### 4. AAA Pattern (Arrange-Act-Assert)

```typescript
test('formatDate formats correctly', () => {
  // Arrange
  const date = new Date('2024-01-15')

  // Act
  const result = formatDate(date)

  // Assert
  expect(result).toBe('15/01/2024')
})
```

### 5. Mock Strategically

```typescript
// ✅ Mock external dependencies
jest.mock('./api', () => ({
  fetchUser: jest.fn().mockResolvedValue({ id: 1 })
}))

// ❌ Don't mock what you're testing
jest.mock('./Button') // Testing Button, don't mock it!
```

---

## 🔧 Configuration Commune

### package.json Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:unit": "vitest run",
    "test:watch": "vitest watch",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug"
  }
}
```

### CI/CD GitHub Actions

```yaml
name: Tests

on: [push, pull_request]

jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 🚀 Quick Start

**1. Setup tests nouveau projet :**
```
"Configure Jest et Playwright pour ce projet Next.js"
→ test-unit configure Jest + Testing Library
→ test-e2e configure Playwright
→ Génère tests de base
→ Configure GitHub Actions
```

**2. Générer tests pour feature :**
```
"Génère des tests pour le composant LoginForm"
→ test-unit crée LoginForm.test.tsx
→ Tests : render, validation, submit, erreurs
```

**3. Tests E2E pour user flow :**
```
"Crée des tests E2E pour le flow de checkout"
→ test-e2e génère checkout.spec.ts
→ Tests : panier → shipping → paiement → confirmation
```

---

## 📈 Coverage Analysis

### Interpréter les Rapports

```
File                | % Stmts | % Branch | % Funcs | % Lines
--------------------|---------|----------|---------|--------
All files           |   85.2  |   78.3   |   90.1  |   84.8
 components/        |   92.5  |   87.1   |   95.0  |   91.8
  Button.tsx        |   100   |   100    |   100   |   100   ✅
  Card.tsx          |   85.7  |   75.0   |   90.0  |   84.2   ⚠️
 utils/             |   78.4  |   70.2   |   85.5  |   77.9   ⚠️
  formatDate.ts     |   100   |   100    |   100   |   100   ✅
  api.ts            |   65.3  |   50.0   |   75.0  |   64.1   ❌
```

**Actions** :
- ✅ **>90%** : Excellent, maintenir
- ⚠️ **75-90%** : Bon, améliorer branches
- ❌ **<75%** : Insuffisant, ajouter tests

---

## 🔍 Types de Tests

### Unitaires (test-unit)
- **Fonctions** : Pure functions, utilities
- **Composants** : Props, events, render
- **Hooks** : Custom hooks React/Vue
- **Services** : Business logic

### E2E (test-e2e)
- **Authentication** : Login, logout, signup
- **Navigation** : Routing, links, menus
- **Forms** : Validation, submission, erreurs
- **Checkout** : Panier → paiement → confirmation

### Intégration (à ajouter)
- **API Routes** : Endpoints avec DB
- **State Management** : Store + components
- **Multi-page Flows** : Navigation complète

### Performance (à ajoider)
- **Load Testing** : k6, Artillery
- **Lighthouse CI** : Core Web Vitals
- **Bundle Analysis** : Size regression

---

## 📚 Documentation Parente

- **`../Readme.md`** : Vue d'ensemble de tous les agents
- **`../CLAUDE.md`** : Architecture complète du système
- **`/CLAUDE.md`** : Instructions globales Woodman

---

## 🎓 Ressources

### Testing Library
- React: https://testing-library.com/react
- Vue: https://test-utils.vuejs.org

### Frameworks
- Jest: https://jestjs.io
- Vitest: https://vitest.dev
- Playwright: https://playwright.dev
- Cypress: https://cypress.io

### Best Practices
- Kent C. Dodds: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
- Testing Trophy: https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications

---

_Woodman Agents · 12-test/ · Test Automation_

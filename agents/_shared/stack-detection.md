# Détection de stack — Module partagé

> Ce fichier est utilisé par les agents nécessitant une détection de stack.
> Les agents doivent lire ce fichier au besoin via `Read agents/_shared/stack-detection.md`.

---

## Commandes de détection

```bash
# === Frontend ===
cat package.json 2>/dev/null | grep -E "react|vue|svelte|angular|next|nuxt|astro"

# === Backend ===
cat package.json 2>/dev/null | grep -E "express|fastify|hono|nest"
cat requirements.txt 2>/dev/null | grep -E "django|flask|fastapi"
cat composer.json 2>/dev/null | grep -E "laravel|symfony"
cat go.mod 2>/dev/null
cat Cargo.toml 2>/dev/null

# === Mobile ===
cat pubspec.yaml 2>/dev/null  # Flutter
ls *.xcodeproj 2>/dev/null     # iOS
cat build.gradle 2>/dev/null   # Android

# === CMS ===
cat wp-config.php 2>/dev/null  # WordPress
cat spip.php 2>/dev/null       # SPIP

# === Build / Bundler ===
cat vite.config.* 2>/dev/null
cat webpack.config.* 2>/dev/null
cat tsconfig.json 2>/dev/null

# === Base de données / ORM ===
grep -rl "prisma\|typeorm\|mongoose\|sequelize\|drizzle\|eloquent" package.json composer.json 2>/dev/null

# === CI/CD ===
ls .github/workflows/*.yml 2>/dev/null
cat .gitlab-ci.yml 2>/dev/null
cat Dockerfile 2>/dev/null
cat docker-compose.yml 2>/dev/null

# === Linters / Formatters ===
ls .eslintrc* .prettierrc* biome.json 2>/dev/null
```

---

## Format de sortie

```
=== Stack détectée ===

🖥️ Type         : [Frontend / Backend / Fullstack / API / Mobile / CMS]
⚛️ Framework     : [Next.js / Nuxt / Laravel / Django / etc.]
📦 Bundler       : [Vite / Webpack / Turbopack / esbuild / aucun]
🗄️ Base données  : [PostgreSQL / MySQL / MongoDB / SQLite / aucune]
🔧 Langage(s)    : [TypeScript, Python, Go, etc.]
☁️ Infra         : [Vercel / AWS / Cloudflare / VPS / etc.]
🧪 Tests         : [Jest / Vitest / Playwright / Cypress / aucun]
📏 Linter        : [ESLint / Prettier / Biome / aucun]
📜 CI/CD         : [GitHub Actions / GitLab CI / aucun]
```

---

## Transmission inter-agents

Quand un orchestrateur détecte la stack via un premier agent (typiquement spec-writer),
il DOIT transmettre le résultat aux agents suivants via le prompt du Task tool :

```
Prompt: "[instruction principale]. CONTEXTE PROJET: Stack=[X], Framework=[Y], DB=[Z], Langages=[L]. Structure déjà analysée, ne pas rescanner."
```

Cela évite que chaque sous-agent relance la détection de stack (économie ~2-5K tokens par agent).

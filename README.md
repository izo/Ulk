<div align="center">
  <img src="woodman.png" alt="Woodman Logo" width="200"/>

  # 🪵 Woodman

  **Guide de Référence Complet pour Claude Code & Speckit**

  [![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/woodman)
  [![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
  [![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-success.svg)](https://github.com/yourusername/woodman/actions)
  [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

</div>

---

## 📖 À Propos

**Woodman** est un générateur de documentation qui combine les informations officielles de **Claude Code** et **Speckit** dans un document de référence unique, clair et facile à consulter.

### 🎯 Objectif

Fournir un guide de survie complet pour les développeurs utilisant Claude Code et Speckit, avec:
- ⌨️ Tous les raccourcis clavier
- ⚡ Toutes les commandes slash
- 🔧 Configuration complète
- 📐 Workflow Speckit détaillé
- 💡 Bonnes pratiques
- 📚 Crédits et sources transparents

## 🚀 Installation

### Prérequis

- Node.js >= 14.0.0
- npm ou yarn

### Cloner le Projet

```bash
git clone https://github.com/yourusername/woodman.git
cd woodman
```

### Structure du Projet

```
Woodman/
├── README.md                        # Ce fichier
├── DEPLOY.md                        # Guide déploiement GitHub Pages
├── generate-claude-cheatsheet.js   # Script de génération
├── woodman.md                       # Document généré
├── index.html                       # Page web pour GitHub Pages
├── woodman.png                      # Logo principal
├── woodman-mini.png                 # Logo mini (16x16)
├── cheatsheet.md                    # Ressources additionnelles
├── code-cheatsheet.pdf              # PDF de référence
├── .nojekyll                        # Désactive Jekyll
├── .github/
│   └── workflows/
│       └── deploy.yml               # GitHub Actions workflow
└── .specify/                        # Configuration Speckit
    ├── templates/
    ├── scripts/
    └── memory/
```

## 🎮 Utilisation

### Générer le Document

```bash
node generate-claude-cheatsheet.js
```

### Sortie

Le script génère:
- ✅ `woodman.md` - Document de référence complet (10KB, 370+ lignes)
- ✅ Vérification automatique des logos
- ✅ Messages d'état détaillés

### Exemple de Sortie

```
✅ Document Woodman généré avec succès!
📄 Fichier créé: /path/to/woodman.md

📋 Contenu inclus:
  🤖 CLAUDE CODE:
    - Installation & Configuration
    - Raccourcis clavier
    - Commandes slash
    - Serveurs MCP
    - Git Worktrees
    - Skills & Subagents
    - Hooks & Automation

  📐 SPECKIT/SPECIFY:
    - Installation
    - Commandes principales
    - Workflow de développement
    - Agents AI supportés
    - Bonnes pratiques

  📚 SOURCES:
    - Claude Code Official (awesomeclaude.ai)
    - Spec Kit by GitHub (GitHub)
    - Claude Code (Anthropic)

🪵 Woodman v1.0 - Ready to use!
```

## 🌐 Déploiement sur GitHub Pages

Woodman peut être déployé automatiquement sur GitHub Pages!

### 🚀 Configuration Rapide

1. **Créer un repository GitHub** et pousser le code
2. **Activer GitHub Pages**: Settings > Pages > Source: GitHub Actions
3. **Push vers main**: Le site se déploie automatiquement!

Votre site sera disponible à: `https://VOTRE_USERNAME.github.io/woodman/`

### ⚙️ Fonctionnalités

- ✅ **Génération automatique** à chaque push
- ✅ **Mise à jour hebdomadaire** automatique
- ✅ **Déploiement manuel** possible via GitHub Actions
- ✅ **Interface web responsive** avec thème sombre/clair
- ✅ **Bouton "Retour en haut"** pour navigation

### 📖 Guide Complet

Voir [DEPLOY.md](DEPLOY.md) pour le guide de déploiement complet avec:
- Configuration GitHub Pages
- Personnalisation du thème
- Domaine personnalisé
- Dépannage
- Et plus!

### 🧪 Test Local

```bash
# Générer la documentation
node generate-claude-cheatsheet.js

# Servir localement
python3 -m http.server 8000
# ou
npx http-server -p 8000

# Ouvrir http://localhost:8000
```

## 📚 Contenu du Document

### 🚀 Partie 1: Claude Code

#### Installation
- macOS/Linux (curl)
- Homebrew
- npm
- Windows PowerShell

#### Raccourcis Clavier
Tous les raccourcis essentiels: `!`, `@`, `Esc`, `Ctrl+R`, `Shift+Tab`, etc.

#### Commandes Slash
Liste complète: `/clear`, `/init`, `/model`, `/config`, `/cost`, `/mcp`, `/review`, etc.

#### Configuration
- Hiérarchie des fichiers de config
- Commandes de configuration
- Emplacements des fichiers clés

#### Fonctionnalités Avancées
- Modèles AI (Opus 4.1, Sonnet 4, Haiku 3.5)
- Serveurs MCP (Playwright, Context7, etc.)
- Git Worktrees
- Checkpointing & Rewind
- Mode Headless
- Agent Skills
- Slash Commands personnalisés
- Permissions & Sécurité
- Hooks & Automation

### 📐 Partie 2: Speckit

#### Qu'est-ce que Speckit?
Méthodologie Spec-Driven Development

#### Installation
```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

#### Commandes Slash Speckit
- `/speckit.constitution` - Principes projet
- `/speckit.specify` - Requirements
- `/speckit.plan` - Implémentation
- `/speckit.tasks` - Tâches
- `/speckit.implement` - Exécution
- `/speckit.clarify` - Clarification
- `/speckit.analyze` - Analyse
- `/speckit.checklist` - Validation

#### Workflow de Développement
Processus en 5 étapes détaillé

#### Agents AI Supportés
Support complet et limité

### 💡 Bonnes Pratiques
Recommandations pour Claude Code et Speckit

### 📚 Ressources & Crédits
Toutes les sources avec liens et mainteneurs

## 🔧 Personnalisation

### Modifier les Sources

Éditez le tableau `sources` dans `generate-claude-cheatsheet.js`:

```javascript
const sources = [
  {
    name: "Votre Source",
    url: "https://example.com",
    description: "Description de votre source",
    maintainer: "Nom du Maintainer"
  }
];
```

### Ajouter du Contenu

Modifiez la constante `content` dans le script pour ajouter vos propres sections.

### Changer les Logos

Remplacez les fichiers:
- `woodman.png` (200x200px recommandé)
- `woodman-mini.png` (16x16px ou 32x32px)

## 📋 Système de Sources

Le document inclut un système de gestion des sources transparent:

```yaml
sources:
  - name: "Claude Code Official"
    url: "https://awesomeclaude.ai/code-cheatsheet"
    description: "Cheatsheet interactif officiel"
    maintainer: "awesomeclaude.ai"
```

Toutes les sources sont créditées en bas du document généré.

## 🎨 Logos

### Logo Principal (`woodman.png`)
- Affiché en haut du document (200px)
- Représente l'identité visuelle de Woodman

### Logo Mini (`woodman-mini.png`)
- Utilisé dans le footer (16x16px)
- Version compacte pour intégrations

## 🛠️ Développement

### Modifier le Script

```bash
# Ouvrir dans votre éditeur
code generate-claude-cheatsheet.js

# Tester les modifications
node generate-claude-cheatsheet.js

# Vérifier le résultat
cat woodman.md
```

### Structure du Script

1. **Imports & Configuration**
2. **Système de Sources**
3. **Génération du Contenu**
   - Frontmatter YAML
   - Logo principal
   - Partie Claude Code
   - Partie Speckit
   - Bonnes pratiques
   - Crédits
4. **Écriture du Fichier**
5. **Vérifications**

## 📊 Statistiques

- **Document**: 10 KB, 370+ lignes
- **Script**: 12 KB, 420+ lignes
- **Sections**: 30+ sections détaillées
- **Commandes**: 50+ commandes documentées
- **Sources**: 3 sources officielles

## 🤝 Contribution

Les contributions sont les bienvenues! Pour contribuer:

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Changelog

### Version 1.0.0 (2025-11-17)
- 🎉 Version initiale
- 📖 Documentation Claude Code complète
- 📐 Documentation Speckit/Specify
- ✨ Système de gestion des sources
- ✨ Intégration des logos
- ✨ Crédits transparents
- 🎨 Mise en page claire et structurée
- 📚 README professionnel

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Crédits

Woodman combine les informations de:

- **[Claude Code](https://claude.ai)** - Développé par Anthropic
- **[awesomeclaude.ai](https://awesomeclaude.ai/code-cheatsheet)** - Cheatsheet interactif
- **[Spec Kit](https://github.com/github/spec-kit)** - Par GitHub

Merci à tous les mainteneurs et contributeurs de ces projets!

## 📞 Support

Pour questions ou problèmes:
- 🐛 [Ouvrir une issue](https://github.com/yourusername/woodman/issues)
- 💬 [Discussions](https://github.com/yourusername/woodman/discussions)
- 📧 Email: votre@email.com

## 🔗 Liens Utiles

- [Documentation Claude Code](https://code.claude.com/docs)
- [Speckit Repository](https://github.com/github/spec-kit)
- [awesomeclaude.ai](https://awesomeclaude.ai)

---

<div align="center">

  **Fait avec ❤️ et <img src="woodman-mini.png" alt="🪵" width="16" height="16" style="vertical-align: middle;"/> par la communauté**

  [⭐ Star sur GitHub](https://github.com/yourusername/woodman) • [🐛 Reporter un Bug](https://github.com/yourusername/woodman/issues) • [💡 Demander une Feature](https://github.com/yourusername/woodman/issues)

</div>

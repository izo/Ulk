# 🚀 Déploiement Woodman sur GitHub Pages

Ce guide explique comment déployer Woodman sur GitHub Pages avec génération automatique.

## 📋 Prérequis

- Un compte GitHub
- Un repository Git (public ou privé avec GitHub Pro)
- Git installé localement

## 🎯 Configuration GitHub Pages

### Étape 1: Créer le Repository GitHub

```bash
# Si vous n'avez pas encore de repository
git remote add origin https://github.com/VOTRE_USERNAME/woodman.git
```

### Étape 2: Activer GitHub Pages

1. Allez sur votre repository GitHub
2. Cliquez sur **Settings** (Paramètres)
3. Dans le menu latéral, cliquez sur **Pages**
4. Sous **Source**, sélectionnez:
   - Source: **GitHub Actions**

### Étape 3: Pousser le Code

```bash
# Ajouter tous les fichiers
git add .

# Créer le commit initial
git commit -m "🎉 Initial commit - Woodman v1.0"

# Pousser vers GitHub
git push -u origin main
```

## ⚙️ Fonctionnement du Workflow

Le workflow GitHub Actions (`.github/workflows/deploy.yml`) s'exécute automatiquement:

### 🔄 Déclencheurs

1. **Push sur main**: À chaque push sur la branche principale
2. **Manuel**: Via l'onglet "Actions" sur GitHub
3. **Hebdomadaire**: Chaque dimanche à minuit (régénération automatique)

### 📝 Étapes du Workflow

1. **Checkout**: Récupère le code du repository
2. **Setup Node.js**: Installe Node.js 18
3. **Generate Documentation**: Exécute `generate-claude-cheatsheet.js`
4. **Convert to HTML**: Crée `index.html` avec le markdown
5. **Deploy**: Déploie sur GitHub Pages

## 🌐 URL de Votre Site

Après le déploiement, votre site sera accessible à:

```
https://VOTRE_USERNAME.github.io/woodman/
```

ou pour un domaine personnalisé:

```
https://VOTRE_DOMAINE.com
```

## 🔧 Configuration Avancée

### Domaine Personnalisé

1. Dans **Settings > Pages**
2. Ajoutez votre domaine dans **Custom domain**
3. Créez un fichier `CNAME` à la racine:
   ```bash
   echo "votre-domaine.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

### Modifier la Fréquence de Régénération

Éditez `.github/workflows/deploy.yml`:

```yaml
schedule:
  # Chaque jour à minuit
  - cron: '0 0 * * *'

  # Chaque lundi à 9h
  - cron: '0 9 * * 1'
```

### Désactiver la Régénération Automatique

Supprimez la section `schedule` dans `.github/workflows/deploy.yml`.

## 🎨 Personnalisation de l'Apparence

### Modifier le Thème

Éditez `index.html` pour changer les couleurs:

```css
body {
    background-color: #0d1117; /* Couleur de fond */
}

.markdown-body {
    color: #c9d1d9; /* Couleur du texte */
}
```

### Ajouter Google Analytics

Ajoutez avant `</head>` dans `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 📊 Monitoring du Déploiement

### Voir les Logs

1. Allez sur **Actions** dans votre repository
2. Cliquez sur le dernier workflow run
3. Consultez les logs de chaque étape

### Status Badge

Ajoutez dans votre README.md:

```markdown
[![Deploy](https://github.com/VOTRE_USERNAME/woodman/actions/workflows/deploy.yml/badge.svg)](https://github.com/VOTRE_USERNAME/woodman/actions/workflows/deploy.yml)
```

## 🐛 Dépannage

### Le Site Ne Se Charge Pas

1. Vérifiez que GitHub Pages est activé
2. Attendez 2-3 minutes après le déploiement
3. Videz le cache de votre navigateur (Ctrl+Shift+R)

### Erreur dans le Workflow

1. Consultez les logs dans **Actions**
2. Vérifiez que `generate-claude-cheatsheet.js` fonctionne localement
3. Assurez-vous que `woodman.md` est bien généré

### Les Images Ne S'Affichent Pas

1. Vérifiez que `woodman.png` et `woodman-mini.png` sont dans le repository
2. Les chemins d'images doivent être relatifs (pas de `/` au début)

## 🔐 Sécurité

### Permissions du Workflow

Le workflow a besoin des permissions suivantes (déjà configurées):

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

### Repository Privé

GitHub Pages fonctionne avec les repositories privés si vous avez GitHub Pro.

## 🔄 Mises à Jour

### Mettre à Jour le Contenu

```bash
# Modifier le script ou les sources
code generate-claude-cheatsheet.js

# Tester localement
node generate-claude-cheatsheet.js

# Commiter et pousser
git add .
git commit -m "Update documentation"
git push
```

Le site sera automatiquement redéployé!

### Forcer un Redéploiement

1. Allez dans **Actions**
2. Sélectionnez **Deploy Woodman to GitHub Pages**
3. Cliquez sur **Run workflow**
4. Cliquez sur **Run workflow** (bouton vert)

## 📱 Test Local

Pour tester avant de déployer:

```bash
# Générer la documentation
node generate-claude-cheatsheet.js

# Servir localement avec Python
python3 -m http.server 8000

# Ou avec Node.js
npx http-server -p 8000
```

Puis ouvrez: http://localhost:8000

## ✅ Checklist de Déploiement

- [ ] Repository créé sur GitHub
- [ ] GitHub Pages activé (Source: GitHub Actions)
- [ ] Fichiers poussés sur main
- [ ] Workflow exécuté avec succès
- [ ] Site accessible à l'URL GitHub Pages
- [ ] Images et logos affichés correctement
- [ ] Navigation fonctionne
- [ ] Bouton "Retour en haut" fonctionne

## 🎉 Félicitations!

Votre documentation Woodman est maintenant en ligne et se met à jour automatiquement!

## 📚 Ressources

- [Documentation GitHub Pages](https://docs.github.com/en/pages)
- [Documentation GitHub Actions](https://docs.github.com/en/actions)
- [Marked.js](https://marked.js.org/)
- [GitHub Markdown CSS](https://github.com/sindresorhus/github-markdown-css)

---

*Besoin d'aide? Ouvrez une issue sur GitHub!*

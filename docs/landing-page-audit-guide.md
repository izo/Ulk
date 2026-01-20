---
title: Guide d'Audit de Landing Pages
description: Guide complet pour auditer vos landing pages avec l'agent landing-page-auditor
date: 2026-01-20
category: guide
tags: [landing-page, audit, conversion, chrome-devtools, ux]
---

# Guide d'Audit de Landing Pages

## Vue d'ensemble

L'agent **landing-page-auditor** (22) est un outil spécialisé qui utilise Chrome DevTools pour analyser vos landing pages et évaluer leur efficacité en matière de conversion.

## Objectifs d'une Landing Page

Une landing page efficace doit :

1. **Convertir** : Encourager les utilisateurs à passer à l'action (leads, ventes, inscriptions)
2. **Engager** : Capturer et maintenir l'attention des visiteurs
3. **Inspirer** : Créer le désir et établir une connexion émotionnelle

## Critères d'Évaluation

L'agent évalue 9 catégories principales pour un score total sur 100 points :

### 1. Hero Section & Première Impression (20 points)
- **Titre/Headline** (8 pts) : Valeur immédiate, impact, concision
- **Impact Visuel** (7 pts) : Qualité des images/vidéos, pertinence, chargement
- **Visibilité CTA** (5 pts) : CTA visible sans scroll, contrasté, action claire

### 2. Proposition de Valeur & Offre (15 points)
- **Clarté de l'offre** (8 pts) : Bénéfices clairs, valeur spécifique
- **Urgence/Rareté** (4 pts) : Offres limitées, FOMO
- **Points de Différenciation** (3 pts) : USP, avantages compétitifs

### 3. Call-to-Action (CTA) (20 points)
- **Qualité CTA Principal** (10 pts) : Visibilité, texte orienté action, placements multiples
- **Hiérarchie CTA** (5 pts) : CTA primaire vs secondaire, pas de distractions
- **Design Bouton** (5 pts) : Taille adaptée mobile, états hover/loading

### 4. Preuve Sociale & Confiance (15 points)
- **Témoignages Clients** (5 pts) : Noms réels, photos, résultats spécifiques
- **Indicateurs de Confiance** (5 pts) : Logos clients, avis/notes, études de cas
- **Signaux d'Autorité** (5 pts) : Certifications, awards, garanties

### 5. Design & Collecte de Données (10 points)
- **Simplicité Formulaire** (5 pts) : Champs minimums, labels clairs
- **UX Formulaire** (5 pts) : Validation inline, messages d'erreur, texte engageant

### 6. Design & Expérience Utilisateur (10 points)
- **Hiérarchie Visuelle** (4 pts) : Flow d'information, espaces blancs, typographie
- **Structure Layout** (3 pts) : Patterns F/Z, sections définies, pas de clutter
- **Cohérence Brand** (3 pts) : Palette couleurs, fonts, voix de marque

### 7. Optimisation Mobile (10 points)
- **Design Responsive** (5 pts) : Adaptation écrans, éléments touch-friendly, pas de scroll horizontal
- **Performance Mobile** (3 pts) : Chargement rapide, images optimisées
- **UX Mobile** (2 pts) : Formulaires faciles, CTA thumb-friendly, texte lisible

### 8. Performance & Technique (5 points)
- **Vitesse Page** (3 pts) : Load time < 3s, FCP rapide, pas de layout shifts
- **Qualité Technique** (2 pts) : Pas d'erreurs console, liens fonctionnels, meta tags

### 9. Qualité Contenu (5 points)
- **Efficacité Copy** (3 pts) : Focus bénéfices, scannable, voix active
- **Longueur Contenu** (2 pts) : Appropriée, pas d'info superflue

## Usage

### Commande de Base

```bash
"Audit cette landing page : https://example.com/landing"
```

### Workflow Interactif

L'agent vous posera quelques questions pour contextualiser l'audit :

1. **Objectif principal ?**
   - Générer des leads
   - Augmenter les ventes
   - Promouvoir un produit/service
   - Autre

2. **Audience cible ?**
   - B2B / B2C
   - Industrie
   - Démographie

3. **Pages concurrentes ?**
   - URLs de référence pour benchmarking (optionnel)

### Phases d'Analyse

L'agent exécute 4 phases :

**Phase 1 : Setup Initial**
- Création d'un onglet Chrome dédié
- Navigation vers l'URL

**Phase 2 : Analyse Desktop**
- Screenshot pleine page
- Analyse structure (headings, CTAs, formulaires)
- Recherche éléments spécifiques (témoignages, garanties)
- Extraction métriques (meta tags, performance, comptage CTAs)
- Vérification console

**Phase 3 : Analyse Mobile**
- Resize fenêtre (375x667 - iPhone SE)
- Screenshot mobile
- Vérification CTA, formulaires, texte, images
- Test interactions

**Phase 4 : Scoring & Rapport**
- Calcul scores par catégorie
- Génération rapport détaillé

## Outputs

L'agent génère plusieurs fichiers dans `/docs/audits/landing-page-[timestamp]/` :

1. **audit-report.md** - Rapport détaillé complet avec scores et recommandations
2. **screenshot-desktop.png** - Vue desktop
3. **screenshot-mobile.png** - Vue mobile
4. **screenshot-full-page.png** - Capture complète de la page
5. **quick-wins.md** - Top 5 des corrections faciles à fort impact

## Interprétation des Scores

- **90-100** : Excellent - Optimisations mineures uniquement
- **75-89** : Bon - Plusieurs améliorations boosteront les conversions
- **60-74** : Moyen - Opportunités significatives d'amélioration
- **45-59** : Sous la moyenne - Redesign majeur recommandé
- **0-44** : Faible - Refonte complète nécessaire

## Red Flags

L'agent signale immédiatement :

- ❌ Multiples CTAs concurrents
- ❌ Formulaires ou liens cassés
- ❌ Optimisation mobile manquante
- ❌ Temps de chargement lent (>5s)
- ❌ Absence de preuve sociale
- ❌ Photos stock génériques
- ❌ Proposition de valeur vague
- ❌ Mur de texte sans structure
- ❌ Fonts minuscules ou illisibles
- ❌ Vidéos auto-play avec son
- ❌ Pop-ups bloquant le contenu immédiatement

## Considérations Spéciales

### E-commerce
- Qualité et quantité d'images produits
- Visibilité et clarté du pricing
- Info shipping/retours
- Flow add-to-cart

### Lead Generation
- Analyse friction formulaire
- Value proposition lead magnet
- Expectations follow-up
- Visibilité privacy policy

### SaaS/Free Trial
- Proéminence CTA demo/trial
- Mapping features-benefits
- Transparence pricing
- Preview onboarding

### Event/Webinar
- Proéminence date/heure
- Credentials speakers
- Clarté agenda
- Facilité registration

## Exemples de Commandes

```bash
# Audit simple
"Audit cette landing page : https://example.com/promo"

# Audit avec contexte
"Audit cette landing page SaaS pour génération de leads : https://app.example.com"

# Audit comparatif
"Compare cette landing page avec celle de notre concurrent : https://competitor.com/landing"

# Audit mobile focus
"Analyse l'expérience mobile de cette landing page : https://example.com"

# Audit avec focus performance
"Audit performance et conversion de : https://example.com/landing"
```

## Tips pour Maximiser l'Efficacité

1. **Avant l'audit** :
   - Identifiez l'objectif principal de la page
   - Connaissez votre audience cible
   - Listez vos principaux concurrents

2. **Pendant l'audit** :
   - Répondez aux questions contextuelles de l'agent
   - Mentionnez vos préoccupations spécifiques

3. **Après l'audit** :
   - Priorisez les recommandations 🔴 Critiques
   - Implémentez les 🟡 High Priority dans la semaine
   - Planifiez les 🟢 Enhancements pour plus tard
   - Testez les hypothèses A/B suggérées

## Intégration dans le Workflow

### Setup Nouveau Projet
```
1. spec-writer → Analyse projet
2. landing-page-auditor → Audit landing(s)
3. todo-generator → Plan d'action
4. task-runner → Implémentation
```

### Pré-Release
```
1. landing-page-auditor → Audit conversion
2. a11y-auditor → Accessibilité
3. perf-auditor → Performance
4. pre-release → GO/NO-GO
```

### Optimisation Continue
```
1. landing-page-auditor → Baseline
2. Implémentation changements
3. landing-page-auditor → Re-audit
4. Comparaison métriques avant/après
```

## Technologies Utilisées

- **Chrome DevTools MCP** : Automation navigateur
- **Accessibility Tree** : Analyse structure page
- **JavaScript Evaluation** : Extraction métriques performance
- **Screenshots** : Documentation visuelle
- **Mobile Emulation** : Test responsive

## Limitations

- Ne teste pas les workflows multi-pages (funnels)
- Ne peut pas tester les A/B tests actifs
- Ne remplace pas les tests utilisateurs réels
- Performance mesurée localement (peut varier selon connexion)
- Certains éléments dynamiques peuvent nécessiter interaction manuelle

## Best Practices

1. **Auditez régulièrement** : Au moins avant chaque campagne majeure
2. **Testez mobile d'abord** : 60%+ du trafic vient du mobile
3. **Suivez les métriques** : Trackez impact des changements
4. **A/B testez** : Validez les hypothèses avec de vrais utilisateurs
5. **Itérez continuellement** : L'optimisation est un processus, pas un événement

## Support & Questions

Pour toute question sur l'utilisation de cet agent :

```bash
"Comment utiliser l'agent landing-page-auditor ?"
"Quels critères sont évalués dans l'audit ?"
"Comment interpréter les scores ?"
```

---

**Version** : 1.0.0
**Date** : 2026-01-20
**Agent** : landing-page-auditor (22)
**Model** : opus

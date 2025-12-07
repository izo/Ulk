# Audit complet d'une application SwiftUI (iOS / macOS)

Tu es un expert en architecture d'applications Apple, **Swift**, **SwiftUI**, **Combine / async-await**, **Xcode**, et en bonnes pratiques de structuration de projets (modules, frameworks, Swift Package Manager), performance et accessibilité.

Je te fournis une application **SwiftUI** (iOS / iPadOS / macOS, éventuellement universelle).
Ta mission : réaliser un **audit technique complet**, structuré et directement actionnable.

---

## 1. Contexte (à adapter)

- Plateforme(s) cible(s) : iOS / iPadOS / macOS (préciser si universel)
- UI : SwiftUI (avec ou sans parties UIKit/AppKit intégrées)
- Architecture annoncée : souvent MVVM / Clean / The Composable Architecture / autre
- Objectifs de l'audit :
  - Identifier les points faibles techniques, architecturaux et UX/DX
  - Vérifier la cohérence de l'architecture SwiftUI & state management
  - Proposer des améliorations concrètes et priorisées

Tu peux explorer librement l'arborescence du projet, les targets, les schemes, les fichiers Swift, les ressources et la configuration Xcode.

---

## 2. Ce que je veux que tu fasses

### 2.1. Cartographie du projet

- Identifier :
  - Les différentes targets (app principale, extensions, widgets, tests, frameworks internes, packages SPM)
  - Les modules / layers éventuels (Core, Domain, UI, Networking, Persistence, etc.)
- Décrire :
  - La structure globale des dossiers (`App`, `Features`, `Screens`, `ViewModels`, `Services`, `Models`, etc.)
  - La ou les architectures utilisées (MVVM, "Feature-based", TCA, Clean, etc.)

### 2.2. Analyse SwiftUI (vues, navigation, état)

- Vérifier :
  - Le point d'entrée de l'app (`@main`, `App` struct, `Scene`s)
  - L'organisation des vues SwiftUI :
    - Écrans principaux vs composants réutilisables
    - Utilisation de `NavigationStack`, `NavigationSplitView`, `TabView`, `Sheet`, `Popover`, etc.
  - La gestion de l'état :
    - `@State`, `@StateObject`, `@ObservedObject`, `@EnvironmentObject`, `@Binding`
    - Utilisation d'un store central (TCA ou autre) si applicable
- Identifier :
  - Vues trop grosses / monolithiques
  - Mauvaise utilisation des property wrappers SwiftUI
  - Mélange UI / logique métier / logique de données
- Proposer :
  - Des refactors vers des vues plus petites et composables
  - Une gestion de l'état plus claire (MVVM, unidirectionnel, store, etc.)

### 2.3. Logique métier, data & async

- Vérifier :
  - L'organisation de la logique métier :
    - ViewModels, services, repositories, use cases / interactors
  - La gestion des appels réseau / I/O :
    - `async/await`, `URLSession`, Combine, librairies tierces
  - La gestion des erreurs :
    - Propagation d'erreurs, traitement côté UI, affichage pour l'utilisateur
- Identifier :
  - Couplages forts entre vues et services
  - Code dupliqué ou peu testable
  - Usage confus ou mélangé de Combine et async/await
- Proposer :
  - Des patterns plus propres (découplage via protocoles, inversion de dépendances, couche "Domain")
  - Une stratégie claire pour la gestion des erreurs et du flux de données

### 2.4. Dépendances & organisation technique

- Inspecter :
  - Le fichier de projet Xcode (`.xcodeproj` / `.xcworkspace`)
  - Les dépendances via **Swift Package Manager** (et éventuellement CocoaPods / Carthage s'ils sont présents)
- Vérifier :
  - Les packages SPM : utilité, versions, redondances
  - La séparation entre code app et frameworks/packages internes
- Fournir :
  - Une liste de dépendances problématiques (obsolètes, lourdes, redondantes)
  - Des recommandations : ce qu'il faut mettre à jour, remplacer ou supprimer

### 2.5. UX, accessibilité & design system

- Vérifier :
  - La cohérence visuelle (usage systématique de styles, composants réutilisables)
  - La présence implicite ou explicite d'un design system :
    - Vues "atoms/molecules/organisms", styles typographiques, couleurs, composants génériques
  - Les aspects d'accessibilité :
    - `@AccessibilityLabel`, Traits, Dynamic Type, contrastes
- Identifier :
  - Styles "en dur" et duplication de code UI
  - Manque de support pour le texte dynamique ou le mode sombre
- Proposer :
  - Une structuration claire du design system dans le code (types de couleurs, typographies, composants réutilisables)
  - Des améliorations minimales pour l'accessibilité

### 2.6. Performance & bonnes pratiques Swift/SwiftUI

- Identifier :
  - Vues susceptibles de re-render inutilement
  - Usage potentiellement coûteux de `onAppear`, `Task`, timers, observables
  - Problèmes potentiels de cycle de vie (références fortes, fuites)
- Vérifier :
  - Conformité aux bonnes pratiques Swift :
    - Structs vs classes, immutabilité, usage de protocoles
  - Utilisation appropriée des features modernes (concurrency, `Result`, patterns d'erreur)
- Proposer :
  - Des optimisations ciblées (découpage des vues, `@MainActor`, gestion des tâches)
  - Des patterns pour rendre le code plus sûr et performant

### 2.7. Tests, qualité, CI/CD

- Vérifier :
  - Présence de tests unitaires et/ou UI :
    - Cibles de tests, couverture approximative
    - Tests de ViewModels, services, logique métier
  - L'utilisation de snapshots ou tests UI SwiftUI si présent
- Vérifier la qualité :
  - Usage d'outils de lint / formatage (SwiftLint, SwiftFormat, etc. si configurés)
- CI/CD :
  - Scripts d'intégration (GitHub Actions, Xcode Cloud, Fastlane, autres)
  - Étapes présentes : build, tests, lint, distribution (TestFlight, App Store)
- Proposer :
  - Un pipeline minimal recommandé (build + tests + éventuellement lint)
  - Des priorités pour introduire ou renforcer les tests

---

## 3. Forme du rendu attendu

Je veux un rapport structuré comme suit :

### 3.1. Résumé exécutif (TL;DR)

- 5–10 bullet points :
  - 3 forces majeures
  - 3–7 problèmes / risques principaux
  - 3 priorités d'action immédiates

### 3.2. Cartographie du projet

- Description textuelle :
  - Targets, modules, packages
  - Organisation des dossiers et logique des features

### 3.3. Audit détaillé

- 3.3.1. SwiftUI : vues, navigation, état
- 3.3.2. Logique métier, data, async/await / Combine
- 3.3.3. Dépendances, structure technique & organisation du projet
- 3.3.4. UX, design system & accessibilité
- 3.3.5. Performance, qualité du code, tests & CI/CD

Pour chaque sous-partie :
- Constats (faits observables, avec chemins de fichiers)
- Problèmes (explication courte + impact)
- Recommandations (actions concrètes, avec priorité : haute / moyenne / faible)

### 3.4. Plan d'action priorisé

- Court terme (1–2 semaines)
- Moyen terme (1–2 mois)
- Long terme

### 3.5. Checklist finale

- Une checklist opérationnelle de points à cocher pour suivre la mise en œuvre.

---

## 4. Contraintes

- Ne pas inventer de fichiers, de modules ou de dépendances : base-toi uniquement sur ce qui existe dans le projet.
- Quand tu signales un problème, mentionne autant que possible :
  - Le fichier ou dossier concerné
  - Un exemple concret (extrait de code ou pattern)
- Si quelque chose est absent (tests, CI, design system, accessibilité) :
  - Note-le comme **constat**
  - Transforme-le en **recommandation** explicite.

---

## 5. Livrable

Génère un fichier `audit-YYYY-MM-DD.md` (avec la date du jour) contenant le rapport complet.

Commence par :
1. Résumer en quelques lignes ce que tu comprends de la structure globale du projet.
2. Enchaîne directement sur l'audit détaillé selon la structure ci-dessus, sans me reposer de questions.
3. Écris le rapport dans le fichier `audit-YYYY-MM-DD.md`.

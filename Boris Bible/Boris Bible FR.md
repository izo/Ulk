---
title: "La Bible de Boris"
author: "Boris Cherny"
handle: "@boris_cherny"
description: "Comment Boris Cherny, le créateur de Claude Code, utilise Claude Code"
date: 2025-01-04
lang: fr
tags:
  - Claude Code
  - IA
  - Développement
  - Workflow
  - Bonnes Pratiques
---

# La Bible de Boris

**@boris_cherny**

Je suis Boris et j'ai créé Claude Code. Beaucoup de gens m'ont demandé comment j'utilise Claude Code, alors j'ai voulu vous montrer un peu ma configuration.

Ma configuration est peut-être étonnamment basique ! Claude Code fonctionne très bien dès l'installation, donc personnellement je ne le personnalise pas beaucoup. Il n'y a pas une seule bonne façon d'utiliser Claude Code : nous le construisons intentionnellement de manière à ce que vous puissiez l'utiliser, le personnaliser et le modifier comme vous le souhaitez. Chaque membre de l'équipe Claude Code l'utilise très différemment.

Alors, allons-y.

![Couverture Boris Bible](Boris%20Bible1.jpeg)

---

## 1/ Sessions Terminal en Parallèle

J'exécute 5 Claudes en parallèle dans mon terminal. Je numérote mes onglets de 1 à 5, et j'utilise les notifications système pour savoir quand un Claude a besoin d'une entrée.

> [code.claude.com/docs](https://code.claude.com/docs)

![Configuration Terminal](Boris%20Bible2.jpeg)

---

## 2/ Sessions Web & Mobile

J'exécute aussi 5 à 10 Claudes sur claude.ai/code, en parallèle avec mes Claudes locaux. Pendant que je code dans mon terminal, je transfère souvent des sessions locales vers le web (en utilisant `&`), ou je lance manuellement des sessions dans Chrome, et parfois je fais des allers-retours avec `--teleport`. Je lance aussi quelques sessions depuis mon téléphone (via l'application iOS Claude) chaque matin et tout au long de la journée, et je les consulte plus tard.

---

## 3/ Opus 4.5 avec Réflexion

J'utilise Opus 4.5 avec la réflexion pour tout. C'est le meilleur modèle de codage que j'ai jamais utilisé, et même s'il est plus gros et plus lent que Sonnet, comme il faut moins le guider et qu'il est meilleur pour l'utilisation des outils, il est presque toujours plus rapide qu'un modèle plus petit au final.

---

## 4/ CLAUDE.md Partagé

Notre équipe partage un seul CLAUDE.md pour le dépôt Claude Code. Nous le versionons dans git, et toute l'équipe y contribue plusieurs fois par semaine. Chaque fois que nous voyons Claude faire quelque chose d'incorrect, nous l'ajoutons au CLAUDE.md, pour que Claude sache ne pas le refaire.

Les autres équipes maintiennent leurs propres CLAUDE.md. C'est le travail de chaque équipe de maintenir le leur à jour.

![Configuration CLAUDE.md](Boris%20Bible4.jpeg)

---

## 5/ Intégration dans les Revues de Code

Pendant les revues de code, je tague souvent `@.claude` sur les PRs de mes collègues pour ajouter quelque chose au CLAUDE.md dans le cadre de la PR. Nous utilisons l'action GitHub Claude Code (`/install-github-action`) pour cela. C'est notre version du Compounding Engineering de @danshipper.

![Revue de Code](Boris%20Bible5.jpeg)

---

## 6/ Mode Plan

La plupart des sessions commencent en mode Plan (`shift+tab` deux fois). Si mon objectif est d'écrire une Pull Request, j'utilise le mode Plan, et je fais des allers-retours avec Claude jusqu'à ce que son plan me convienne. Ensuite, je passe en mode auto-acceptation des modifications et Claude peut généralement tout faire en une seule fois. Un bon plan est vraiment important !

![Mode Plan](Boris%20Bible6.jpeg)

---

## 7/ Commandes Slash

J'utilise des commandes slash pour chaque workflow de boucle interne que je fais plusieurs fois par jour. Cela m'évite de répéter les prompts, et permet à Claude d'utiliser ces workflows aussi. Les commandes sont versionnées dans git et se trouvent dans `.claude/commands/`.

**Exemple :** Claude et moi utilisons une commande slash `/commit-push-pr` tous les jours. La commande utilise du bash inline pour pré-calculer le git status afin de faire tourner la commande rapidement et éviter les allers-retours avec le modèle.

> [code.claude.com/docs](https://code.claude.com/docs)

![Commandes Slash](Boris%20Bible7.jpeg)

---

## 8/ Sous-agents

J'utilise régulièrement quelques sous-agents :
- **code-simplifier** - simplifie le code après que Claude ait fini de travailler
- **verify-app** - contient des instructions détaillées pour tester Claude Code de bout en bout
- Et d'autres...

Comme les commandes slash, je considère les sous-agents comme une automatisation des workflows les plus courants que je fais pour la plupart des PRs.

![Sous-agents](Boris%20Bible8.jpeg)

---

## 9/ Hook PostToolUse pour le Formatage

Nous utilisons un hook PostToolUse pour formater le code de Claude. Claude génère généralement du code bien formaté de base, et le hook gère les derniers 10% pour éviter les erreurs de formatage dans la CI plus tard.

![Hooks](Boris%20Bible9.jpeg)

---

## 10/ Gestion des Permissions

Je n'utilise pas `--dangerously-skip-permissions`. À la place, j'utilise `/permissions` pour pré-autoriser les commandes bash courantes que je sais être sûres dans mon environnement, afin d'éviter les demandes de permission inutiles. La plupart sont versionnées dans `.claude/settings.json` et partagées avec l'équipe.

![Permissions](Boris%20Bible10.jpeg)

---

## 11/ Intégration des Outils

Claude Code utilise tous mes outils pour moi. Il fait souvent :
- Des recherches et des publications sur Slack (via le serveur MCP)
- Des requêtes BigQuery pour répondre aux questions d'analytics (avec le CLI bq)
- La récupération des logs d'erreurs depuis Sentry
- etc.

La configuration MCP de Slack est versionnée dans notre `.mcp.json` et partagée avec l'équipe.

![Intégration des Outils](Boris%20Bible11.jpeg)

---

## 12/ Tâches de Longue Durée

Pour les tâches de très longue durée, je vais soit :
- Demander à Claude de vérifier son travail avec un agent en arrière-plan quand il a fini
- Utiliser un hook Stop d'agent pour faire cela de manière plus déterministe
- Utiliser le plugin ralph-wiggum

J'utilise aussi soit `--permission-mode=dontAsk` soit `--dangerously-skip-permissions` dans un sandbox pour éviter les demandes de permission pendant la session, afin que Claude ne soit pas bloqué à m'attendre.

![Tâches de Longue Durée](Boris%20Bible12.jpeg)

---

## 13/ Boucle de Vérification

**Un dernier conseil :** probablement la chose la plus importante pour obtenir d'excellents résultats avec Claude Code -- donnez à Claude un moyen de vérifier son travail. Si Claude a cette boucle de rétroaction, cela multipliera par 2 à 3 la qualité du résultat final.

Claude teste chaque modification que je déploie sur claude.ai/code en utilisant l'extension Chrome. Il ouvre un navigateur, teste l'interface utilisateur, et itère jusqu'à ce que le code fonctionne.

> [code.claude.com/docs](https://code.claude.com/docs)

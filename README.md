# 🎓 École Interactive

Site web éducatif statique pour les élèves d'école primaire (CP, CE1, CE2, CM1, CM2).

Une application web interactive qui permet aux élèves de :
- S'identifier avec leur prénom et leur classe
- Choisir une matière (Français, Mathématiques, Sciences, etc.)
- Répondre à des QCM interactifs
- Suivre leur progression locale

## 🚀 Technologies utilisées

- **Framework** : [Astro](https://astro.build) v4.x
- **UI Components** : [Svelte](https://svelte.dev) v4.x
- **CSS** : [Tailwind CSS](https://tailwindcss.com) v3.x
- **Stockage** : LocalStorage pour la progression
- **Contenu** : QCM en fichiers Markdown avec front matter
- **Build** : Vite
- **Déploiement** : GitHub Pages avec CI/CD automatique

## 📦 Installation

### Prérequis

- Node.js 18.x ou supérieur
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**

```bash
git clone https://github.com/nakkouche/ecole-interactive.git
cd ecole-interactive
```

2. **Installer les dépendances**

```bash
make install
# ou
npm install
```

## 🛠️ Commandes disponibles (Makefile)

Le projet utilise un Makefile pour simplifier les commandes de développement :

```bash
make help        # Affiche l'aide des commandes disponibles
make install     # Installation des dépendances (npm install)
make dev         # Lancement du serveur de développement
make build       # Build de production
make preview     # Preview du build local
make clean       # Nettoyage des fichiers générés (dist, node_modules)
make deploy      # Rappel pour le déploiement via GitHub Actions
make lint        # Linting du code
make format      # Formatage du code avec Prettier
make check       # Vérification TypeScript
make test-build  # Test complet (clean + install + build)
```

### Exemples d'utilisation

```bash
# Développement
make dev

# Build de production
make build

# Nettoyage et nouveau build
make test-build
```

## 🏗️ Structure du projet

```
/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD GitHub Actions
├── src/
│   ├── components/                 # Composants Svelte réutilisables
│   │   ├── LoginForm.svelte        # Formulaire de connexion
│   │   ├── MatiereCard.svelte      # Carte de matière
│   │   ├── QuestionCard.svelte     # Affichage d'une question
│   │   ├── QCMPlayer.svelte        # Lecteur de QCM complet
│   │   ├── ScoreDisplay.svelte     # Affichage du score
│   │   └── ProgressBar.svelte      # Barre de progression
│   ├── layouts/                    # Layouts Astro
│   │   └── Layout.astro            # Layout principal
│   ├── pages/                      # Pages du site
│   │   ├── index.astro             # Page d'accueil/connexion
│   │   ├── selection.astro         # Choix de la matière
│   │   └── qcm/[id].astro          # Page QCM dynamique
│   ├── lib/                        # Utilitaires
│   │   └── qcmParser.ts            # Parser Markdown pour QCM
│   └── stores/                     # Svelte stores
│       ├── userStore.ts            # Gestion utilisateur
│       └── progressionStore.ts     # Gestion progression
├── content/
│   ├── programmes/                 # Structure programme EN (à venir)
│   └── qcm/                        # Fichiers .md des QCM
│       ├── cp-math-001.md
│       ├── cp-francais-001.md
│       ├── ce1-math-001.md
│       ├── ce1-francais-001.md
│       └── ce2-sciences-001.md
├── public/
│   ├── favicon.svg
│   └── images/
├── Makefile                        # Commandes de développement
├── astro.config.mjs                # Config Astro avec base path
├── tailwind.config.mjs             # Config Tailwind CSS
├── tsconfig.json                   # Config TypeScript
├── package.json
└── README.md
```

## 📝 Comment ajouter un QCM ?

### Format du fichier Markdown

Créer un nouveau fichier dans `content/qcm/` avec le format suivant :

```markdown
---
id: "niveau-matiere-numero"
matiere: "Mathématiques"
niveau: "CP"
titre: "Titre du QCM"
description: "Description courte du QCM"
difficulte: 1
points: 10
---

## Question 1
Texte de la question ?

- [ ] Mauvaise réponse
- [x] Bonne réponse
- [ ] Mauvaise réponse

## Question 2
Autre question ?

- [ ] Mauvaise réponse
- [x] Bonne réponse
- [ ] Mauvaise réponse
```

### Règles importantes

- **id** : Unique, format recommandé `niveau-matiere-numero` (ex: `cp-math-001`)
- **niveau** : CP, CE1, CE2, CM1 ou CM2
- **difficulte** : Nombre de 1 à 5
- **Bonne réponse** : Marquée avec `[x]`
- **Mauvaises réponses** : Marquées avec `[ ]`

### Exemples de fichiers QCM

Consultez les fichiers dans `content/qcm/` pour des exemples complets.

## 🌐 Déploiement sur GitHub Pages

### Configuration initiale

1. **Dans le repository GitHub, aller dans Settings > Pages**
2. **Source** : Sélectionner "GitHub Actions" (PAS "Deploy from branch")
3. Le site sera accessible à : `https://nakkouche.github.io/ecole-interactive/`

### Configuration Astro

Le fichier `astro.config.mjs` est déjà configuré avec le base path :

```javascript
export default defineConfig({
  site: 'https://nakkouche.github.io',
  base: '/ecole-interactive',
  // ...
});
```

**⚠️ Important** : Si vous forkez ce projet, modifiez :
- `site` : remplacez `nakkouche` par votre username GitHub
- `base` : remplacez `ecole-interactive` par le nom de votre repository

### Déploiement automatique

Le workflow GitHub Actions (`.github/workflows/deploy.yml`) se déclenche automatiquement :
- À chaque push sur la branche `main`
- Manuellement via l'onglet "Actions" sur GitHub

Le workflow effectue :
1. Installation de Node.js 20
2. Installation des dépendances (`npm ci`)
3. Build du projet (`npm run build`)
4. Déploiement sur GitHub Pages

### Déploiement manuel

Si vous souhaitez tester le build localement avant de pousser :

```bash
make test-build
```

Puis poussez sur `main` :

```bash
git add .
git commit -m "feat: ajout de nouveaux QCM"
git push origin main
```

## 🎨 Design et UX

- Interface colorée et ludique adaptée aux enfants de 6 à 11 ans
- Police lisible (Comic Neue)
- Grosses icônes et boutons
- Feedback visuel immédiat (vert ✅ / rouge ❌)
- Palette de couleurs vives mais non agressives
- Responsive (tablette et desktop prioritaires)

## 🔧 Développement

### Lancer le serveur de développement

```bash
make dev
```

Le site sera accessible à : `http://localhost:4321/ecole-interactive/`

### Linting et formatage

```bash
# Linting
make lint

# Formatage automatique
make format
```

### Vérification TypeScript

```bash
make check
```

## 📊 Fonctionnalités

### ✅ Phase 1 - MVP (Implémenté)

- Page d'accueil avec formulaire (prénom + classe)
- Page de sélection des matières avec icônes colorées
- Page QCM avec :
  - Affichage des questions une par une
  - Boutons de navigation (Précédent/Suivant)
  - Validation avec feedback visuel (vert/rouge)
  - Score final avec emoji et message encourageant
  - Révision des réponses après validation
- Stockage de la progression dans LocalStorage
- 5 QCM d'exemple (CP, CE1, CE2)

### 🚧 Phase 2 - Améliorations futures

- Dashboard de progression avec graphiques
- Animations ludiques (confetti pour bonnes réponses)
- Mode PWA (fonctionnement hors ligne)
- Export/import de progression
- Plus de QCM pour tous les niveaux
- Mode "Toutes les questions en même temps"

## 🤝 Contribution

### Ajouter des QCM

1. Créer un nouveau fichier `.md` dans `content/qcm/`
2. Suivre le format décrit dans la section "Comment ajouter un QCM"
3. Tester localement avec `make dev`
4. Soumettre une Pull Request

### Signaler un bug

Ouvrir une issue sur GitHub avec :
- Description du problème
- Étapes pour reproduire
- Navigateur et version
- Captures d'écran si possible

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## 🙏 Remerciements

- [Astro](https://astro.build) pour le framework
- [Svelte](https://svelte.dev) pour les composants interactifs
- [Tailwind CSS](https://tailwindcss.com) pour le style
- La communauté éducative pour les retours et suggestions

## 📞 Contact

Pour toute question ou suggestion, ouvrir une issue sur GitHub.

---

**Fait avec ❤️ pour les élèves d'école primaire**

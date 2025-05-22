# MyCoaching

Application de coaching moderne et intuitive, construite avec Vue 3, TypeScript et Tailwind CSS.

## 🚀 Technologies

- Vue 3 avec Composition API
- TypeScript
- Tailwind CSS
- Pinia pour la gestion d'état
- Vue Router
- Vite
- Docker
- Cypress pour les tests E2E

## 📁 Structure du Projet

```
src/
├── assets/                 # Ressources statiques
├── modules/               # Modules de l'application
│   ├── users/            # Module de gestion des utilisateurs
│   │   ├── components/   # Composants spécifiques au module
│   │   │   ├── UserFormComponent.vue
│   │   │   ├── UsersFilterComponent.vue
│   │   │   └── UsersListComponent.vue
│   │   ├── models/       # Types et interfaces
│   │   │   └── User.ts
│   │   ├── services/     # Services API
│   │   │   └── useUserService.ts
│   │   ├── store/        # Store Pinia
│   │   │   └── useUserStore.ts
│   │   └── views/        # Vues du module
│   │       └── UsersView.vue
│   └── ...               # Autres modules
├── shared/               # Composants et utilitaires partagés
│   ├── components/       # Composants réutilisables
│   │   └── sidebar/      # Composants de navigation
│   │       ├── SidebarMenuLeftComponent.vue
│   │       └── SidebarTopComponent.vue
│   └── types/           # Types globaux
├── App.vue              # Composant racine
└── main.ts             # Point d'entrée
```

## 🎨 Fonctionnalités

### Module Utilisateurs

- **Gestion des utilisateurs**

  - Liste des utilisateurs avec pagination
  - Filtrage par nom et statut
  - Création, modification et suppression d'utilisateurs
  - Interface moderne avec effets de verre (glass effect)

- **Composants**
  - `UsersListComponent` : Affichage et gestion de la liste des utilisateurs
  - `UsersFilterComponent` : Filtres de recherche et de statut
  - `UserFormComponent` : Formulaire de création/modification d'utilisateur

### Navigation

- **Sidebar**

  - Menu latéral rétractable
  - Navigation intuitive
  - Design moderne avec effets de survol

- **Barre supérieure**
  - Recherche globale
  - Notifications
  - Menu utilisateur

## 🛠 Installation

### Prérequis

- Node.js (v16 ou supérieur)
- Docker et Docker Compose (optionnel)

### Installation locale

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev

# Build pour la production
npm run build
```

### Installation avec Docker

```bash
# Construction de l'image Docker
docker build -t mycoaching .

# Démarrage du conteneur
docker run -p 3000:3000 mycoaching
```

## 🧪 Tests

### Tests unitaires

```bash
# Exécution des tests unitaires
npm run test:unit
```

### Tests E2E avec Cypress

```bash
# Exécution des tests E2E
npm run test:e2e

# Ouverture de l'interface Cypress
npm run cypress:open
```

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
VITE_API_URL=http://localhost:3000
VITE_APP_TITLE=MyCoaching
```

### Configuration Tailwind

Le projet utilise Tailwind CSS avec une configuration personnalisée dans `tailwind.config.js`.

## 🚀 Déploiement

### Production

```bash
# Build pour la production
npm run build

# Prévisualisation de la build
npm run preview
```

### Docker

```bash
# Build de l'image de production
docker build -t mycoaching:prod -f Dockerfile.prod .

# Démarrage du conteneur de production
docker run -p 80:80 mycoaching:prod
```

## 🎯 Fonctionnalités à venir

- [ ] Authentification et autorisation
- [ ] Gestion des sessions
- [ ] Tableau de bord personnalisé
- [ ] Système de notifications en temps réel
- [ ] Export de données
- [ ] Thème sombre/clair
- [ ] Tests unitaires complets
- [ ] Documentation API
- [ ] CI/CD pipeline

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commiter vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pousser vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Standards de code

- Suivre les conventions de nommage Vue.js
- Utiliser TypeScript pour tout nouveau code
- Ajouter des tests pour les nouvelles fonctionnalités
- Documenter les changements majeurs

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

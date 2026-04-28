# Configuration du Backend - La Nuit au Zénith

## 📋 Prérequis

- Node.js installé (v14 ou supérieur)
- Un compte Gmail avec les accès appropriés

## 🚀 Installation

### 1. Installer les dépendances

Ouvrez un terminal dans le dossier du projet et exécutez:

```bash
npm install
```

### 2. Configuration Gmail (IMPORTANT ⚠️)

Pour envoyer des emails via Gmail, vous devez générer un **mot de passe d'application**:

1. Allez sur: https://myaccount.google.com/security
2. Activez la **Vérification en deux étapes**
3. Retournez à https://myaccount.google.com/apppasswords
4. Sélectionnez "Mail" et "Windows"
5. Google générera un mot de passe de 16 caractères
6. Copiez ce mot de passe

### 3. Configuration du fichier .env

Ouvrez le fichier `.env` et mettez à jour:

```env
PORT=3000
EMAIL_SERVICE=gmail
EMAIL_USER=akpablaantonio@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
RECIPIENT_EMAIL=akpablaantonio@gmail.com
```

Remplacez:
- `EMAIL_USER` par votre email Gmail
- `EMAIL_PASSWORD` par le mot de passe d'application généré (sans espaces ou avec espaces, les deux fonctionnent)
- `RECIPIENT_EMAIL` par l'email où vous voulez recevoir les réservations

## ▶️ Démarrer le serveur

```bash
npm start
```

Vous devriez voir:
```
Server running on port 3000
Email recipient: akpablaantonio@gmail.com
Email service ready
```

## 🌐 Accès à l'application

- **Frontend**: http://localhost:3000
- **API Health Check**: http://localhost:3000/api/health

## 📝 Fonctionnement

1. L'utilisateur remplit le formulaire de réservation (nom + numéro)
2. Il clique sur "Réserver maintenant"
3. Les données sont envoyées au serveur via l'API `/api/reserve`
4. Le serveur envoie automatiquement un email à `akpablaantonio@gmail.com`
5. L'utilisateur est redirigé vers la page de confirmation

## 🔧 Dépannage

### Erreur: "Cannot find module 'express'"
- Exécutez `npm install` à nouveau

### Erreur: "Email configuration error"
- Vérifiez le `.env` file
- Assurez-vous que Gmail accès 2-factor est activé
- Vérifiez que le mot de passe d'application est correct

### Erreur de connexion au serveur
- Assurez-vous que le serveur tourne sur le port 3000
- Vérifiez que CORS est activé
- Essayez `http://localhost:3000/api/health` pour vérifier

## 📱 Pour déployer en production

Vous aurez besoin d'un service d'hébergement (Heroku, Vercel, AWS, etc.) et de mettre à jour l'URL dans `script.js`:

```javascript
const response = await fetch('https://votre-domaine.com/api/reserve', {
```


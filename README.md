<div align="center">
# Tests automatisés – Eco Bliss Bath

# Présentation

Ce projet contient une campagne de tests automatisés réalisée avec **Cypress**

Les tests permettent de vérifier les fonctionnalités essentielles de l’application ainsi que le comportement de l’API.

---

# Prérequis

- Node.js
- npm
- Docker
- Le front-end et l’API du projet doivent être démarrés

---

# Installation et démarrage
Clonez le projet pour le récupérer
``` 
git clone https://github.com/OpenClassrooms-Student-Center/Eco-Bliss-Bath-V2.git
cd Eco-Bliss-Bath-V2
```
Pour démarrer l'API avec ça base de données.
```
docker compose up -d
```
Installer Cypress comme dépendance de développement.
```
npm install cypress --save-dev 
```
# Pour démarrer le frontend de l'applicatif
Placez-vous dans le dossier contenant le fichier package.json du front-end :
```
npm start
```
Installez les dépendances du projet
```
npm i
ou
npm install
```
# Lancement des tests Cypress

Les tests automatisés sont réalisés avec Cypress.

Assurez-vous que l’API et le front-end de l’application sont bien démarrés avant de lancer les tests.

# Lancer Cypress en mode interface graphique

Depuis la racine du projet, exécutez la commande suivante :
```
npx cypress open
```
Cette commande ouvre l’interface graphique de Cypress et permet de lancer les tests manuellement.


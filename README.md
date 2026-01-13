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

# Lancer Cypress en mode headless
Pour exécuter l’ensemble des tests en ligne de commande, utilisez :
```
npx cypress run
```
Les tests sont alors exécutés automatiquement sans interface graphique.

# Génération du rapport en mode interface graphique

La génération du rapport en mode interface graphique s’effectue lors de l’exécution des tests via l’interface Cypress.
Sélectionnez ensuite le navigateur puis le scénario de test à exécuter.

Après l’exécution des tests :

- les captures d’écran des tests en échec sont générées dans le dossier cypress/screenshots
- les vidéos ne sont pas générées par défaut en mode interface graphique

Les captures d’écran permettent d’analyser les erreurs rencontrées lors de l’exécution des tests.


# Génération du rapport en mode headless
La génération du rapport de tests se fait automatiquement lors de l’exécution des tests Cypress en mode headless.

À la fin de l’exécution, Cypress génère :
- des vidéos d’exécution des tests dans le dossier cypress/videos
- des captures d’écran en cas d’échec dans le dossier cypress/screenshots

Ces fichiers constituent le rapport de tests et permettent d’analyser le déroulement des scénarios et les éventuelles erreurs.




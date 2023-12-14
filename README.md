---
title:  |
    ![](public/argonaultes-logo.png){width=1in}\textsuperscript{\textcopyright}\break
    QCM Backend ExpressJS
author:
- Gaël Roustan (Argonaultes)
logo: 'public/argonaultes-logo.png'
date: "2023-2024"
keywords: [backend,framework,javascript,express,node]
abstract: |
  Ce document présente les étapes détaillées pour une première utilisation du framework ExpressJS

header-includes: |
    \usepackage{fancyhdr}
    \pagestyle{fancy}
    \fancyhead[L,C]{}
    \usepackage{fvextra}
    \DefineVerbatimEnvironment{Highlighting}{Verbatim}{breaklines,commandchars=\\\{\}}
include-before:
- '`\newpage{}`{=latex}'    
colorlinks: true
...


\newpage{}

# QCM Backend ExpressJS

Etape par étape

# Besoins

1. créer une application web expressjs qui permet de créer des QCMs notés et donc ensuite de partager un lien unique pour répondre à ce QCM et être ainsi noté.
1. transformer cette application web en API

# Architecture globale du projet

Un desing pattern d'architecture que nous allons utiliser pour construire notre application avec ExpressJS : MVC
- Model
- View
- Controler

![mvc schema](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/MVC-Process.svg/1920px-MVC-Process.svg.png)

Source : [wikipedia](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/MVC-Process.svg/1920px-MVC-Process.svg.png)

## Avantage

L'ensemble du code de notre application sera donc organisé selon ce découpage. L'intérêt de ce découpage réside notamment dans la possibilité de changer de moteur de rendu sans avoir d'impact sur le code restant qui s'occupe des entités ou bien des traitements à effectuer sur ces entités pour les renvoyer à l'utilisateur.

# Dépendances principales utilisés

- [expressjs](https://expressjs.com/)
- [dotenv](https://www.dotenv.org/docs/quickstart)


# Initialisation du projet au format NPM

```bash
npm init 
```

une série de questions apparaît auxquelles il faut répondre ou laisser une réponse vide pour ignorer la question

le fichier `package.json` créé doit ressembler au fichier suivant

```json
{
  "name": "qcm-backend-expressjs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "argonaultes",
  "license": "ISC"
}

```

Vous remarquerez notamment la partie `scripts` qui n'a pas été encore remplie. Nous allons compléter cette partie au fur et à mesure du projet.

# Installation de la dépendance ExpressJS

```bash
npm install express --save
```

Cette commande a provoqué 2 changements
- la modification du fichier package.json avec l'ajout du bloc
```json
  "dependencies": {
    "express": "^4.18.2"
  }
```
- la création d'un dossier `node_modules` à la racine du projet qui stocke les dépendances nécessaires pour répondre au besoin des dépendances spécifiées dans le fichier `package.json`

# Point d'entrée

Lors de l'initialisation du projet, nous avons spécifié le point d'entrée étant `index.js`. Créons ce fichier et initialisons le avec le code de démarrage du serveur express.

```javascript
const express = require('express');

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
});
```

pour démarrer ensuite le projet, exécuter la commande dans le terminal

```bash
node index.js
```

Essayer ensuite d'afficher la page d'accueil en allant à l'adresse indiquée.

Le serveur répond avec un message d'erreur

```
Cannot GET /
```

Cela signifie que le serveur est bien démarré mais qu'il n'existe aucun chemin disponible et notamment le chemin `/` qui représente la racine de votre serveur.

## Routing

Ajoutons cela toujours dans le fichier index.js

```javascript
app.get('/', (req, res) => {
    res.send('Hello World');
});
```

Ce nouveau code se découpe en plusieurs parties

`app.get()` indique que le chemin sera accesible selon le verbe HTTP GET. C'est à dire que l'on cherche avec notre navigateur à récupérer des ressources. L'autre verbe que nous utiliserons sera le POST, et donc il existe une méthode `app.post()`.

La fonction `app.get()` prend en paramètre 2 éléments :
1. le chemin qui doit être utilisé par le navigateur
1. la fonction qui doit être appelée lorsque le chemin `/` sera rencontré

Pour la fonction, nous utilisons la notation flèche, mais il est tout à fait possible de passer directement le nom de la fonction sotckée dans une variable soit en notation flèche ou en notation plus classique

notation flèche

```javascript
const welcome = (req, res) => {
    res.send('Hello Big World');
};
```

notation function

```javascript
const welcomeFunction = function(req, res) {
    res.send('Hello world function');
}
```

La fonction doit nécessairement prendre en paramètre `req` et `res` qui représentent l'objet requête et l'objet réponse.

## Watcher

A ce stade, nous avons déjà dû éteindre et rallumer le serveur une dizaine de fois. Pour éviter cette manipulation, il est possible d'utiliser un utilitaire qui s'occupe de redémarrer pour nous le processus node à chaque fois qu'un changement sur les fichiers importants est détecté. L'un de ces utilitaires est [`nodemon`](https://nodemon.io/). Pour l'installer

```bash
npm install nodemon --save-dev
```

L'exécution de cette commande va donc ajouter une section dans le fichier package.json

```json
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
```

ce qui va rendre accessible, dans notre environnement de développement l'utilitaire nodemon.

Pour le lancer, nous utilisons la commande 

```bash
npx nodemon index.js
```

Plus besoin de recharger le code, seulement de bien penser à sauvegarder le fichier à chaque fois.

Il est possible de créer un alias pour cette commande en modifiant le fichier package.json. Pour cela, il faut ajouter la ligne

```json
    "monitor": "npx nodemon index.js",
```

dans la section `scripts` ce qui donne

```json
  // ...
  "scripts": {
    "monitor": "npx nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ...
```

pour lancer maintenant cette règle

```bash
npm run monitor
```

# Ressources statiques

Pour finir, nous allons ajouter un dossier avec quelques ressources statiques comme certaines images par exemple dans un dossier souvent appelé public.

ajouter la ligne

```javascript
app.use(express.static('public'));
```

créer ensuite un dossier `public` à la racine de votre projet puis un fichier à l'intérieur de ce dossier `public` que nous appellerons `notanimage.txt`. Dans ce fichier, écrivez par exemple 

```raw
hello world from static ressource
```

Puis tentez d'accéder à l'adresse http://localhost:3000/notanimage.txt


# Moteur de rendu

Nous avons affiché du texte brut. Regardons comment utiliser à la place un moteur de rendu. Plusieurs sont possibles avec expressjs, nous utiliserons [EJS](https://ejs.co/) qui est un peu plus verbeux et qui se rapproche donc le plus du HTML.

Les autres moteurs de template possibles sont :
- Jade
- Mustache
- Dust
- Pug

Commençons par  installer le paquet EJS

```bash
npm install ejs
```

La ligne suivante est ajoutée au fichier `package.json`

```json
    "express": "^4.18.2"
```



Indiquer ensuite à ExpressJS quel sera le moteur de rendu.


Un fichier utilisant le moteur de rendu ejs doit se baser sur les structures suivantes :

- contrôle du flux (conditions, boucles, etc.) : `<% %>`
- affichage échappé de l'expression résolue : `<%= %>`
- affichage brut de l'expression résolue : `<%- %>`
- inclusions de différentes vues dans une autre vue : `<%- include('file.ejs') -%>`

Les autres éléments sont consultables dans la documentation officielle.

Un fichier utilisant le moteur de rendu EJS doit avoir l'extension `.ejs`.



Créons un premier fichier ejs qui affiche la sortie brute

```ejs
<html>

</html>
```

```javascript
const welcomeRender = (req, res) => {
    res.render('index.ejs')
}
```

Par défaut, comme nous le présentions au début, ExpressJS respecte le design pattern MVC, donc par défaut, tous les fichiers impliqués dans la partie view sont dans un dossier views.

Si vous ne souhaitez pas utiliser le dossier par défaut, il estp ossible de modifier la propriété `views` à la valeur de votre choix

```javascript
app.set('views', '.');
```

dans notre architecture cible, nous allons déposer tous nos fichiers dans un sous-dossier `src`.

Créer un dossier src et déplacer le fichier `index.ejs`.

Effectuer les modifications nécessaires pour l'application continue d'afficher la vue `index`.

Une fois fait, tester de modifier le contenu de la vue, et vérifier que la mise à jour est automatiquement visible dans le navigateur après une actualisation.


# Controleur

# Afficher la liste des QCM

Pour afficher la liste des QCMs, nous devons effectuer les opérations suivantes :
- ajouter une nouvelle vue qui permet de lister les QCMs (liste en dur dans le fichier pour le moment)
- ajouter un point d'accès à cette vue

## Nouvelle vue

nous ajoutons dans le fichier index.js

```javascript
const listQcms = (req, res) => {
    res.render('qcms.ejs');
}
```

nous créons un nouveau fichier dans le dossier `src/views` appelé `qcms.ejs`.

qui doit afficher la liste des qcms avec

```html
<html>
  <head>
  </head>
  <body>
    <ul>
        <li>BDD</li>
        <li>Javascript</li>
        <li>Python</li>
        <li>Anglais</li>
    </ul>
  </body>
</html>
```


## Nouveau point d'entrée

et nous ajoutons un point d'accès à cette vue

```javascript
app.get('/qcms', listQcms);
```


## Améliorations

Sauf que nous sommes en train de répéter régulièrement du code :
- les en-têtes et pieds de page 
- les extension de fichier dans le fichier index.js

### Vue partielles



Pour améliorer et factoriser le code relatif aux vues, il est possible d'éclater le code dans plusieurs fichiers et de faire référence à différents fichiers dans un unique fichier.

Par exemple, il est possible de créer un fichier `header` qui serait inclus ensuite dans l'ensemble des vues qui auraient besoin d'un en-tête.

créer un fichier `header.ejs` à la racine du dossier src/views et déplacer la partie relative à l'en-tête dans ce nouveau fichier

```html
<html>

<head>

</head>

<body>
```

et dans le fichier index.ejs

```html
<%- include('header') -%>
    <p>Hello world function</p>
<%- include('footer') -%>
```

Ajouter la balise `<title>` dans la vue partielle header et vérifier que la balise est bien prise en compte à travers les 2 vues.

### Propriété du moteur de template

Plutôt que d'écrire le nom des fichiers vue avec l'extension, il est possible de spécifier le moteur de rendu que ExpressJS doit utiliser dans le cas de l'appel à la méthode render.

```javascript
app.set('view engine', 'ejs');
```

Vous pouvez maintenant supprimer l'extension des différents appels à la méthode `render`.

# Controleurs

Nous avons créé pour l'instant 2 fonctions dites `handler` c'est à dire qu'elles sont utilisées en tant que fonction de rappel (callback) en paramètre de la définition d'un point d'accès.

Ces fonctions sont le point de départ de nos contrôleurs, puisqu'elles indiquent quelles vues doivent être utilisées pour un chemin donné.

Déplaçons ces fonctions dans un espace réservé aux controleurs.

Créer un dossier `src/controllers/` et créer 2 fichiers
- welcome.js
- qcm.js

Dans le fichier `src/controllers/welcome.js`

```javascript
const welcomeRender = (req, res) => {
    res.render('index');
}
module.exports = welcomeRender;
```

Dans le fichier index.js


```javascript
const welcomeController = require('./src/controllers/welcome');

//...

app.get('/', welcomeController);

```





Attention, ici, nous utilisons partout la syntaxe des CommonsJS pour s'assurer la bonne compatibilité avec les anciennes manières de réaliser des projets Javascript modulaires et rester compatible avec les anciennes versions de Node. L'alternative est la syntaxe ESModules.

Faites de même pour le contrôleur `qcm`.

# Points d'accès

Nous avons ajoutons un second point d'accès et ce n'est que le début. Ces différents points d'accès sont aussi appelés des routes. Ces différentes routes peuvent être regroupées dans un fichier unique que nous appellerons router.js.

Une route est associée depuis le début du TP à une unique fonction ou unique `handler`. Il est possible d'attacher plus d'un handler à une route, en passant par les `middleware`. Un middleware est donc un traitement intermédiaire effectué sur la requête en cours.

Déplaçons la définition des routes dans cet unique fichier au format CommonJS, c'est-à-dire :

...


# Vues dynamiques

Nos vues pour l'instant, même si on a réussi à les découper affichent des informations statiques.

C'est d'ailleurs l'autre avantage d'utiliser un moteur de template, c'est d'être en mesure d'effectuer un rendu de ces vues avec du contenu dynamique, c'est à dire du contenu qui provient du controleur.

Reprenons l'exemple de la liste des QCMs, il faudrait que la liste soit envoyée par le controleur et non plus stockée directement dans la vue. Pour quelle raison ? Car si c'est dans le contrôleur, il est fort probable que ce soit plus simple dans la suite de nos évolutions de nous connecter depuis notre contrôleur à une bnase de données par exemple, récupérer du contenu et le transmettre ensuite à notre vue.

Pour afficher du contenu dynamique dans notre vue, il faut utiliser les autres contrôles de séquence vue plus haut, à savoir les contrôles :
- de flux : `<% %>`
- de résolution d'expression et d'affichage : `<%= %>`

Dans la vue qcm, il faut donc remplacer le code existant par cette première version qui va itérer sur l'ensemble des éléments contenus dans la liste qcms.

```html
<ul>
    <% for (qcm of qcms) { %>
        <li>BDD</li>
        <li>Javascript</li>
        <li>Python</li>
        <li>Anglais</li>
    <% } %>
</ul>
```

Et ensuite, plutôt que d'écrire en dur le nom du QCM, il faut reprendre le nom du QCM porté par l'élément

```html
<ul>
    <% for (qcm of qcms) { %>
        <li><%= qcm %></li>
    <% } %>
</ul>

```

Si vous tentez d'afficher la page modifiée, vous aurez le message d'erreur suivant

```raw
ReferenceError: /education/qcm-backend-expressjs/src/views/qcms.ejs:4
    2| 
    3| <ul>
 >> 4|     <% for (let qcm of qcms) { %>
    5|         <li><%= qcm %></li>
    6|     <% } %>
    7| </ul>

qcms is not defined

```

C'est parce que le controleur n'a pas envoyé ou défini la variable qcms. Pour réaliser cette opération, allez dans le fichier `src/controllers/qcm.js` et modifier le fichier

```javascript
    const qcms = [
        'BDD', 'Javascript', 'Framework', 'Python'
    ];
    res.render('qcms', {qcms});
```

Ici nous déclarons une constante qui contient une liste de chaine de caractères puis nous la transmettons à la méthode `render` en utilisant le raccourci `{qcms}` plutôt que d'écrire  `{"qcms": qcms}`

# Navigation dans l'application

Nous avons affiché une page qui liste l'ensemble des QCMs disponibles. Nous allons maintenant rajouter un menu qui va nous permetttre de naviguer entre la page d'accueil et la page qui liste tous les QCMs. Ainsi, pour les futures fonctionnalités, nous allons intégrer ensuite les accès aux futures pages directement dans ce menu.

Pour ajouter un menu accessible depuis toutes les pages, nous modifions la vue `header.ejs`.

Le fichier css correspondant doit être déposé dans le dossier des ressources statiques créés au début du projet.

```css
.menu > ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.menu > ul > li {
    display: inline;
}

.menu > ul > li > a {
    text-decoration: none;
    background-color: black;
    color: white;
    padding: 10px;
}
```

Et le fichier d'en-tête contient le code 

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Mes QCMs</title>
    <link rel="stylesheet" href="menu.css">
</head>

<body>
    <div class="menu">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/qcms">QCMs</a></li>
        </ul>
    </div>

```

Ainsi, toutes vos vues actuelles et futures vues qui incluent cette vue partielle pourront profiter de la définition du menu. 

# Les modèles

Notre application affiche des informations dynamiques mais les controleurs définissent toujours en dur des valeurs. Il est donc temps de faire en sorte que nos controleurs s'appuient sur des modèles, c'est à dire des classses qui vont définir les objets métier que l'on souhaite manipuler dans cette application.

Ce sont les modèles qui seront responsables d'interroger la bonne source de données selon le bon format pour permettre au controleur de manipuler ces données et de demander à la vue de les afficher.

Créons un dossier `models` et ajouter 1 modèle pour représenter un QCM. Un QCM doit avoir un nom, un thème et un sujet. Il faut donc créer une classe Javascript qui représente ce modèle.

```javascript
class Qcm {
 
    constructor(name, theme, subject) {
        this.name = name;
        this.theme = theme;
        this.subject = subject;
    }
}
```


Grâce à ce modèle, faisons en sorte maintenant qu'une autre classe dite utilitaire s'occupe de centraliser les accès.

```javascript
const Qcm = require('./qcm');

const all_my_qcms = [
    new Qcm('BDD', 'sql', 'sql'),
    new Qcm('Javascript', 'dev', 'dev'),
    new Qcm('Framework', 'dev', 'design'),
    new Qcm('Python', 'dev', 'design')
];

module.exports = all_my_qcms;
```

Utilisons à présent ce modèle dans notre controleur

```javascript
const qcms = require('../models/database');

const listQcms = (req, res) => {
    res.render('qcms', {qcms});
};
```

A présent, nous pourrions avoir envie d'obtenir plus d'information sur un QCM avant d'y participer

Pour cela, nous devons rajouter une nouvelle vue qui va donner plus de détails sur un qcm donné.

Pour obtenir plus d'information sur un QCM, nous allons fournir un identifiant, et cet identifiant permettra de retrouver de manière unique ce QCM dans notre liste. Plusieurs évolutions à appliquer :
- ajouter un attribut id à notre classe
- ajouter au controler QCM une nouvelle méthode pour récupérer l'identifiant fourni par la requête utilisateur
- créer une nouvelle vue qui permet d'afficher effectivement le QCM avec tous les détails
- créer un nouveau point d'accès pour accéder effectivement à cette nouvelle vue

## Attribut id à la classe Qcm

```javascript
    #id;
    #name;
    #theme;
    #subject;
 
    constructor(id, name, theme, subject) {
        this.#id = id;
        this.#name = name;
        this.#theme = theme;
        this.#subject = subject;
    }

    get id() {
        return this.#id;
    }
```

## Nouvelle fonction dans le controleur Qcm

Ajouter une nouvelle méthode au contrôleur qui récupère un paramètre id fourni dans la requête utilisateur


```javascript
    const id = req.params.id;
```

Utiliser ce paramètre pour le passer à la fonction de recherche suivant cet `id`

```javascript
    const qcm = qcms.find((element) => element.id == id);
```

Une fois l'élément trouvé, passer le QCM en question à votre nouvelle vue.

```javascript
    res.render('qcm', {qcm});
```

Avant de passer à la création de la vue, n'oubliez pas d'exporter cette nouvelle méthode de controleur à la fin de votre fichier

```javascript
module.exports = {listQcms, getOneQcm};
```

Et dans le fichier index.js qui liste les points d'accès, modifier l'utilisation du controleur comme suit

```javascript
app.get('/qcms', qcmController.listQcms);

app.get('/qcm/:id', qcmController.getOneQcm);
```

Attention, ici nous introduisons une nouvelle notion de paramètres dans les routes. La syntaxe suit le modèle `:nom` où `nom` sera le nom du paramètre. Dans notre cas, nous souhaitons nommer notre paramètre `id`.



 Nous devons maintenant créer cette nouvelle vue permettant de lister

```html
        <div>
            Nom du QCM : <%= qcm.name %>
        </div>
        <div>
            Thème : <%= qcm.theme %>
        </div>
        <div>
            Sujet : <%= qcm.subject %>
        </div>
```

Pensez à ajouter les inclusions des en-têtes et pieds de page.

Et que se passe-t-il si l'utilisateur saisit un identifiant qui n'existe pas ou tout simplement un identifiant invalide qui fait qu'il n'y a pas d'élément correspondant ?

```raw
TypeError: /qcm-backend-expressjs/src/views/qcm.ejs:4
    2| 
    3|         <div>
 >> 4|             Nom du QCM : <%= qcm.name %>
    5|         </div>
    6|         <div>
    7|             Thème : <%= qcm.theme %>

Cannot read properties of undefined (reading 'name')
```

Pour éviter cela, il peut être intéressant de vérifier dans la vue que l'élément transmis existe bien.

```javascript

```

Maintenant que nos popuvons lister l'ensemble des QCMs et que nous sommes en mesure d'afficher le détail d'un formulaire, nous avons également besoin d'en ajouter ou d'en supprimer.

Commencez par créer un formulaire, donc une vue, pour créer un nouveau QCM.

La nouvelle vue est `newqcm.ejs`

```html
<form>
    <label>Nom</label>
    <input id="name" type="text">
    <label>Sujet</label>
    <input id="name" type="text">
    <label>Theme</label>
    <input id="name" type="text">
    <button type="submit" value="Create"></button>
</form>
```

Pour afficher ce formulaire, il faut doter notre application d'un point d'accès, donc retourner dans le fichier `index.js` et ajouter une route.

```javascript
app.get('/qcm/new', qcmController.displayNewForm);
```

Pour l'instant, le `handler` `qcmController.displayNewForm` n'existe pas, il faut donc aller le créer dans le contrôleur.

```javascript
const displayNewForm = (req, res) => {
    res.render('newqcm');
};
```

Attention à bien modifier également l'instruction d'export de ce fichier afin de bien exposer cette nouvelle méthode.

Une fois créé, vous pouvez directement tenter d'accéder à l'adresse : http://localhost:3000/qcm/new

2 choses :
- comment faire que le formulaire soit accessible depuis toutes les pages de notre application ?
- comment faire que le remplissage du formulaire donne effectivemet lieu à la création d'un nouvel élément ?

Pour accéder à notre formulaire depuis toutes les pages, nous ajoutons la nouvelle entrée dans notre menu présent dans l'en-tête.

A vous de l'ajouter.

Pour effectivement traiter notre formulaire [`forms`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form), il faut lui associer une action et une méthode.

Pour l'action, nous devons lui indiquer un point d'accès qui permet de gérer le contenu du formulaire. Créons un nouveau point d'accès `/qcm/process`

```javascript
app.post('/qcm/process', qcmController.processNewForm);
```

Attention à l'ordre des instructions pour la création des points d'accès. Cette nouvelle route est à placer avant la route contenant un paramètre.

La différence principale avec les routes créés précédemment porte sur le verbe qui n'est plus `GET` mais `POST` puisque cette fois-ci, nous décidons de créer une ressource sur le serveur distant, et nous allons donc transmettre les informations de création dans le corps de la requête.

Allons dans le controleur pour créer le handler correspondant.

Ce handler est différent puisqu'il doit permettre la création d'un objet en récupérant les informations dans le corps de la requête.

```javascript
const processNewForm = (req, res) => {
    console.log(req.body);
};
```

Pour rediriger ensuite l'utilisateur, comme indiqué dans la documentation sur le [routing](https://expressjs.com/en/guide/routing.html), nous utilisons la méthode [`redirect`](https://expressjs.com/en/4x/api.html#res.redirect) sur la liste des qcms.

```javascript
res.redirect('/qcms');
```

Pour l'instant dans la console, nous avons `undefined`. Pour permettre à expressJS de récupérer le contenu du corps de la requête et nous le mettre à disposition, il faut ajouter l'option suivante au démarrage du service

```javascript
app.use(express.urlencoded({ extended: true }));
```

Tentons de nouveau de créer un QCM en passant par le formulaire.

Cette fois-ci nous obtenons un objet vide `{}`. 

Nous devons nommer correctement les différents champs du formulaire en ajoutant l'attribut `name` pour chaque balise `input`.

Une fois rajouté, vous devriez avoir dans la console

```json
{ name: 'qcm1', subject: 'sujet1', theme: 'theme1' }
```

Ajoutons une méthode à notre référentiel de données en mémoire `qcms` pour ajouter à la liste des QCMs un nouveau QCM.

```javascript
qcms.addQcm(req.body);
```

Dans le fichier database.js, ajouter la fonction `addQcm` ainsi qu'une variable globale pour le suivi du prochain id à affecter au nouvel objet créé.

```javascript
// variable à portée globale qui permet de centraliser et suivre le prochain identifiant
let nextId = 5;

function addQcm(qcmObject) {
    allMyQcms.push(
        new Qcm(nextId++, qcmObject.name, qcmObject.theme, qcmObject.subject)
    );
}
```



## Factorisation des routes

Nous avons déjà créé plusieurs routes qui commencent toutes par QCM. ExpressJS permet de factoriser ces définitions de route en définissant effectivement un router.

Pour cela, nous créons un nouveau fichier `router.js`. La structure de ce fichier doit respecter le format suivant.

```javascript
const express = require('express');
const router = express.Router();

// vos routes ici

module.exports = router;
```

Puis dans le fichier `index.js`, nous importons le router et l'ajoutons à notre application

```javascript
app.use(router);
```

Nous venons ainsi de créer notre premier middleware.


Dans le fichier router, nous avons encore quelques opérations à réaliser
- déplacer toutes les routes définies auparavant dans index.js
- remplacer la définition des routes sur l'objet app par l'objet router que l'on instancie dans le nouveau fichier
- récupérer les imports des controllers

Une fois ces modifications effectuées, il nous reste à factoriser effectivement les routes. Avant, vérifions que tout fonctionne correctement.

Maintenant, nous pouvons factoriser les routeurs en créant un nouveau dossier et en séparant toutes les routes relatives.


Transformation en accès à une base de données





# Authentification


# Middleware

Créer un middleware qui trace chaque requete

Créer un middleware qui vérifie si l'utilisateur est authentifié



# Passage de l'application web en API

le moteur

```javascript
res.json(yourObjects);
```
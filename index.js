const express = require('express');
//Application Express
const app = express();

//Import des definitions de routes pour les qcms et les questions

const routerQuestion = require('./routers/questionroute');
const routerQcm = require('./routers/qcmroute');
const routerWelcome = require('./routers/welcomeroute');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

const port = 3000;

//Association des routes a l'application
app.use(routerWelcome);

//Association avec definition d'un prefixe, c'est à dire que toutes les routes associées seront accessibles avec le préfixe /qcms
app.use('/qcms', routerQcm);
app.use('/questions', routerQuestion);

app.listen(port, () => {
    console.log(`Ecoute uniquement sur http://localhost:${port}`);
});

// q: what is the url that will display the list of questions?
// a: http://localhost:3000/questions
// q:what is the url that will display the form to create a new question?
// a: http://localhost:3000/questions/new
// q: what is the url that will display the list of qcms?
// a: http://localhost:3000/qcms
// q: what is the url that will display the form to create a new qcm?
// a: http://localhost:3000/qcms/new
const express = require('express');
//Application Express
const app = express();

//Import des definitions de routes
const routerWelcome = require('./routers/welcomeroute');
const routerQcm = require('./routers/qcmroute');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

const port = 3000;

//Association des routes a l'application
app.use(routerWelcome);
//Association avec definition d'un prefixe, c'est à dire que toutes les routes associées seront accessibles avec le préfixe /qcms
app.use('/qcms', routerQcm);

app.listen(port, () => {
    console.log(`Ecoute uniquement sur http://localhost:${port}`);
});
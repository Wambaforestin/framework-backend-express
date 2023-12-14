const express = require('express');
const router = express.Router();

const {welcomeMessage, welcomeMessageFunction, testEjsView} = require('../controllers/welcome');

// DEBUT DES ROUTES

router.get('/', welcomeMessage);

router.get('/welcome2', welcomeMessageFunction);

router.get('/testejs', testEjsView);

//FIN DES ROUTES

module.exports = router;
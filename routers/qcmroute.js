const express = require('express');
const router = express.Router();


const {displayQcms, displayFormQcm, createNewForm, displayQcmJson, displayQcmDetailed} = require('../controllers/qcms');


// DEFINITION DES ROUTES

router.get('/', displayQcms);

//point d'acces pour afficher le detail d'un QCM
router.get('/:qcmid', displayQcmDetailed)
// permet l'utilisation de localhost:3000/qcms/2
// qui affiche le qcm ayant pour id 2
// req.params.qcmid
router.get('/json', displayQcmJson);

router.get('/new', displayFormQcm); //handler

router.post('/new', createNewForm);


//FIN DES ROUTES


module.exports = router;
// creation des routes pour les questions
const express = require('express');
const router = express.Router();


const {displayQuestions, displayFormQuestion, createNewForm, displayQuestionJson, displayQuestionDetailed} = require('../controllers/questions');


// DEFINITION DES ROUTES
router.get('/', displayQuestions);

router.get('/json', displayQuestionJson);

router.get('/new', displayFormQuestion); //handler

router.post('/new', createNewForm);

router.get('/:questionid', displayQuestionDetailed)

//FIN DES ROUTES

module.exports = router;


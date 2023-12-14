// creatting a controller for all the questions and before that we need to import the model of the questions from the models folder(inmomeryQ.js)
const {questions, addQuestion} = require('../models/inmemoryQ');
// const qcms = require('../models/inmemory').qcms;
const displayQuestions = (req, res) => {
    for (let question of questions) {
        console.log(`${question.nbpoints}: ${typeof(question.nbpoints)}`);
    }
    res.render('questions', {questions: questions});
};

const displayQuestionDetailed = (req, res) => {
    const id = Number(req.params.questionid);
    console.log(id);
    const question = questions.find((element) => element.id === id);
    res.render('question', {question});
}

const displayQuestionJson = (req, res) => {
    res.json({questions});
}

const displayFormQuestion = (req, res) => {
    res.render('newquestion');
};

const createNewForm = (req, res) => {
    console.log(req.body);
    addQuestion({
        name: req.body.name,
        subject: req.body.subject,
        nbpoints: req.body.nbpoints
    });
    res.redirect('/questions');
};

module.exports = {displayQuestions, displayFormQuestion, createNewForm, displayQuestionJson, displayQuestionDetailed};
// creating the inmemory queue model for the questions.
const Question = require('./questions');
const questions = [
    // creation des nouvelles questions 
    new Question({id: 0, name: 'question1', nbpoints: 5, subject: 'math'}),
    new Question({id: 1, name: 'question2', nbpoints: 10, subject: 'math'}),
    new Question({id: 2, name: 'question3', nbpoints: 15, subject: 'math'}),
    new Question({id: 3, name: 'question4', nbpoints: 20, subject: 'math'}),
]
  

const addQuestion = (rawObject) => {

    let maxId = 0;
    //recupere l'id le plus grand
    questions.forEach((question) => {
        if (maxId < question.id) {
            maxId = question.id;
        }
    }); 
    // creation des qesution avec l id max
    const question = new  Question(
        {
            id: maxId + 1,
            name: rawObject.name,
            subject: rawObject.subject,
            nbpoints: Number(rawObject.nbpoints)
        });
    // ajout des questions a la liste
    questions.push(question);
}

module.exports = { questions, addQuestion };
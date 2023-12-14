// creating our Question model
 class Question {
    
    #id;
    #name;
    #subject;
    #nbpoints;
    constructor(questionToCreate) {
        this.#id = questionToCreate.id;
        this.#name = questionToCreate.name;
        this.#subject = questionToCreate.subject;
        this.#nbpoints = questionToCreate.nbpoints;
    }

    get id() {
        return this.#id;
    }
    
    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get subject() {
        return this.#subject;
    }

    get nbpoints() {
        return this.#nbpoints;
    }

    toJSON(key) {
        console.log(key);
        return {id: this.#id, name: this.#name};
    }

 }

    module.exports = Question;
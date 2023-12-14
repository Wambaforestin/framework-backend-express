
const welcomeMessage = (request, response) => {
    response.send('Bienvenue');
};

const welcomeMessageFunction = function(request, response) {
    response.send('Bienvenue from function');
};

const testEjsView = (req, res) => {
    res.render('welcome');
};

module.exports = {welcomeMessage, welcomeMessageFunction, testEjsView};

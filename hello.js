var builder = require('botbuilder');
var restify = require('restify');

var connector = new builder.ChatConnector(); //creates connector
var bot = new builder.UniversalBot(connector); // creates bot


/*bot.dialog('/', function(session) {
    //session.send('Hello, bot!') // dialog
    var userMessage = session.message.text;
    session.send('you said: ' + userMessage);

});*/

bot.dialog('/', [
    function(session) {
        builder.Prompts.text(session, 'Hello, what is your name?');
    },
    function(session, result) {
        session.send('Hi ' + result.response + '! What can I do for you today?');
    }
]);


var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
server.post('/api/messages', connector.listen());

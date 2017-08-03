var builder = require('botbuilder');
var restify = require('restify');
var dotenv = require('dotenv').config(); //I DONT KNOW IF THIS IS RIGHT

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});


var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector); // creates bot
server.post('/api/messages', connector.listen());


/*bot.dialog('/', function(session) {
    //session.send('Hello, bot!') // dialog
    var userMessage = session.message.text;
    session.send('you said: ' + userMessage);

});*/

/*bot.dialog('/', [
    function(session) {
        builder.Prompts.text(session, 'Hello, what is your name?');
    },
    function(session, result) {
        session.send('Hi ' + result.response + '! What can I do for you today?');
    }
]);*/

bot.dialog('/', [
    function (session){
        session.beginDialog('/phonePrompt');
    },
    function (session, results) {
        session.send('Got it, your number is: %s', results.response);
    }
]);

bot.dialog('/phonePrompt', [
    function(session, args) {
        if (args && args.reprompt) {
            builder.Prompts.text(session, "What is your phone number?");
        } else {
            builder.Prompts.text(session, "Please enter in xxx-xxx-xxxx format")
        }
    },
    function (session, results) {
        var matched = results.response.match(/\d+/g);
        var number = matched ? matched.join('') : '';
        if (number.length == 10) {
            session.endDialogWithResult({response: number });
        } else {
            session.replaceDialog('/phonePrompt', {reprompt: true});
        }
    }
]);




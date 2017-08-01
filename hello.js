var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen(); //creates connector
var bot = new builder.UniversalBot(connector); // creates bot
bot.dialog('/', function(session) {
    session.send('Hello, bot!') // dialog
});

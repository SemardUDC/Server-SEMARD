// Activating the NodeJS module
var http = require('http');

function onRequest(request, response) {
    console.log("A user made a request" + request.url); //Request.url allows me to know what is the user requesting
    response.writeHead(200, { "Content-Type": "text/plain" }); //The code and the kind of data we are sending back
    response.write("Here is some data"); //This is going to be printed on the user's screen throught the browser
    response.end();
}

http.createServer(onRequest).listen(8888);
console.log("The NodeJS's server is now running...");
    
/*
Imports the Node.js core http module (or with node:http).
Creates an HTTP server with the http.createServer method.
Set the response status code to 200
Sets the response header: Content-Type: text/html
Sends an HTML response body containing any message.
Make the server listen to the port 3000
*/
import { createServer } from "node:http";

// i parametri di cui ha bisogno sono una request e una response

const server = createServer((request, response) => {
  console.log("request received"); //stampiamo che la funzione è partita

  response.statusCode = 200; //ma sarà il setting dello statusCode a dire che la risposta è OK

  response.setHeader("Content-Type", "text/html"); // qui gli vado a dire che l'header della risposta HTTP ha come content Type text/html

  response.end("<html><body><h1>Hello World<h1></body></html>"); // e questo è il corpo della mia risposta appunto del testo html
});

server.listen(3000, () => {
  console.log("Il server sta funzionando sulla porta 3000");
});

import { createServer } from "node:http";

// i parametri di cui ha bisogno sono una request e una response

const server = createServer((request, response) => {
    console.log("request received"); //stampiamo che la funzione è partita

    response.statusCode = 200; //ma sarà il setting dello statusCode a dire che la risposta è OK

    response.setHeader("Content-Type", "application/json"); // qui gli vado a dire che l'header della risposta HTTP ha come content Type text/html

    const jsonResponseBody = JSON.stringify({ location: "Mars" });

    response.end(jsonResponseBody); // e questo è il corpo della mia risposta appunto del testo html
});


server.listen(3000, () => {
    console.log("Il server sta funzionando sulla porta 3000");
});


//il server alla risposta invia una risposta http e dice che il content lenght è 19!
/*
Create a script that uses the Node.js core fs.writeFile()
(callback API) method to write a text file.
The documentation for this method is on the Node.js File system page.
 */

import {writeFile} from "node:fs"

const data = "Hello World"
writeFile('message.txt', data, 'utf-8', (err) => {
    if(err) throw err;
    console.log(`La stringa ${data} è stata aggiunta al file`);
})
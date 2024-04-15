import { Encrypt } from "./src/Encrypt.js"

const test = new Encrypt();
console.log(test);
const test2 = new Encrypt();

const toEncrypt = "That is interesting what do you make of it";
console.log("Message: " + toEncrypt);

let encrypted = test.encrypt(toEncrypt);
console.log("Encrypted: " + encrypted);

let decrypted = test.decrypt(encrypted);
console.log("Decrypted: " + decrypted);

let bad = test2.decrypt(encrypted);
console.log("Bad: " + bad);




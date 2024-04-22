import { Encrypt } from "./src/Encrypt.js"

// import { letterToNumber, numberToLetter } from "./src/utils.js"
//
// let t = " ABCDEFGHIJKLMNOPQRSTUVWXYZ"
// let char = []
// Array.from(t.split('')).forEach(c => char.push(letterToNumber(c)));
// console.log(char);
// char.forEach(c => console.log(numberToLetter(c)))

const test = new Encrypt();
console.log("Reciever: ")
console.log(test)
const test2 = new Encrypt();
console.log("Hacker: ")
console.log(test2)

const toEncrypt = "HELLO PROFESSOR PAGE";

let encrypted = test.encrypt(toEncrypt);

let decrypted = test.decrypt(encrypted);

console.log(test);
console.log("Message: " + toEncrypt);
console.log("Encrypted: " + encrypted.toString());
console.log("Decrypted: " + decrypted.toString());

let bad = test2.decrypt(encrypted);
console.log("Bad: " + bad);




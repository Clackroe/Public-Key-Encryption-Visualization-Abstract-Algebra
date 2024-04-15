import { Encrypt } from "./src/Encrypt.js"

// import { letterToNumber, numberToLetter } from "./src/utils.js"
//
// let t = " ABCDEFGHIJKLMNOPQRSTUVWXYZ"
// let char = []
// Array.from(t.split('')).forEach(c => char.push(letterToNumber(c)));
// console.log(char);
// char.forEach(c => console.log(numberToLetter(c)))

let it = 4000

for (let i = 0; i < it; i++) {
    console.log("Loading:...");
    const test = new Encrypt();
    // const test2 = new Encrypt();

    const toEncrypt = "ITS ALL GREEK TO ME";

    let encrypted = test.encrypt(toEncrypt);

    let decrypted = test.decrypt(encrypted);

    if (toEncrypt.toString() !== decrypted.toString()) {
        console.log(test);
        console.log("Message: " + toEncrypt);
        console.log("Encrypted: " + encrypted.toString());
        console.log("Decrypted: " + decrypted.toString());
    }
}

// let bad = test2.decrypt(encrypted);
// console.log("Bad: " + bad);




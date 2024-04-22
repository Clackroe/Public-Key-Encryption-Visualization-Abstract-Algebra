import { randomEvenNumber, generateRandomPrime, generateCoprime, modInverse, messageToNumber, splitString, exponentialMod, numberToMessage } from "./utils.js"

export class Encrypt {

    publicKey = { e: -1, n: -1 };
    privateKey = { d: -1, k: -1, p: -1, q: -1 };

    constructor() {
        let p = 1, q = 1, n = 1;

        this.tokenLen = 4;

        let minValue = "";
        for (let i = 0; i < this.tokenLen / 2; i++) {
            minValue += "26";
        }
        minValue = parseInt(minValue);


        do {
            p = generateRandomPrime(10, 700);
            q = generateRandomPrime(10, 700);
            n = p * q;

        } while (n < minValue || p === q || n.toString().length > this.tokenLen);


        const k = (p - 1) * (q - 1);
        const d = generateCoprime(k);


        //dx = 1 mod k
        const e = modInverse(d, k);

        this.publicKey = { e, n };

        this.privateKey = { d, k, p, q };
    }


    encrypt(message) {
        let numericalMessage = messageToNumber(message + " ");
        let chunks = splitString(numericalMessage, this.tokenLen);

        console.log("Numerical Rep:")
        console.log(chunks);

        let encryptedChunks = [];
        chunks.forEach(c => {
            let e = exponentialMod(Number(c), this.publicKey.e, this.publicKey.n).toString().padStart(this.tokenLen, 0);
            encryptedChunks.push(e);
        });

        return encryptedChunks.join('');
    }

    decrypt(numericalMessage) {
        let chunks = splitString(numericalMessage, this.tokenLen);

        console.log("To Decrypt Chunks:")
        console.log(chunks);
        let decryptedChunks = [];
        chunks.forEach(c => {
            decryptedChunks.push(exponentialMod(c, this.privateKey.d, this.publicKey.n).toString().padStart(this.tokenLen, 0));
        });

        console.log("Decrypted Chunks:")
        console.log(decryptedChunks);

        let decryptedNumber = decryptedChunks.join('');

        return numberToMessage(decryptedNumber).toString().trim();



    }
};


import { generateRandomPrime, generateCoprime, modInverse, messageToNumber, splitString, exponentialMod, numberToMessage } from "./utils.js"

export class Encrypt {

    publicKey = { e: -1, n: -1 };
    #privateKey = { d: -1, k: -1, p: -1, q: -1 };

    constructor() {
        let p = 1, q = 1;

        while (p * q > 7000 || p * q < 3000) {
            p = generateRandomPrime(20, 700);
            q = generateRandomPrime(20, 700);
        }

        const n = p * q;
        const k = (p - 1) * (q - 1);
        const d = generateCoprime(k);

        //dx = 1 mod k
        const e = modInverse(d, k);

        this.publicKey = { e, n };

        this.#privateKey = { d, k, p, q };
    }


    encrypt(message) {
        let numericalMessage = messageToNumber(message + " ");
        let chunks = splitString(numericalMessage, 4);
        let encryptedChunks = [];
        chunks.forEach(c => {
            let e = exponentialMod(Number(c), this.publicKey.e, this.publicKey.n).toString().padStart(4, 0);
            encryptedChunks.push(e);
        });

        return encryptedChunks.join('');
    }

    decrypt(numericalMessage) {
        let chunks = splitString(numericalMessage, 4);

        let decryptedChunks = [];
        chunks.forEach(c => {
            decryptedChunks.push(exponentialMod(c, this.#privateKey.d, this.publicKey.n).toString().padStart(4, 0));
        });

        let decryptedNumber = decryptedChunks.join('');

        return numberToMessage(decryptedNumber).toString().trim();



    }
};


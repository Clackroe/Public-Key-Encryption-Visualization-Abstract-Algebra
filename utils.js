import { gcd } from "mathjs";



//e and n are public
//d and k are private
function encrypt(message, p, q) {
    const n = p * q;
    const k = (p - 1) * (q - 1);
    const d = generateCoprime(k);

    //dx = 1 mod k
    const e = modInverse(d, k);

    let numericalMessage = messageToNumber(message);
    let chunks = splitString(numericalMessage);

    let encryptedChunks = [];
    chunks.forEach(c => {
        encryptedChunks += (exponentialMod(parseInt(c), e, n));
    });

    return chunks.join('');
}




//base^exponent = x mod(n)
//https://www.youtube.com/watch?v=C7gHx2StFi8
function exponentialMod(base, exponent, n) {
    const bigBase = BigInt(base);
    const bigExponent = BigInt(exponent);
    const bigMod = BigInt(n);

    let result = 1n;
    for (let i = 0n; i < bigExponent; i++) {
        result = (result * bigBase) % bigMod;
    }
    return result;
}

function generateCoprime(number) {
    let candidate = Math.floor(Math.random() * number) + 1;
    while (gcd(candidate, number) != 1) {
        candidate = (candidate % number) + 1;
    }
    return candidate;
}

function modInverse(d, n) {
    for (let x = 1; x < n; x++) {
        if ((d * x) % n === 1) return x;
    }
    console.error("No Inverse Mod Exists");
}

function letterToNumber(letter) {
    if (letter === ' ') {
        return '00';
    } else {
        const number = letter.toUpperCase().charCodeAt(0) - 64;
        return number.toString().padStart(2, '0');
    }
}

function numberToLetter(number) {
    if (number === '00') {
        return ' ';
    } else {
        const charCode = parseInt(number, 10) + 64;
        return String.fromCharCode(charCode);
    }
}


function messageToNumber(message) {
    return Array.from(message).map(c => letterToNumber(c)).join('');
}

function numberToMessage(number) {
    let out = '';
    number = Array.from(number);

    let letter = '';
    while (number.length > 0) {
        if (letter.length === 2) {
            out += numberToLetter(letter);
            letter = '';
        }
        letter += number.shift();
    }
    if (letter.length === 2) out += numberToLetter(letter);

    return out;
};
function splitString(message) {
    let chunks = [];
    let chunk = '';

    for (let i = 0; i < message.length; i++) {
        if (chunk.length === 4) {
            chunks.push(chunk);
            chunk = '';
        }
        chunk += message[i];
    }
    if (chunk.length > 0) {
        chunks.push(chunk.padEnd(4, ' '));
    }

    return chunks;
}

//Example From The Book
console.log(encrypt("ITS ALL GREEK TO ME", 47, 59));

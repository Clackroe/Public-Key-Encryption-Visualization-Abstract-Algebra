import { gcd } from "mathjs";


//base^exponent = x mod(n)
//https://www.youtube.com/watch?v=C7gHx2StFi8
export function exponentialMod(base, exponent, n) {
    const bigBase = BigInt(base);
    const bigExponent = BigInt(exponent);
    const bigMod = BigInt(n);

    let result = 1n;
    for (let i = 0n; i < bigExponent; i++) {
        result = (result * bigBase) % bigMod;
    }
    return Number(result);
}

export function generateCoprime(number) {
    let candidate = Math.floor(Math.random() * number) + 1;
    while (gcd(candidate, number) != 1) {
        candidate = (candidate % number) + 1;
    }
    return candidate;
}

export function modInverse(d, n) {
    for (let x = 1; x < n; x++) {
        if ((d * x) % n === 1) return x;
    }
    console.error("No Inverse Mod Exists");
}

export function letterToNumber(letter) {
    if (letter === ' ') {
        return '00';
    } else {
        const number = letter.toUpperCase().charCodeAt(0) - 64;
        return number.toString().padStart(2, '0');
    }
}

export function numberToLetter(number) {
    if (number === '00') {
        return ' ';
    } else {
        const charCode = parseInt(number, 10) + 64;
        return String.fromCharCode(charCode);
    }
}


export function messageToNumber(message) {
    return Array.from(message).map(c => letterToNumber(c)).join('');
}

export function numberToMessage(number) {
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
export function splitString(message, length) {
    let chunks = [];
    let chunk = '';

    for (let i = 0; i < message.length; i++) {
        if (chunk.length === length) {
            chunks.push(chunk);
            chunk = '';
        }
        chunk += message[i];
    }
    if (chunk.length > 0) {
        chunks.push(chunk.padEnd(length, ' '));
    }

    return chunks;
}

export function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;

    if (n % 2 === 0 || n % 3 === 0) return false;

    let i = 5;
    while (i * i <= n) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
        i += 6;
    }
    return true;
}

export function generateRandomPrime(min, max) {
    let num;
    do {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (!isPrime(num));
    return num;
}

export function randomEvenNumber(min, max) {
    let num;
    do {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (num % 2 !== 0);
    return num;

}


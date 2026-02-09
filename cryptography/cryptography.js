//! The Ceaser Cipher is one of the most fundemental (and fascinating) in cryptography.
//* It is a substitution cipher - each letter in the plaintext (the original message) is shifted by a fixed number of positions in the alphabet. -> substitution, encryption / decryption:

// initial variables of the ceasar cipher, text to be encrypted, shift, etc.
const plaintext = 'Hello World';
const shift = 3;

//* Ceasar Cipher implementation:
const ceaserCipher = (text, shift) => {
    const result = [];

    // normalize shift (e.g. shift = 29 => shift=3):
    shift = ((shift % 26) + 26) % 26;

    for (let ch of text) {
        // NOTE this a regex synthax with the .text(ch) method -> returns a boolean:
        if (/[a-z]/.test(ch)) {
            const code = ((ch.charCodeAt(0) - 97 + shift) % 26) + 97;
            result.push(String.fromCharCode(code));
        } else if (/[A-Z]/.test(ch)) {
            const code = ((ch.charCodeAt(0) - 65 + shift) % 26) + 65;
            result.push(String.fromCharCode(code));
        } else {
            result.push(ch) // keep spaces, punctuation, etc.
        }
    }
    return result.join('');
}

const encrypted = ceaserCipher(plaintext, shift);
const decrypted = ceaserCipher(encrypted, -shift);

// test the cipher:
console.log('Plaintext: ', plaintext);
console.log('Encrypted: ', encrypted);
console.log('Decrypted: ', decrypted);
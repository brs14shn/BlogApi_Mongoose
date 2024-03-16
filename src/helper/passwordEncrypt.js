"use strict";

/* -------------------------------------------------------
    EXPRESSJS - Encrypt
------------------------------------------------------- 
*/

// // Password Encryption:
// https://nodejs.org/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest
const crypto = require('node:crypto')

const keyCode = process.env?.SECRET_KEY || 'write_random_chars_in_here'
const loopCount = 10_000 // 10K
const charCount = 32 // write 32 for 64
const encType = 'sha512'

const passwordEncrypt = function (password) {
    const encrypted = crypto.pbkdf2Sync(password, keyCode, loopCount, charCount, encType).toString('hex')
    return encrypted
    //console.log(encrypted);
}


// module.exports = function (password) {

//     const encode = crypto.pbkdf2Sync(password, keyCode, loopCount, charsCount, encType) // return BufferType
//     return encode.toString('hex')
// }

//  ya da 💊

module.exports=passwordEncrypt
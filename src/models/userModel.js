"use strict";

/* -------------------------------------------------------
    EXPRESSJS - USER MODELS
------------------------------------------------------- 
*/
//!
const mongoose = require("mongoose");
const passwordEncrypt   = require('../helper/passwordEncrypt');
// // Password Encryption:
// // https://nodejs.org/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest
// const crypto = require('node:crypto')

// const keyCode = process.env?.SECRET_KEY || 'write_random_chars_in_here'
// const loopCount = 10_000 // 10K
// const charCount = 32 // write 32 for 64
// const encType = 'sha512'

// const passwordEncrypt = function (password) {
//     const encrypted = crypto.pbkdf2Sync(password, keyCode, loopCount, charCount, encType).toString('hex')
//     return encrypted
//     console.log(encrypted);
// }


const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email field must be required."],
      validate: [
        (email) => email.includes("@") && email.includes("."), // ValidationCheck
        "Email type is incorrect.", // If false Message.
      ],
    },

    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) => passwordEncrypt(password),
    },

    firstName: String,
    lastName: String,
  },
  {
    collection: "User",
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);

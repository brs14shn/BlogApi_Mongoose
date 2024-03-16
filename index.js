"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
/*
 * $ npm init -y
 * $ npm i express dotenv express-async-errors mongoose
 */

const express = require("express");
const app = express();
const router = require("express").Router();

require("dotenv").config();
app.use(express.json());
require("./src/configs/dbConnection");

/*
https://expressjs.com/en/resources/middleware/cookie-session.html
* $ npm i cookie-session
*/
//!  🔇 session 
const session =require('cookie-session');

app.use(session({
  name: 'Blog_Session',
  secret:process.env.SECRET_KEY,
  //maxAge:1000 * 60 * 60 * 24 * 3

}));

//! 🔗 PORT
const PORT = process.env.PORT || 8000;

router.all("/", (req, res) => {
  res.send({
    message: "Welcome Project",
    loginUser:req.session
  });
});
app.use(router);

//! USER CHECK

app.use(require('./src/middlewares/userCheck'))

//! 📩 ROUTERS
app.use("/blog", require("./src/routers/blogRouters"));
app.use('/user', require('./src/routers/userRouter'))


//! ❌ ERRORHANDLER
app.use(require("./src/middlewares/errorHandler"));
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));

//require('./src/sync')()



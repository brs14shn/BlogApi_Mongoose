"use strict"
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require('express').Router()

const { User } = require('../controllers/userControllers')



// Login/logout:
router.post("/login",User.login)
router.get("/logout",User.logout)
//router.all("/logout",User.logout)

// ------------------------------------------
// User
// ------------------------------------------
router.route('/')
    .get(User.list)
    .post(User.create)

router.route('/:userId')
    .get(User.read)
    .put(User.update)
    .delete(User.delete)



module.exports = router
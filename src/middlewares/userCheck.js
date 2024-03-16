'use strict'


/*
user check
*/

const User = require('../models/userModel')

module.exports = async (req,res,next) =>{

    if(req?.session){
        const {id,password} = req.session
        const user = await User.findOne({_id:id})

        if (user &&  user.password ==password){
            req.user = user
            req.isLogin = true
        }else {
            req.session = null
            req.isLogin = false
        }

    }

    next();
}
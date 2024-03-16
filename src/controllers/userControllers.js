"use strict";

require("express-async-errors");

const passwordEncrypt = require("../helper/passwordEncrypt");

const User = require("../models/userModel");

module.exports.User = {
  list: async (req, res) => {
    const data = await User.find();
    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
    });
  },

  create: async (req, res) => {
    const data = await User.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      result: data,
    });
  },
  read: async (req, res) => {
    // req.params.userId
    // const data = await User.findById(req.params.userId)
    const data = await User.findOne({ _id: req.params.userId }, req.body);

    res.status(200).send({
      error: false,
      result: data,
    });
  },

  update: async (req, res) => {
    // const data = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true }) // return new-data
    const data = await User.updateOne({ _id: req.params.userId }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      body: req.body,
      result: data, // update infos
      newData: await User.findOne({ _id: req.params.userId }),
    });
  },

  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.userId });

    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },

  //? ---------------LOGİN---------------------------------------------------------------
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.sts;
      throw new Error("Email and password are required");
    } 
    
    else {
      let user = await User.findOne({ email });
      
      
      if (user && user.password == passwordEncrypt(password)) {

        //? Kullanıcıyı kaydet! 
        // req.session({
        //   email:user.email,
        //   password:user.password
        // })
        // Ya Da
        req.session.email = user.email,
        req.session.password = user.password

        if(req.body.remindMe){
          req.session.remindMe = req.body.remindMe
          req.sessionOptions.maxAge =1000 * 60 * 60 * 24 * 3

        }

        res.status(200).send({
          message:"Login ok",
          user
        })
      } 
      
      else {
        throw new Error("Login parameters are not true");
      }
    }
  },
  //?--------------------------------------------------------------------------------
  logout: async (req, res) => {
    req.session = null

    res.status(200).send({
      message:"Logout ok",
    })


  }
}

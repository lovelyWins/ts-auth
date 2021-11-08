import express from "express";
import { Users, findByCredentials } from "../models/users";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// controller func to register user
const registerUser = async (req: express.Request, res: express.Response) => {
  try {
    // creating users in db
    console.log("regUser is running");
    const user = await new Users(req.body);
    console.log(user);
    user.password = await bcrypt.hash(user.password, 8)
    console.log(user);

    user.save();
    res.send({ message: "user registered" });
  } catch (e) {
    console.log(e); //right now, getting error, while sendi obj as response
  }
};

// for login
const loginUser = async (req: express.Request, res: express.Response) => {
  try {
    const user = await findByCredentials(req.body.email, req.body.password);
    const token = jwt.sign({ _id: user._id.toString() }, "secretKey");
    res.send({ token: token });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "error occured" });
  }
};

// for profile
const getProfile = async (req: express.Request, res: express.Response) => {
  try {
   
    res.send(req.user) 
  } catch {
    res.status(400).send({ message: "cannot get profile" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};

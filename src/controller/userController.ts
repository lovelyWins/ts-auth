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
    user.password = await bcrypt.hash(user.password, 8);
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
    res.send(req.user);
  } catch {
    res.status(400).send({ message: "cannot get profile" });
  }
};

// update password
const updatePassword = async (req: express.Request, res: express.Response) => {
  try {
    const userObj: any = req.user;
    const user: any = await Users.findById(userObj._id);

    // matching if password is correct
    const isCorrectPass: boolean = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );

    if (!isCorrectPass) {
      throw new Error("Please enter valid Password");
    }

    // cheking if new password is equal to currrentPassword
    if (req.body.newPassword === req.body.currentPassword) {
      throw new Error("New password should not be same as current password");
    }

    // checking if new password and confirm password are equal
    if (req.body.newPassword === req.body.confirmPassword) {
      const encryptedPassword = await bcrypt.hash(req.body.newPassword, 8);
      await Users.findByIdAndUpdate(userObj._id, {
        password: encryptedPassword,
      });
      res.json({ message: "Password successfully changed" });
    }
  } catch (e: any) {
    res.status(400).send({ message: e.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updatePassword,
};

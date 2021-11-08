const jwt = require("jsonwebtoken");
import express from "express";
import { Users } from "../models/users";

// auth middleware
export const auth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    console.log(req.header);
    // getting error here, so following code is commented
    // const token: string = req.header("Authorization").replace("Bearer ", "");
    // const decoded = jwt.verify(token, "secretKey");
    // let user = await Users.findOne({ _id: decoded._id }).select({
    //   password: 0,
    // });
    // req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "please authenticate" });
  }

  next();
};

module.exports = auth;

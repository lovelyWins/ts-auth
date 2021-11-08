const jwt = require("jsonwebtoken");
import express from "express";
import { Users } from "../models/users";

// auth middleware
const auth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    console.log("auth is running  ");
    const tokenStr: any = req.headers.authorization;
    const token: string = tokenStr.replace("Bearer ", "");
    const decoded: any = jwt.verify(token, "secretKey");
    const user: any = await Users.findOne({ _id: decoded._id }).select({
      password: 0,
    });
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "please authenticate" });
  }

  next();
};

module.exports = auth;

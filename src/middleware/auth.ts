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
    const tokenStr: any = req.headers.authorization;
    const token: string = tokenStr.replace("Bearer ", "");
    const decoded: any = jwt.verify(token, "secretKey");
    //lean the model 
    const user: any = await Users.findOne({ _id: decoded._id }).select({
      password: 0,
    });
<<<<<<< HEAD
    if (!user) {
      throw new Error("Unauthenticated");
    }
=======
    //Verify if user found before storing it in request
>>>>>>> 01f4601565818f0e1d39c0c9f2acf68e3f324129
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Unauthenticated" });
  }
<<<<<<< HEAD
=======
//Remove following next
  next();
>>>>>>> 01f4601565818f0e1d39c0c9f2acf68e3f324129
};

module.exports = auth;

import express from "express";
require("../db/mongoose");
const userController = require("../controller/userController");
import { auth } from "../middleware/auth";

// creating router
const userRouter = express.Router();

// adding users
userRouter.post("/register", userController.registerUser);

// for login
userRouter.post("/login", userController.loginUser);

// getting user
userRouter.get("/profile", auth, userController.getProfile);

// update possword
userRouter.post(
  "/users/changePassword",
  (req: express.Request, res: express.Response) => {
    res.send("User updated");
  }
);

module.exports = userRouter;

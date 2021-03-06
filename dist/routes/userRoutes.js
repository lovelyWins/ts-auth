"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("../db/mongoose");
const userController = require("../controller/userController");
const auth = require("../middleware/auth");
// creating router
const userRouter = express_1.default.Router();
// adding users
userRouter.post("/register", userController.registerUser);
// for login
userRouter.post("/login", userController.loginUser);
// getting user
userRouter.get("/profile", auth, userController.getProfile);
// update possword
userRouter.post("/users/changePassword", auth, userController.updatePassword);
module.exports = userRouter;

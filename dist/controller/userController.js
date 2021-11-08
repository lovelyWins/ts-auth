"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// controller func to register user
const registerUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        // creating users in db
        console.log("regUser is running");
        const user = yield new users_1.Users(req.body);
        console.log(user);
        user.password = yield bcrypt.hash(user.password, 8);
        console.log(user);
        user.save();
        res.send({ message: "user registered" });
    }
    catch (e) {
        console.log(e); //right now, getting error, while sendi obj as response
    }
});
// for login
const loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield users_1.findByCredentials(req.body.email, req.body.password);
        const token = jwt.sign({ _id: user._id.toString() }, "secretKey");
        res.send({ token: token });
    }
    catch (e) {
        console.log(e);
        res.status(400).send({ message: "error occured" });
    }
});
// for profile
const getProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        res.send('getting user');
        //res.send(req.user)       //will work once auth middleware get created
    }
    catch (_a) {
        res.status(400).send({ message: "cannot get profile" });
    }
});
module.exports = {
    registerUser,
    loginUser,
    getProfile,
};

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
        const user = yield new users_1.Users(req.body);
        user.password = yield bcrypt.hash(user.password, 8);
        user.save();
        res.send({ message: "user registered" });
    }
    catch (e) {
        res.status(400).send({ message: "error occured" });
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
        res.status(400).send({ message: "error occured" });
    }
});
// for profile
const getProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        res.send(req.user);
    }
    catch (e) {
        res.status(400).send({ message: "cannot get profile" });
    }
});
// update password
const updatePassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const userObj = req.user;
        const user = yield users_1.Users.findById(userObj._id);
        // matching if password is correct
        const isCorrectPass = yield bcrypt.compare(req.body.currentPassword, user.password);
        if (!isCorrectPass) {
            throw new Error("Please enter valid Password");
        }
        // cheking if new password is equal to currrentPassword
        if (req.body.newPassword === req.body.currentPassword) {
            throw new Error("New password should not be same as current password");
        }
        // checking if new password and confirm password are equal
        if (req.body.newPassword === req.body.confirmPassword) {
            const encryptedPassword = yield bcrypt.hash(req.body.newPassword, 8);
            yield users_1.Users.findByIdAndUpdate(userObj._id, {
                password: encryptedPassword,
            });
            res.json({ message: "Password successfully changed" });
        }
        else {
            throw new Error("New password and confirm password did not matched");
        }
    }
    catch (e) {
        res.status(400).send({ message: e.message });
    }
});
module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updatePassword,
};

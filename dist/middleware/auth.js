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
const jwt = require("jsonwebtoken");
const users_1 = require("../models/users");
// auth middleware
const auth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const tokenStr = req.headers.authorization;
        const token = tokenStr.replace("Bearer ", "");
        const decoded = jwt.verify(token, "secretKey");
        //lean the model 
        const user = yield users_1.Users.findOne({ _id: decoded._id }).select({
            password: 0,
        });
        if (!user) {
            throw new Error("Unauthenticated");
        }
        req.user = user;
        next();
    }
    catch (e) {
        res.status(401).send({ error: "Unauthenticated" });
    }
});
module.exports = auth;

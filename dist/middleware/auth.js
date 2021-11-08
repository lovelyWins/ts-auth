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
// auth middleware
exports.auth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
    }
    catch (e) {
        res.status(401).send({ error: "please authenticate" });
    }
    next();
});
module.exports = exports.auth;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcrypt = require("bcrypt");
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        validate(value) {
            if (!(value.toString().length === 10)) {
                throw new Error("invalid phone !!");
            }
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error("invalid email !!");
            }
        },
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (value.length < 8) {
                throw new Error("password should contain atleast 8 characters");
            }
        },
    },
});
// creating function to check for if email/password is correct
exports.findByCredentials = (email, password) => __awaiter(this, void 0, void 0, function* () {
    // finding if email provided is 
    const user = yield exports.Users.findOne({ email });
    // if user doesn't exists
    if (!user) {
        throw new Error("Enter valid email");
    }
    // comparing passwords
    const isCorrectPass = yield bcrypt.compare(password, user.password);
    if (!isCorrectPass) {
        throw new Error("Enter valid Password");
    }
    return user;
});
// export const Users = mongoose.model("Users", userSchema);
exports.Users = mongoose_1.default.model("Users", userSchema);

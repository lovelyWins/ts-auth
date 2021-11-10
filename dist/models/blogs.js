"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    timeOfCreation: {
        type: String,
        required: true,
    },
    timeOfUpdation: {
        type: String,
    },
});
exports.Posts = mongoose_1.default.model("Posts", postSchema);

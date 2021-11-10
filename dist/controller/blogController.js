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
const blogs_1 = require("../models/blogs");
const auth = require("../middleware/auth");
const path = require('path');
// create post controller function
const createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const userInstance = req.body;
        const imgInstance = req.file;
        //grabbing user data from auth middleware
        const userData = req.user;
        // creating url for image
        let imgPath = imgInstance.path;
        let imgName = imgPath.replace("public\\uploads\\blog-post\\", "");
        let imgUrl = `http://localhost:3000/uploads/blog-post/${imgName}`;
        // adding date
        userInstance.timeOfCreation = new Date();
        userInstance.createdBy = userData.name;
        userInstance.picture = imgUrl;
        const post = yield new blogs_1.Posts(userInstance);
        post.save();
        res.send({ message: "Post created" });
    }
    catch (e) {
        res.status(400).send({ message: e.message });
    }
});
module.exports = {
    createPost,
};
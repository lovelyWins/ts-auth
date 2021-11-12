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
const fs = require('fs');
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
        const port = process.env.PORT || 3000;
        let imgUrl = `http://localhost:${port}/uploads/blog-post/${imgName}`;
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
// creating controller function for get users
const getPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const posts = yield blogs_1.Posts.find({});
        res.send(posts);
    }
    catch (e) {
        res.status(400).send({ message: e.message });
    }
});
// creating controller function for get one post by id
const getOnePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const post = yield blogs_1.Posts.findById({ "_id": id });
        res.send(post);
    }
    catch (e) {
        res.status(400).send({ message: e.message });
    }
});
// delete post by id controller function
const deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = req.user;
        const id = req.body.id;
        const post = yield blogs_1.Posts.findById({ "_id": id });
        // cheking if post to be deleted is user's own post (i.e. loggeg in)
        if (user.name === post.createdBy) {
            // for deleting post
            const deletedPost = yield blogs_1.Posts.findByIdAndDelete({ "_id": id });
            // getting image name
            const imgLink = post.picture;
            const port = process.env.PORT || 3000;
            const removedStr = `http://localhost:${port}/uploads/blog-post/`;
            // getting image name from image link
            const imgName = imgLink.replace(removedStr, "");
            // getting path to picture
            const imgPath = path.join('./../../public/uploads/blog-post', imgName);
            fs.unlink(imgPath, (error) => {
                if (error) {
                    console.log('error in deleting image');
                }
            });
        }
        else {
            throw new Error("You don't have access to delete this post");
        }
        res.send({ message: "post deleted" });
    }
    catch (e) {
        res.status(400).send({ message: e.message });
    }
});
// update post by id
const updatePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = req.user;
        const id = req.body.id;
        const post = yield blogs_1.Posts.findById({ "_id": id });
        if (user.name === post.createdBy) {
            // updating picture attribute in for Post model in db
            const port = process.env.PORT || 3000;
            const imgInstance = req.file;
            let imagePath = imgInstance.path;
            let imageName = imagePath.replace("public\\uploads\\blog-post\\", "");
            let imageUrl = `http://localhost:${port}/uploads/blog-post/${imageName}`;
            const timeNow = new Date();
            // for updating title, description, content
            const updatedPost = yield blogs_1.Posts.findByIdAndUpdate({ "_id": id }, {
                title: req.body.title,
                description: req.body.description,
                content: req.body.content,
                picture: imageUrl,
                timeOfUpdation: timeNow
            });
            // FOR IMAGE DELETION
            // getting image name
            const imgLink = post.picture;
            const removedStr = `http://localhost:${port}/uploads/blog-post/`;
            // getting image name from image link
            const imgName = imgLink.replace(removedStr, "");
            // getting path to picture
            const imgPath = path.join('./../../public/uploads/blog-post', imgName);
            fs.unlink(imgPath, (error) => {
                if (error) {
                    console.log('error in deleting image');
                }
            });
            //  saving updated post and sending response message
            updatedPost.save();
            res.send({ message: "User updated" });
        }
        else {
            throw new Error("You don't have access to delete this post");
        }
    }
    catch (e) {
        res.status(400).send({ message: e.message });
    }
});
// getUserPost controller function
const getUserPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = req.user;
        const userPosts = yield blogs_1.Posts.find({ createdBy: user.name });
        res.json(userPosts);
    }
    catch (e) {
        res.status(400).send({ message: e.message });
    }
});
module.exports = {
    createPost,
    getPosts,
    getOnePost,
    deletePost,
    updatePost,
    getUserPosts
};

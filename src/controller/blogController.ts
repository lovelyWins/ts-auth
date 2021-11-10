import express from "express";
import { Posts } from "../models/blogs";
const auth = require("../middleware/auth");
const path = require('path')

// create post controller function
const createPost = async (req: express.Request, res: express.Response) => {
  try {

    const userInstance: any = req.body;
    const imgInstance: any = req.file

    //grabbing user data from auth middleware
    const userData: any = req.user;

    // creating url for image
    let imgPath = imgInstance.path
    let imgName = imgPath.replace("public\\uploads\\blog-post\\", "")
    let imgUrl = `http://localhost:3000/uploads/blog-post/${imgName}`
    
    // adding date
    userInstance.timeOfCreation = new Date();
    userInstance.createdBy = userData.name;
    userInstance.picture = imgUrl
    const post = await new Posts(userInstance);
    post.save();
    res.send({ message: "Post created" });
  } catch (e: any) {
    res.status(400).send({ message: e.message });
  }
};

module.exports = {
  createPost,
};

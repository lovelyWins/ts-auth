import express from "express";
import { Posts } from "../models/blogs";
const auth = require("../middleware/auth");
const path = require('path')
const fs = require('fs')


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

    const port = process.env.PORT || 3000;

    let imgUrl = `http://localhost:${port}/uploads/blog-post/${imgName}`

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


// creating controller function for get users
const getPosts = async (req: express.Request, res: express.Response) => {

  try {
    const posts = await Posts.find({})
    res.send(posts)
  }
  catch (e: any) {
    res.status(400).send({ message: e.message })
  }

}

// creating controller function for get one post by id
const getOnePost = async (req: express.Request, res: express.Response) => {

  try {
    const id = req.body.id
    const post = await Posts.findById({ "_id": id })
    res.send(post)
  }
  catch (e: any) {
    res.status(400).send({ message: e.message })
  }

}

// delete post by id controller function
const deletePost = async (req: express.Request, res: express.Response) => {

  try {
    const user: any = req.user
    const id = req.body.id
    const post: any = await Posts.findById({ "_id": id })

    // cheking if post to be deleted is user's own post (i.e. loggeg in)
    if (user.name === post.createdBy) {

      // for deleting post
      const deletedPost = await Posts.findByIdAndDelete({ "_id": id })

      // getting image name
      const imgLink = post.picture
      const port = process.env.PORT || 3000;
      const removedStr = `http://localhost:${port}/uploads/blog-post/`

      // getting image name from image link
      const imgName = imgLink.replace(removedStr, "")

      // getting path to picture
      const imgPath = path.join('./../../public/uploads/blog-post', imgName)

      fs.unlink(imgPath, (error: any) => {
        if (error) {
          console.log('error in deleting image')
        }
      })

    } else {
      throw new Error("You don't have access to delete this post")
    }

    res.send({ message: "post deleted" })
  } catch (e: any) {
    res.status(400).send({ message: e.message })
  }

}

// update post by id
const updatePost = async (req: express.Request, res: express.Response) => {

  try {
    const user: any = req.user
    const id = req.body.id
    const post: any = await Posts.findById({ "_id": id })

    if (user.name === post.createdBy) {

      // updating picture attribute in for Post model in db
      const port = process.env.PORT || 3000;
      const imgInstance: any = req.file
      let imagePath = imgInstance.path
      let imageName = imagePath.replace("public\\uploads\\blog-post\\", "")

      let imageUrl = `http://localhost:${port}/uploads/blog-post/${imageName}`
      const timeNow: any = new Date()

      // for updating title, description, content
      const updatedPost: any = await Posts.findByIdAndUpdate({ "_id": id }, {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        picture: imageUrl,
        timeOfUpdation: timeNow
      })


      // FOR IMAGE DELETION
      // getting image name
      const imgLink = post.picture
      const removedStr = `http://localhost:${port}/uploads/blog-post/`

      // getting image name from image link
      const imgName = imgLink.replace(removedStr, "")

      // getting path to picture
      const imgPath = path.join('./../../public/uploads/blog-post', imgName)
      fs.unlink(imgPath, (error: any) => {
        if (error) {
          console.log('error in deleting image')
        }
      })

      //  saving updated post and sending response message
      updatedPost.save()
      res.send({ message: "User updated" })
    }
    else {
      throw new Error("You don't have access to delete this post")
    }
  }

  catch (e: any) {
    res.status(400).send({ message: e.message })
  }

}

// getUserPost controller function
const getUserPosts = async (req: express.Request, res: express.Response) => {

  try {
    const user: any = req.user
    const userPosts = await Posts.find({ createdBy: user.name })
    res.json(userPosts)
  } catch (e: any) {
    res.status(400).send({ message: e.message })
  }

}


module.exports = {
  createPost,
  getPosts,
  getOnePost,
  deletePost,
  updatePost,
  getUserPosts
};

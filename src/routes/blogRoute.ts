import express from "express";
const blogController = require("../controller/blogController");
const auth = require("../middleware/auth");
import multer from "multer";
import path from "path";

// setting up router for routes related to blog-posts
const postRouter = express.Router();

let storage = multer.diskStorage({
  destination: "public/uploads/blog-post",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({
  storage: storage,
  fileFilter: function (req: any, file: any, cb: any) {
    if (!file.originalname.endsWith(".jpg") && !file.originalname.endsWith(".png")) {
      return cb(new Error("File must be in jpg or png format"));
    }
    cb(null, true);
  },
})

// create post
postRouter.post(
  "/createPost", auth, upload.single("upload"), blogController.createPost
);

// get all posts
postRouter.get("/posts", blogController.getPosts);

// get one post by id
postRouter.get("/post", blogController.getOnePost);

// getting all posts of one user (by id)
postRouter.get("/userPosts", auth, blogController.getUserPosts)

//delete post by id
postRouter.delete("/deletePost", auth, blogController.deletePost);

// update post by id
postRouter.post("/updatePost", auth, upload.single("upload"), blogController.updatePost);


module.exports = postRouter;

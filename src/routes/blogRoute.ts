import express from "express";
const blogController = require("../controller/blogController");
const auth = require("../middleware/auth");
import multer from "multer";
import path from "path";

// setting up router for routes related to blog-posts
const postRouter = express.Router();

// configuring multer
// const upload = multer({
//   dest: "public/uploads/blog-post",
//   // limits: {
//   //   fileSize: 1000000, //i.e. 1mb
//   // },
//   filename(req: any, file: any, cb: any) {
//     cb(null, file.fieldName + '-' + Date.now() + path.extname(file.originalname))
//   },
//   // function that will validate for image extension .jpg and .png only.
//   filefilter(req: any, file: any, cb: any) {
//     if (!file.originalname.endsWith(".jpg") && !file.originalname.endsWith(".png")) {
//       return cb(new Error("File must be in jpg or png format"));
//     }
//     cb(null, true);
//   },

// });

let storage = multer.diskStorage({
  destination: "public/uploads/blog-post",
  // filefilter(req: any, file: any, cb: any) {
  //   if (!file.originalname.endsWith(".jpg") && !file.originalname.endsWith(".png")) {
  //     return cb(new Error("File must be in jpg or png format"));
  //   }
  //   cb(null, true);
  // },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

// create post
postRouter.post(
  "/createPost", auth, upload.single("upload"), blogController.createPost
);

// get all posts
postRouter.get("/posts", async (req: express.Request, res: express.Response) => {
  res.send("all posts");
}
);

// get one post by id
postRouter.get("/post", async (req: express.Request, res: express.Response) => {
  res.send("one post");
});

// update post by id
postRouter.post(
  "/updatePost",
  async (req: express.Request, res: express.Response) => {
    res.send("post updated");
  }
);

//delete post by id
postRouter.delete(
  "/deletePost",
  async (req: express.Request, res: express.Response) => {
    res.send("post deleted");
  }
);

module.exports = postRouter;

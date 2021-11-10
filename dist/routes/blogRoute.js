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
const express_1 = __importDefault(require("express"));
const blogController = require("../controller/blogController");
const auth = require("../middleware/auth");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// setting up router for routes related to blog-posts
const postRouter = express_1.default.Router();
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
let storage = multer_1.default.diskStorage({
    destination: "public/uploads/blog-post",
    // filefilter(req: any, file: any, cb: any) {
    //   if (!file.originalname.endsWith(".jpg") && !file.originalname.endsWith(".png")) {
    //     return cb(new Error("File must be in jpg or png format"));
    //   }
    //   cb(null, true);
    // },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = multer_1.default({ storage: storage });
// create post
postRouter.post("/createPost", auth, upload.single("upload"), blogController.createPost);
// get all posts
postRouter.get("/posts", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.send("all posts");
}));
// get one post by id
postRouter.get("/post", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.send("one post");
}));
// update post by id
postRouter.post("/updatePost", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.send("post updated");
}));
//delete post by id
postRouter.delete("/deletePost", (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.send("post deleted");
}));
module.exports = postRouter;

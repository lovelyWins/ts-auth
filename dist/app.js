"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainRouter = require("./routes/routes");
const app = express_1.default();
// app.use
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(mainRouter);
app.use(express_1.default.static('public'));
// if there is preconfigured port then it'll run, or 3000 wil run
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("app is running on 3000");
});

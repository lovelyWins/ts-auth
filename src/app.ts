import express from "express";
const mainRouter = require("./routes/routes")
const app: express.Application = express();
// app.use
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(mainRouter)
app.use(express.static('public'))



// if there is preconfigured port then it'll run, or 3000 wil run
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("app is running on 3000");
});


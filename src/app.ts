import express from "express";
const mainRouter = require("./routes/routes")
const app: express.Application = express();
// app.use
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(mainRouter)



// listening to port
app.listen(3000, () => {
  console.log("app is running on 3000");
});

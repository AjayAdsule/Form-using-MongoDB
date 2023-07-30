import express, { urlencoded } from "express";
import path from "path";
import mongoose from "mongoose";
const app = express();
const port = 4000;

// this is mongo part
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
  })
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

//sehema
const schema = new mongoose.Schema({
  id:String,
  name: String,
  email: String,
});
const allUsers = mongoose.model("users", schema);

// setting ejs
app.set("view engine", "ejs");
// setting up middleware
app.use(express.static(path.join(path.resolve(), "public")));
app.use(urlencoded({ extended: "true" }));

//create array in that i put my user information
const users = [];

app.get("/", (req, res) => {
  res.render("form");
});
app.post("/forms", (req, res) => {
  // users.push({ name: req.body.name, email: req.body.email });
  // res.redirect("/success");
  allUsers
    .create({ id:new Date().getTime().toString(),name: req.body.name, email: req.body.email })
    .then(() => {
      res.redirect("/success");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/success", (req, res) => {
  res.render("success", { msg: "thank you for filling form" });
});
app.get("/user", (req, res) => {
  res.json({
    users,
  });
});

app.get("/add", (req, res) => {
  allUsers
    .create({ name: "dinesh", email: "dinesh5@gmail.com" })
    .then(() => {
      res.send("nice");
    })
    .catch((err) => {
      console.log(err);
    });
});
app.listen(port, () => {
  console.log(`listening on port ${port} `);
});

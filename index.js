const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");
const authConfig = require("./config/auth.config");

const app = express();
const PORT = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cors());

app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: authConfig.secret, // should use as secret environment variable
    httpOnly: true,
  })
);

const userRouter = require("./routes/user.route");

app.get("/", function (req, res) {
  res.send("Welcome server!");
});

app.use("/user", userRouter);

const server = app.listen(PORT, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("App listening at %s", port);
});

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost/dblawyer")
  .then((e) => console.log("Mongo DB connected"))
  .catch((e) => console.log(e));

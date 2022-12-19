const express = require("express");
const userController = require("../controllers/user.controller");
const userRouter = express.Router();
userRouter.post("/create", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/singout", userController.signOut);
module.exports = userRouter;

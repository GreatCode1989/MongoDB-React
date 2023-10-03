import express from "express";
import mongoose from "mongoose";
import { registerValidation } from "./validation/auth.js";
import checkAuth from "./utils/checkAuth.js";
import * as userController from './controllers/userController.js'

mongoose
  .connect(
    "mongodb+srv://wef353wef535:Devil666devil3@cluster0.o3z7u6s.mongodb.net/blog"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());

app.post("/auth/login", userController.register);

app.post("/auth/register", registerValidation, userController.login);

app.get("/auth/me", checkAuth, userController.getMe);

app.listen(3005, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server ok");
});

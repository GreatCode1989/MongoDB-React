import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { validationResult } from "express-validator"

import { registerValidation } from "./validation/auth.js";

import UserModel from "./models/user.js"

mongoose
  .connect(
    "mongodb+srv://wef353wef535:Devil666devil3@cluster0.o3z7u6s.mongodb.net/"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());

app.post("/auth/register", registerValidation, (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

const doc = new UserModel({
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl,
    passwordHash: req.body.avatarUrl
})

    res.json({
        success: true
    })
});

app.listen(3005, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server ok");
});

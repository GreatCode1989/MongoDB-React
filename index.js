import express from "express";
import multer from "multer"
import mongoose from "mongoose";
import { registerValidation, loginValidation, postCreateValidation } from "./validation/validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as userController from './controllers/userController.js'
import * as postController from "./controllers/postControllers.js"

mongoose
  .connect(
    "mongodb+srv://wef353wef535:Devil666devil3@cluster0.o3z7u6s.mongodb.net/blog"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage})

app.use(express.json());

app.post("/auth/login", loginValidation, userController.login);
app.post("/auth/register", registerValidation, userController.register);
app.get("/auth/me", checkAuth, userController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `uploads/${req.file.originalname}`
  })
})

app.get("/posts", postController.getAll);
app.get("/posts/:id", postController.getOne);
app.post("/posts", checkAuth, postCreateValidation, postController.create);
app.delete("/posts/:id", checkAuth, postController.remove);
app.patch("/posts/:id", checkAuth, postController.update)



app.listen(3005, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server ok");
});

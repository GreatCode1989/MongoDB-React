import express from "express";
import multer from "multer"
import cors from "cors";
import mongoose from "mongoose";
import { registerValidation, loginValidation, postCreateValidation } from "./validation/validations.js";
import checkAuth from "./utils/checkAuth.js";
import { userController, postController } from "./controllers/index.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";

mongoose
  .connect(
    "mongodb+srv://wef353wef535:Devil666devil3@cluster0.o3z7u6s.mongodb.net/blog"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage})

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post("/auth/login", loginValidation, handleValidationErrors, userController.login);
app.post("/auth/register", registerValidation, handleValidationErrors, userController.register);
app.get("/auth/me", checkAuth, userController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `uploads/${req.file.originalname}`
  })
})

app.get("/tags", postController.getLastTags)

app.get("/posts", postController.getAll);
app.get("/posts/tags", postController.getLastTags);
app.get("/posts/:id", postController.getOne);
app.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, postController.create);
app.delete("/posts/:id", checkAuth, postController.remove);
app.patch("/posts/:id", checkAuth, postCreateValidation, handleValidationErrors, postController.update)



app.listen(3005, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server ok");
});

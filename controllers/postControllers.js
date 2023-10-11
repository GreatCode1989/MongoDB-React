import postModel from "../models/post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await postModel.find().populate("user").exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось вернуть статьи",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const updatedDoc = await postModel
      .findOneAndUpdate(
        { _id: postId },
        { $inc: { viewCount: 1 } },
        { new: true }
      )
      .exec();

    if (!updatedDoc) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.json(updatedDoc);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось вернуть статью",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const removedDoc = await postModel.findOneAndRemove({ _id: postId }).exec();

    if (!removedDoc) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.json({
      message: "Статья успешно удалена",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось удалить статью",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new postModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await postModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить статью",
    });
  }
};

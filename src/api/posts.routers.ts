import express from "express";
import { createPost, deletePost, getAllPosts, getPostById, updatePost, addTagToPost } from "./posts.controller";
import { upload } from "../middlewares/multer.middleware";
import { validatePostTitle } from "../middlewares/validation.middleware";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", upload.single("image"), validatePostTitle, createPost);
router.post("/:postId/:tagId", addTagToPost);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);


export default router;
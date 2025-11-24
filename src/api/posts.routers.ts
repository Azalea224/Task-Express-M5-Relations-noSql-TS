import express from "express";
import { createPost, deletePost, getAllPosts, getPostById, updatePost, addTagToPost } from "./posts.controller";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPost);
router.post("/:postId/:tagId", addTagToPost);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);


export default router;
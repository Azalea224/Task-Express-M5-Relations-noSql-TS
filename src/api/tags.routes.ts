import express from "express";
import { createTag, getAllTags, addTagToPost } from "./tags.controller";

const router = express.Router();

router.get("/", getAllTags);
router.post("/", createTag);
router.post("/:postId/:tagId", addTagToPost);

export default router;


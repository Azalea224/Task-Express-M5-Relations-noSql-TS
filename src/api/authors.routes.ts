import express from "express";
import { createAuthor, getAllAuthors, getAuthorByIdWithPostsAndTags } from "./authors.controller";

const router = express.Router();

router.get("/", getAllAuthors);
router.post("/", createAuthor);
router.get("/:id/posts-with-tags", getAuthorByIdWithPostsAndTags);

export default router;


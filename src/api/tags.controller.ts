import { Request, Response } from "express";
import Tag from "../models/Tag";
import Post from "../models/Post";

const getAllTags = async (req: Request, res: Response) => {
    try {
        const tags = await Tag.find().populate("posts");
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tags" });
    }
};

const createTag = async (req: Request, res: Response) => {
    try {
        const tag = await Tag.create(req.body);
        res.status(201).json(tag);
    } catch (error) {
        res.status(500).json({ message: "Error creating tag" });
    }
};

const addTagToPost = async (req: Request, res: Response) => {
    try {
        const { postId, tagId } = req.params;

        // Add tagId to post.tags
        await Post.findByIdAndUpdate(postId, {
            $push: { tags: tagId }
        });

        // Add postId to tag.posts
        await Tag.findByIdAndUpdate(tagId, {
            $push: { posts: postId }
        });

        res.status(200).json({ message: "Tag added to post successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding tag to post" });
    }
};

export { getAllTags, createTag, addTagToPost };


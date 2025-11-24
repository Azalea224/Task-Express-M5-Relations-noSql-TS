import { Request, Response } from "express";
import Post from "../models/Post";
import Author from "../models/Author";
import Tag from "../models/Tag";

const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find().populate("author").populate("tags");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts" });
    }

};

const createPost = async (req: Request, res: Response) => {
    try {
        const { authorId, ...postData } = req.body;
        const post = await Post.create({ ...postData, author: authorId });
        
        if (authorId) {
            await Author.findByIdAndUpdate(authorId, {
                $push: { posts: post._id }
            });
        }
        
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
};

const getPostById = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Error fetching post" });
    }
};

const updatePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Error updating post" });
    }
};

const deletePost = async (req: Request, res: Response) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
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

export { getAllPosts, createPost, getPostById, updatePost, deletePost, addTagToPost };
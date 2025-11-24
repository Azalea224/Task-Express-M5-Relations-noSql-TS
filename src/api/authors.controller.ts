import { Request, Response } from "express";
import Author from "../models/Author";

const getAllAuthors = async (req: Request, res: Response) => {
    try {
        const authors = await Author.find().populate("posts");
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching authors" });
    }
};

const createAuthor = async (req: Request, res: Response) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json(author);
    } catch (error) {
        res.status(500).json({ message: "Error creating author" });
    }
};

const getAuthorByIdWithPostsAndTags = async (req: Request, res: Response): Promise<void> => {
    try {
        const author = await Author.findById(req.params.id).populate({
            path: "posts",
            populate: {
                path: "tags",
                model: "Tag"
            }
        });
        if (!author) {
            res.status(404).json({ message: "Author not found" });
            return;
        }
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: "Error fetching author" });
    }
};

export { getAllAuthors, createAuthor, getAuthorByIdWithPostsAndTags };


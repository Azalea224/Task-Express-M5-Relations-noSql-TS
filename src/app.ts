import express from "express";
import connectDB from "./database";
import postsRouter from "./api/posts.routers";
import authorsRouter from "./api/authors.routes";
import tagsRouter from "./api/tags.routes";
import notFound from "./middlewares/NotFound";
import errorHandler from "./middlewares/ErrorHandler";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use("/posts", postsRouter);
app.use("/authors", authorsRouter);
app.use("/tags", tagsRouter);

app.use(notFound);
app.use(errorHandler);

connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
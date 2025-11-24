import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import connectDB from "./database";
import postsRouter from "./api/posts.routers";
import authorsRouter from "./api/authors.routes";
import tagsRouter from "./api/tags.routes";
import notFound from "./middlewares/NotFoundHandler";
import errorHandler from "./middlewares/ErrorHandler";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/media", express.static(path.join(__dirname, "../media")));

app.use("/posts", postsRouter);
app.use("/authors", authorsRouter);
app.use("/tags", tagsRouter);

app.use(notFound);
app.use(errorHandler);

connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
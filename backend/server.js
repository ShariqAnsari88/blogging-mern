import express from "express";
import dotenv from "dotenv";
import postRouter from "./routes/postRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
dotenv.config();
const port = process.env.PORT || 8080;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
    res.status(200).send("API is runing...");
});

// Custom error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`App runing on port: ${port}`);
});

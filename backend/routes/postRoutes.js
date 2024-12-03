import express from "express";

import {
    createPost,
    deletePost,
    getAllPosts,
    getSinglePost,
    updatePost,
    getPostsByUserId,
} from "../controllers/postController.js";
import authenticateToken from "../middlewares/authenticateTokenMiddleware.js";
import checkVerified from "../middlewares/checkVerifiedMiddleware.js";

const postRouter = express.Router();

postRouter
    .route("/")
    .get(getAllPosts)
    .post(authenticateToken, checkVerified, createPost);
postRouter
    .route("/:id")
    .get(getSinglePost)
    .put(authenticateToken, updatePost)
    .delete(authenticateToken, deletePost);
postRouter.get("/user/:userId", authenticateToken, getPostsByUserId);

export default postRouter;

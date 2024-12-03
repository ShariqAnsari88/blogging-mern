import express from "express";
import {
    getUserProfile,
    getUsers,
    registerUser,
    userLogin,
    userLogout,
    verifyUserEmail,
} from "../controllers/userController.js";
import authenticateToken from "../middlewares/authenticateTokenMiddleware.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", registerUser);
userRouter.post("/auth", userLogin);
userRouter.post("/logout", userLogout);
userRouter.get("/profile", authenticateToken, getUserProfile);
userRouter.get("/verify-email", authenticateToken, verifyUserEmail);

export default userRouter;

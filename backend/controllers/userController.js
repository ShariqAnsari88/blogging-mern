import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { userData } from "../utils/helpers.js";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";
import jwt from "jsonwebtoken";

const getUsers = (req, res) => {
    return res.status(200).send("Users route is working...");
};

// @desc   Register new user
// Route   POST /api/users
// @access Public
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        console.log(req.body);

        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Name, email and password are required.");
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        const user = await User.create({ name, email, password });

        if (!user) {
            res.status(400);
            throw new Error("Invalid user data");
        }

        // Genearate authantication token
        generateToken(res, user._id);

        // Send verification email
        sendVerificationEmail(user);

        res.status(200).json(userData(user));
    } catch (err) {
        next(err);
    }
};

// @desc   User auth/login
// Route   POST /api/users/auth
// @access Public
const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            generateToken(res, user._id);
            res.status(201).json(userData(user));
        } else {
            res.status(400);
            throw new Error("Invalid email or password");
        }
    } catch (err) {
        next(err);
    }
};

// @desc   Logout user
// Route   POST /api/users/logout
// @access Public
const userLogout = (req, res, next) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        res.json({ message: "Logged out successfully." });
    } catch (err) {
        next(err);
    }
};

// @desc   Get user details
// Route   GET /api/users/profile
// @access Private
const getUserProfile = (req, res, next) => {
    try {
        return res.status(200).json(req.user);
    } catch (err) {
        next(err);
    }
};

// @desc   Verify user email
// Route   GET /api/users/verify-email
// @access Private
const verifyUserEmail = async (req, res, next) => {
    const { token } = req.query;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        await User.findByIdAndUpdate(decoded.userId, { verified: true });
        res.status(200).json({ message: "Email verified successfully." });

        console.log("Email verified successfully.");
    } catch (err) {
        res.status(400);
        next(new Error("Invalid or expired token."));
    }
};

export {
    getUsers,
    registerUser,
    userLogin,
    userLogout,
    getUserProfile,
    verifyUserEmail,
};

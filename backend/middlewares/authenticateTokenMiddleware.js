import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authenticateToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(403);
        return next(new Error("No token provided"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.userId).select("-password");

        next();
    } catch (error) {
        res.status(401);
        next(new Error("Invalid or expired token"));
    }
};

export default authenticateToken;

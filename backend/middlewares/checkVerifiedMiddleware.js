const checkVerified = (req, res, next) => {
    if (!req.user.verified) {
        res.status(403);
        return next(
            new Error("Please verify your email to access this resource.")
        );
    }
    next();
};

export default checkVerified;

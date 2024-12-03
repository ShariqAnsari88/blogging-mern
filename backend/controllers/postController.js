import Post from "../models/postModel.js";

// @desc   Get all posts
// Route   GET /api/posts
// @access Public
const getAllPosts = async (req, res, next) => {
    try {
        const _posts = await Post.find();
        res.status(200).json(_posts);
    } catch (err) {
        next(err);
    }
};

// @desc   Get single post by id
// Route   GET /api/posts/:id
// @access Public
const getSinglePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            res.status(404);
            throw new Error("Post not found");
        }

        return res.status(200).json(post);
    } catch (err) {
        next(err);
    }
};

// @desc   Get posts by userId
// Route   GET /api/posts/:userId
// @access Public
const getPostsByUserId = async (req, res, next) => {
    try {
        let userId = req.params.userId;

        console.log(userId);

        const posts = await Post.find({ "author._id": userId });

        if (!posts.length) {
            res.status(404);
            throw new Error("No posts found from this user");
        }

        res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
};

// @desc   Create new post
// Route   POST /api/posts
// @access Public
const createPost = async (req, res, next) => {
    try {
        const { title, desc } = req.body;

        if (title && desc) {
            const post = {
                title,
                desc,
                author: req.user,
            };

            const newPost = await Post.create(post);

            return res.status(200).json(newPost);
        } else {
            res.status(400);
            throw new Error("title and description are required.");
        }
    } catch (err) {
        next(err);
    }
};

// @desc   Update post
// Route   PUT /api/posts
// @access Public
const updatePost = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { title, desc } = req.body;

        const post = await Post.findById(id);

        if (!post) {
            res.status(404);
            throw new Error("Post not found");
        }

        if (title || desc) {
            post.title = title || post.title;
            post.desc = desc || post.desc;
            const updatedPost = await post.save();
            return res.status(200).json(updatedPost);
        } else {
            res.status(400);
            throw new Error("title and description are required.");
        }
    } catch (err) {
        next(err);
    }
};

// @desc   Delete post by id
// Route   DELETE /api/posts/:id
// @access Public
const deletePost = async (req, res, next) => {
    try {
        const id = req.params.id;

        const post = await Post.findByIdAndDelete(id);

        if (!post) {
            res.status(404);
            throw new Error("Post not found");
        }

        return res.status(200).send({ message: "Post deleted successfully" });
    } catch (err) {
        next(err);
    }
};

export {
    getAllPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost,
    getPostsByUserId,
};

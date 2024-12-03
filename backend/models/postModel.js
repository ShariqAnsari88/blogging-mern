import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        author: {
            type: {
                name: {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: true,
                },
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User", // Reference to the User model if applicable
                    required: true,
                },
                role: String,
            },
            required: true,
        },
    },
    { timestamps: true }
);

// postSchema.pre("save", async function (next) {
//     const user =
// })

const Post = mongoose.model("Post", postSchema);

export default Post;

import mongoose, { Schema } from "mongoose"

const CommentSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Posts"
    },
    comment: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    replies: [
        {
            rid: {type: mongoose.Schema.Types.ObjectId},
            userId: { type: Schema.Types.ObjectId, ref: "Users"},
            from: {type: String},
            replyAt: {type: String},
            comment: {type: String},
            created_At: {type: String, default: Date.now()},
            updated: {type: String, default: Date.now()},
            likes: [{type: String}]
        }
    ],
    likes: [{ type: String}]
},
{ timestamps: true}
)

export default mongoose.model("Comment" , CommentSchema)
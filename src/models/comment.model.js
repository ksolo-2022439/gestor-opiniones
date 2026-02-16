import { Schema, model } from "mongoose";

const CommentSchema = Schema({
    content: {
        type: String,
        required: [true, "Content is required"]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true,
        versionKey: false
    });

export default model('Comment', CommentSchema);
import { Schema, model } from "mongoose";

const PostSchema = Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    content: {
        type: String,
        required: [true, "Content is required"]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

export default model('Post', PostSchema);
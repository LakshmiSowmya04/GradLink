const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        establishedOn: {
            type: DateTime,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        chat: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Chat",
            },
        ],
        post: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("University", universitySchema);
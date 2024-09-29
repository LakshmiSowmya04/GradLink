const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);

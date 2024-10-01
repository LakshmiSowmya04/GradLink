const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post");
const Chat = require("../models/Chat");
const router = express.Router();
const cookieOptions = require("../lib/constant");

// Sign Up
router.post("/signup", async (req, res) => {
  const { username, email, password, college, role } = req.body;

  // Validate required fields
  if (!username || !email || !password || !role) {
    return res.status(400).send("All fields are required");
  }

  // Validate role
  const validRoles = ["student", "alumni"];
  if (!validRoles.includes(role)) {
    return res.status(400).send("Invalid role");
  }

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).send("Username or email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, college, role });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      //later after setting up complete directory setup this can be done in some helping hooks.
    res.cookie("auth_session", token, cookieOptions);
    res.status(201).send("User created");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Log In
// Log In
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validate required fields
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    //this will be good even the schema later after setting up complete directory setup this can be done in some helping hooks.  changes in future;
    res.cookie("auth_session", token, cookieOptions);
    res.status(200).send("Login successful");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Follow User
router.post("/follow/:userId", async (req, res) => {
  const { userId } = req.params;
  const { currentUserId } = req.body;

  try {
    const user = await User.findById(currentUserId);
    if (!user.following.includes(userId)) {
      user.following.push(userId);
      await user.save();
    }
    res.status(200).send("User followed");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Create Post
router.post("/posts", async (req, res) => {
  const { content, userId } = req.body;
  const post = new Post({ content, userId });
  await post.save();
  res.status(201).send("Post created");
});

// Get All Posts
router.get("/posts", async (req, res) => {
  const posts = await Post.find()
    .populate("userId", "username")
    .sort({ timestamp: -1 });
  res.json(posts);
});

// Chat Message
router.post("/chat", async (req, res) => {
  const { senderId, recipientId, content } = req.body;

  let chat = await Chat.findOne({
    participants: { $all: [senderId, recipientId] },
  });
  if (!chat) {
    chat = new Chat({ participants: [senderId, recipientId], messages: [] });
    await chat.save();
  }

  chat.messages.push({ sender: senderId, content });
  await chat.save();
  res.status(200).send("Message sent");
});

// Get Chats
router.get("/chat/:userId", async (req, res) => {
  const { userId } = req.params;
  const chats = await Chat.find({ participants: userId }).populate(
    "messages.sender"
  );
  res.json(chats);
});

module.exports = router;

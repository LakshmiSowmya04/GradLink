import Post from "../models/post.js";
import { successResponse, errorResponse } from "../lib/res/index.js";
import { StatusCodes } from "http-status-codes";

// Function to create a post
async function createPost(req, res) {
  const { content, userId } = req.body;

  try {
    const post = new Post({ content, userId });
    await post.save();

    return res
      .status(StatusCodes.CREATED)
      .json(
        successResponse("Post created successfully", post, StatusCodes.CREATED)
      );
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

// Function to get all posts
async function getPosts(req, res) {
  try {
    const posts = await Post.find()
      .populate("userId", "username")
      .sort({ timestamp: -1 });

    return res
      .status(StatusCodes.OK)
      .json(
        successResponse("Posts retrieved successfully", posts, StatusCodes.OK)
      );
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

// Function to like a post
async function likePost(req, res) {
  const { postId, username } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(errorResponse("User not found", StatusCodes.NOT_FOUND));
    }

    const post = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: user._id } },
      { new: true }
    );

    if (!post) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(errorResponse("Post not found", StatusCodes.NOT_FOUND));
    }

    return res
      .status(StatusCodes.OK)
      .json(successResponse("Post liked successfully", post, StatusCodes.OK));
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

// Function to unlike a post
async function unlikePost(req, res) {
  const { postId, username } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(errorResponse("User not found", StatusCodes.NOT_FOUND));
    }

    const post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: user._id } },
      { new: true }
    );

    if (!post) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(errorResponse("Post not found", StatusCodes.NOT_FOUND));
    }

    return res
      .status(StatusCodes.OK)
      .json(successResponse("Post unliked successfully", post, StatusCodes.OK));
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}


export { createPost, getPosts, likePost, unlikePost };

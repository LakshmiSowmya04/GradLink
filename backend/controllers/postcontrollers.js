import Post from "../models/post.js";
import { successResponse, errorResponse } from "../lib/res/index.js";
import { StatusCodes } from "http-status-codes";
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
export { createPost, getPosts };

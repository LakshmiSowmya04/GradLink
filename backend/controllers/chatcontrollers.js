import StatusCodes from "http-status-codes";
import { errorResponse, successResponse } from "../lib/res/index.js";
import Chat from "../models/chat.js";

// POST request to send a chat message
async function sendMessage(req, res) {
  const { senderId, recipientId, content } = req.body;

  try {
    let chat = await Chat.findOne({
      participants: { $all: [senderId, recipientId] },
    });

    if (!chat) {
      chat = new Chat({ participants: [senderId, recipientId], messages: [] });
      await chat.save();
    }

    chat.messages.push({ sender: senderId, content });
    await chat.save();

    return res
      .status(StatusCodes.OK)
      .json(successResponse("Message sent successfully", null, StatusCodes.OK));
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

// GET request to retrieve chats for a specific user
async function getChats(req, res) {
  const { userId } = req.params;

  try {
    const chats = await Chat.find({ participants: userId }).populate(
      "messages.sender"
    );

    return res
      .status(StatusCodes.OK)
      .json(
        successResponse("Chats retrieved successfully", chats, StatusCodes.OK)
      );
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(errorResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

export { sendMessage, getChats };

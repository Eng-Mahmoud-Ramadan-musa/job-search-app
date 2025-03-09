import { Chat } from "../../db/models/index.js";

// get Chat
export const getChat = async (req, res, next) => {
  const senderId = req.userExist.id
  const { receiverId } = req.params

  const chat = await Chat.findOne({users: {$all: [senderId,receiverId]}}).populate("users", "firstName lastName profilePic")
  if(!chat) return next(new Error("chat not found", {cause: 404}));
  
  return res.status(200).json({ success: true, data: chat });
};


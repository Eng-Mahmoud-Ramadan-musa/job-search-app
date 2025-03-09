import { model, Schema, Types } from "mongoose";
import { messageSchema } from "./helper/schema.helper.js";

const chatSchema = new Schema({
users: {type: [{type: Types.ObjectId,ref: "User", required: true}], length: 2},
 messages: [messageSchema]
},
{timestamps: true});

export const Chat = model('Chat', chatSchema);
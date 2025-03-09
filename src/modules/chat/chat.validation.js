import Joi from "joi";
import { idSchema } from "../../middleware/joiValidationSchema.js";

// idJobSchema
export const idChatSchema = Joi.object({
    receiverId: idSchema.required(),
  }).required();

  // send message
export const sendMessageSchema = Joi.object({
  receiverId: idSchema.required(),
  message: Joi.string().required(),
}).required();
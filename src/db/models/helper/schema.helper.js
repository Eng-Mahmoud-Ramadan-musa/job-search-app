import { Schema, Types } from "mongoose";
import { OTPType } from "./object.helper.js";

// schema image
export const imageSchema = new Schema({
    secure_url: { type: String,required: true},
    public_id: { type: String,required: true}
  }, {  timestamps: false ,_id: false });  

// schema message
export const messageSchema = new Schema({
    message: { type: String,required: true},
    senderId: { type: Types.ObjectId,ref: "User",required: true},
  }, {  timestamps: true , }); 
  
// schema OTP
export const OTPSchema = new Schema({
    code: { type: String,required: true},
    type: {type: String,
    required: true,
    enum: Object.values(OTPType),
    },
    expiresIn: { type: Date, default: () => new Date(), index: { expires: '20s' } },
  }, {  timestamps: false ,_id: false });  

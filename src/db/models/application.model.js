import { model, Schema, Types } from "mongoose";
import { imageSchema } from "./helper/schema.helper.js";
import { status } from "./helper/object.helper.js";

const applicationSchema = new Schema({
 jobId: {type: Types.ObjectId, ref: "Job", required: true},
 userId: {type: Types.ObjectId, ref: "User", required: true},
 userCV: imageSchema,
 status: {type: String , enum: Object.values(status), default: status.PENDING}
},
{timestamps: true});

export const Application = model('Application', applicationSchema);
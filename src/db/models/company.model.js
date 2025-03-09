import { Schema, Types, model } from "mongoose";
import { imageSchema } from "./helper/schema.helper.js";

const companySchema = new Schema({
 companyName: {type: String, unique: true, required: true},
 description: {type: String,  required: true},
 industry: {type: String,  required: true},
 address: {type: String,  required: true},
 numberOfEmployees: {
    type: String,         
    enum: ["1-10", "11-20", "21-50", "51-100" ,"101+"],
    required: true
},
companyEmail: {type: String, unique: true, required: true},
createdBy: {type: Types.ObjectId, ref: "User" , required: true},
logo: imageSchema,
coverPic: imageSchema,
HRS: [{type: Types.ObjectId, ref: "User"},],
deletedAt: {type: Date, default: null},
bannedAt: {type: Date, default: null},
legalAttachment: imageSchema,
approvedByAdmin: {type: Boolean, default: false}

},
{
    timestamps: true,    
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

companySchema.virtual("jobs",{
    ref: "Job",
    localField: "_id",
    foreignField: "companyId"
})


export const Company = model("Company", companySchema);

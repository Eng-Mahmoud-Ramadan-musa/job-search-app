import { model, Schema, Types } from "mongoose";
import { jobLocation, seniorityLevel, workingTime } from "./helper/object.helper.js";

const jobSchema = new Schema({
    jobTitle: {type: String, required: true},
     jobLocation: {
        type: String,
        enum: Object.values(jobLocation),
        required: true
    },
    workingTime: {
        type: String,
        enum: Object.values(workingTime),
        required: true
    },
    seniorityLevel: {
        type: String,
        enum: Object.values(seniorityLevel),
        required: true
    },
    jobDescription: {type: String, required: true},
    technicalSkills: [{type: String, required: true}],
    softSkills: [{type: String, required: true}],
    addBy: {type: Types.ObjectId,ref: "User", required: true},
    updatedBy: {type: Types.ObjectId,ref: "User", default: null},
    closed: {type: Boolean, default: false},
    companyId: {type: Types.ObjectId,ref: "Company", required: true}
},
{
    timestamps: true,    
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

jobSchema.virtual("applications",{
    ref: "Application",
    localField: "_id",
    foreignField: "jobId"
})

export const Job = model('Job', jobSchema);
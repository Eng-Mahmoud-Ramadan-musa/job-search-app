import Joi from "joi";
import { attachmentSchema, addressSchema, idSchema, jobTitleSchema, workingTimeSchema, seniorityLevelSchema, descriptionSchema, skillsSchema, statusSchema } from "../../middleware/joiValidationSchema.js";

// addJobSchema
export const addJobSchema = Joi.object({
  jobTitle: jobTitleSchema.required(),
  jobLocation: addressSchema.required(),
  workingTime: workingTimeSchema.required(),
  seniorityLevel: seniorityLevelSchema.required(),
  jobDescription: descriptionSchema.required(),
  technicalSkills: skillsSchema.required(),
  softSkills: skillsSchema.required(),
  companyId: idSchema.required(),
}).required();

// updateJobSchema
export const updateJobSchema = Joi.object({
  id: idSchema.required(),
  jobTitle: jobTitleSchema,
  jobLocation: addressSchema,
  workingTime: workingTimeSchema,
  seniorityLevel: seniorityLevelSchema,
  jobDescription: descriptionSchema,
  technicalSkills: skillsSchema,
  softSkills: skillsSchema,
  companyId: idSchema,
}).required();

// idJobSchema
export const idJobSchema = Joi.object({
  id: idSchema.required(),
}).required();

// allJobsSchema
export const allJobsSchema = Joi.object({
  limit: Joi.number(),
  skip: Joi.number(),
  sortBy: Joi.string(),
  companyId: idSchema,
}).required();

// applyJobSchema
export const applyJobSchema = Joi.object({
  jobId: idSchema.required(),
  cv: attachmentSchema.required(),
}).required();

// accept or reject
export const acceptOrRejectSchema = Joi.object({
  applicationId: idSchema.required(),
  status: statusSchema.required()
}).required();
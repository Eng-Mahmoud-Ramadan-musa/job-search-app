import Joi from "joi";
import {attachmentSchema, addressSchema, companyNameSchema, descriptionSchema, emailSchema, idSchema } from "../../middleware/joiValidationSchema.js";

// addCompanySchema
export const addCompanySchema = Joi.object({
  companyName: companyNameSchema.required(),
  description: descriptionSchema.required(),
  companyEmail: emailSchema.required(),
  industry: addressSchema.required(),
  address: addressSchema.required(),
  numberOfEmployees: addressSchema.required(),
}).required();

// updateCompanySchema
export const updateCompanySchema = Joi.object({
  id: idSchema.required(),
  companyName: companyNameSchema,
  description: descriptionSchema,
  companyEmail: emailSchema,
  industry: addressSchema,
  address: addressSchema,
  numberOfEmployees: addressSchema,
}).required();

// idCompanySchema
export const idCompanySchema = Joi.object({
  id: idSchema.required(),
}).required();

// searchByNameSchema
export const searchByNameSchema = Joi.object({
  companyName: companyNameSchema.required(),
}).required();

// upload logo
export const logoSchema = Joi.object({
  logo: attachmentSchema.required()
}).required();

// upload coverPic
export const coverPicSchema = Joi.object({
  coverPic: attachmentSchema.required()
}).required();

// delete image
export const publicIdSchema = Joi.object({
  publicId: Joi.string().required()
}).required();

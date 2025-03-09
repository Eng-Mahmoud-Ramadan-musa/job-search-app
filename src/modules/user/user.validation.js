import Joi from "joi";
import { attachmentSchema, confirmPasswordSchema, DOBSchema, emailSchema, firstNameSchema, genderSchema, idSchema, lastNameSchema, mobileNumberSchema, passwordSchema } from "../../middleware/joiValidationSchema.js";

// profile user specific Schema
export const profileSpecificSchema = Joi.object({
  id: idSchema.required()

}).required();

// update Account Schema
export const updateAccountSchema = Joi.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  mobileNumber: mobileNumberSchema,
  DOB: DOBSchema,
  gender: genderSchema
  }).required();

// update password
export const updatePasswordSchema = Joi.object({
  oldPassword: passwordSchema.required(),
  newPassword: passwordSchema.required(),
  confirmPassword: confirmPasswordSchema.required(),
}).required();

// upload profilePic
export const profilePicSchema = Joi.object({
  profilePic: attachmentSchema.required()
}).required();

// upload coverPic
export const coverPicSchema = Joi.object({
  coverPic: attachmentSchema.required()
}).required();


// delete image
export const publicIdSchema = Joi.object({
  publicId: Joi.string().required()
}).required();

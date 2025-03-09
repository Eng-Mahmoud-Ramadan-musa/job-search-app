import Joi from "joi";
import { confirmPasswordSchema, DOBSchema, emailSchema, firstNameSchema, genderSchema, lastNameSchema, mobileNumberSchema, otpSchema, passwordSchema } from "../../middleware/joiValidationSchema.js";

// Register Schema
export const registerSchema = Joi.object({
  firstName: firstNameSchema.required(),
  lastName: lastNameSchema.required(),
  email: emailSchema.required(),
  password: passwordSchema.required(),
  confirmPassword: confirmPasswordSchema.required(),
  mobileNumber: mobileNumberSchema.required(),
  DOB: DOBSchema.required(),
  gender: genderSchema.required()
}).required();

// Confirm Schema
export const confirmSchema = Joi.object({
  email: emailSchema.required(),
  otp: otpSchema.required(),
}).required();

// Login Schema
export const loginSchema = Joi.object({
  email: emailSchema.required(),
  password: passwordSchema.required(),
}).required();

// Forget Password Schema
export const forgetPasswordSchema = Joi.object({
  email: emailSchema.required(),
}).required();

// Reset Password Schema
export const resetPasswordSchema = Joi.object({
  email: emailSchema.required(),
  otp: otpSchema.required(),
  password: passwordSchema.required(),
  confirmPassword: confirmPasswordSchema.required()
}).required();

// Google Login Schema
export const googleLoginSchema = Joi.object({
  idToken: Joi.string().required().messages({ "string.empty": "idToken is required" }),
}).required();

// Refresh Token Schema
export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({ "string.empty": "Refresh token is required" }),
}).required();

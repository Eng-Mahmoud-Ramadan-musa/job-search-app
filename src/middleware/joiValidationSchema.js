import Joi from "joi";
import { genders, seniorityLevel, status, workingTime } from "../db/models/helper/object.helper.js";

// id
export const idSchema = Joi.string().trim().regex(/^[a-fA-F0-9]{24}$/).messages({
    "string.pattern.base": "Invalid ID format. Must be a valid MongoDB ObjectId",
    "string.empty": "_id is required",
});

//  email
export const emailSchema = Joi.string().email({ tlds: { allow: false } }).messages({
  "string.email": "Invalid email format",
  "string.empty": "Email is required",
});

// password
export const passwordSchema = Joi.string().min(6).messages({
  "string.min": "Password must be at least 6 characters",
  "string.empty": "Password is required",
});

// otp
export const otpSchema = Joi.string().length(6).messages({
  "string.length": "OTP must be exactly 6 characters",
  "string.empty": "OTP is required",
});

// firstName
export const firstNameSchema = Joi.string().min(5).max(15).messages({
    "string.min": "First name must be at least 5 characters",
    "string.max": "First name cannot exceed 15 characters",
    "string.empty": "First name is required",
  })

// lastName
export const lastNameSchema = Joi.string().min(5).max(15).required().messages({
  "string.min": "last name must be at least 5 characters",
  "string.max": "last name cannot exceed 15 characters",
  "string.empty": "last name is required",
});

// companyName
export const companyNameSchema = Joi.string().messages({
  "string.empty": "company name is required",
});

// address
export const addressSchema = Joi.string().messages({
  "string.empty": "address is required",
});

// description
export const descriptionSchema = Joi.string().messages({
  "string.empty": "description is required",
});

// confirmPassword
export const confirmPasswordSchema = Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password must match password",
    "string.empty": "Confirm password is required",
  })

//  mobileNumber
export const  mobileNumberSchema = Joi.string().pattern(/^(002|\+2|)01[0-2,5][\d]{8}$/).messages({
  "string.pattern.base": "Invalid phone number format",
  "string.empty": "Phone number is required",
});

// DOB
export const DOBSchema= Joi.date().messages({
    "date.base": "Invalid date format",
    "date.empty": "Date of birth is required",
  });

// gender
export const genderSchema = Joi.string().valid(...Object.values(genders)).messages({
    "any.only": "Gender must be either 'male' or 'female'",
  });

// jobTitle
export const jobTitleSchema = Joi.string().min(5).max(50).messages({
  "string.min": "job title must be at least 5 characters",
  "string.max": "job title cannot exceed 50 characters",
  "string.empty": "job title is required",
});

// working Time
export const workingTimeSchema = Joi.string().valid(...Object.values(workingTime)).messages({
  "any.only": "working Time must be either 'male' or 'female'",
});

// seniority Level
export const seniorityLevelSchema = Joi.string().valid(...Object.values(seniorityLevel)).messages({
  "any.only": "seniority Level must be either 'male' or 'female'",
});

// skills
export const skillsSchema = Joi.array().items(Joi.string().trim().min(2).max(50)) .min(1).max(20) .unique();

// attachment
export const attachmentSchema = Joi.object({
  fieldname: Joi.string().required(),
  originalname: Joi.string().required(),
  encoding: Joi.string().required(),
  mimetype: Joi.string().required(),
  destination: Joi.string().required(),
  filename: Joi.string().required(),
  path: Joi.string().required(),
  size: Joi.number().required(),
})

// status
export const statusSchema = Joi.string().valid(...Object.values(status)).messages({
  "any.only": "status must be either 'rejected' or 'accepted'",
});

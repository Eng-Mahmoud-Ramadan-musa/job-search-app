import {Schema ,Types,model} from 'mongoose'
import { genders, providers, roles } from './helper/object.helper.js';
import { imageSchema, OTPSchema } from './helper/schema.helper.js';
import { encrypt, hash } from '../../utils/index.js';

const userSchema = new Schema ({
  firstName: {        type: String,
        minlength: [5, "firstName must be at least 5 characters"],
        maxlength: [15, "firstName cannot exceed 15 characters"],
        required: [true, "firstName is required"],
      },  
  lastName: {        type: String,
        minlength: [5, "lastName must be at least 5 characters"],
        maxlength: [15, "lastName cannot exceed 15 characters"],
        required: [true, "lastName is required"],
      },  
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exist"],
        lowercase: true,
        trim: true,
        match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"],
      },
    password: {
      type: String,
      required: function() {
        return this.provider === providers.SYSTEM
      }  ,
      minlength: [6, "Password must be at least 6 characters"],
    },
    provider: {
      type: String,
      enum: Object.values(providers),
      default: providers.SYSTEM
    },
    gender: {
      type: String,
      enum: Object.values(genders),
      required: true,
    },
    DOB: {
      type: Date,
      required: function() {
          return this.provider === providers.SYSTEM
      },
      validate: {validator: function(value) {
        const age = new Date().getFullYear() - value.getFullYear()
        return age >= 18
      },
      message: "age must be greater than 18 years"}
    },
    mobileNumber: {
      type: String,
      required: function() {
        return this.provider === providers.SYSTEM
      }  ,
      unique: [true, "phone already exist"],
      },
    role: {
      type: String,
      enum: Object.values(roles),
      default: roles.USER,
    },
    isConfirmed: {      
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date,
      default: null
    },
    bannedAt: {
      type: Date,
      default: null
    },
    updatedBy: {type: Types.ObjectId, ref: "User" , default: null},
    changeCredentialTime: {
      type: Date,
    },
    profilePic: imageSchema,
    coverPic: imageSchema,
    OTP: [OTPSchema]
  },
{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
}
);
// userName virtual
userSchema.virtual("userName").get(function() {return `${this.firstName.toLowerCase()} ${this.lastName.toLowerCase()}`});

// hashing before save
userSchema.pre("save", function (next){
    if(this.isModified("password")){
      this.password = hash({plainText: this.password})
    };
    if(this.isModified("mobileNumber")){
      this.mobileNumber = encrypt({plainText: this.mobileNumber})
    };
    if (this.isModified("OTP")) {
      this.OTP.forEach(otp => {
        otp.code = encrypt({ plainText: otp.code });
      });
    }
    next();
})
export const User = model("User", userSchema);

import { OAuth2Client } from "google-auth-library";
import { customAlphabet } from "nanoid";
import {
  compareHash,
  decrypt,
  emailEmitter,
  generateToken,
  messages,
  verifyToken,
} from "../../utils/index.js";
import { User } from "../../db/models/index.js";
import { OTPType } from "../../db/models/helper/object.helper.js";

// generateUserToken
const generateUserToken = (user) => {
  const accessToken = generateToken({
    payload: { id: user._id, email: user.email },
    options: { expiresIn: "1h" },
  });
  
  const refreshToken = generateToken({
    payload: { id: user._id, email: user.email },
    options: { expiresIn: "7d" },
  });
  
  user.mobileNumber = decrypt({ cipherText: user.mobileNumber });
  const { password, ...safeUser } = user.toObject();
  
  return { accessToken, refreshToken, user: safeUser };
};

// register
export const register = async (req, res, next) => {
  // get data from req
  const {firstName, lastName, email, password, mobileNumber, DOB, gender } = req.body;

  const userExist = await User.findOne({email})
  if (userExist) return next(new Error("email already exist!"))

    // sendOTP
    const alphabet = "0123456789ABCDEF";
    const otp = customAlphabet(alphabet, 6)();
    emailEmitter.emit(
      "sendEmail",
      email,
      OTPType.CONFIRM_EMAIL,
      otp
    );
  
  // create user
   const user = await User.create({
    firstName,
    lastName,
    email, 
    password, 
    mobileNumber, 
    DOB, 
    gender, 
    OTP:[{code: otp, type: OTPType.CONFIRM_EMAIL}]
   });

   await user.save();
  return res
    .status(201)
    .json({ success: true, message: messages.USER.createdSuccessfully,otp });
};

// confirm
export const confirm = async (req, res,next) => {
  const {email, otp} = req.body;

  const user = await User.findOne({email})
  if (!user) return next(new Error("user not found!"))
  if (user.isConfirmed) return next(new Error("account already confirmed!")) 
  const otpValid = user.OTP.find(obj => decrypt({ cipherText: obj.code}) === otp && obj.type === OTPType.CONFIRM_EMAIL)
  if(!otpValid) return next(new Error("invalid otp!"));


  
  user.isConfirmed = true;

  await user.save()
  return res
  .status(200)
  .json({ success: true, message: "login try again!" });
}

// login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (!userExist)
    return next(
      new Error(messages.USER.invalidEmailOrPassword, { cause: 404 })
    );
    const match = compareHash({ plainText: password, hash: userExist.password });
    if (!match)
      return next(
    new Error(messages.USER.invalidEmailOrPassword, { cause: 404 })
  );
  
  if (userExist.deletedAt !== null) {
    await User.updateOne({ _id: userExist._id }, { isDeleted: null });
  }
  const { accessToken, refreshToken, safeUser } = generateUserToken(userExist);

  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: safeUser,
    },
  });
};

// forget Password
export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  const userExist = await User.findOne({email});
  if (!userExist)
    return next(
      new Error("user not found!", { cause: 404 })
    );

  const alphabet = "0123456789ABCDEF";
  const otp = customAlphabet(alphabet, 6)();
  emailEmitter.emit(
    "sendEmail",
    email,
    OTPType.FORGET_PASSWORD,
    otp
  );

  userExist.OTP.push({code: otp, type:OTPType.FORGET_PASSWORD});
  await userExist.save();
  return res.status(200).json({
    success: true,
    message: messages.OTP.otpSendSuccessfully,
    otp
  });
};

// resetPassword
export const resetPassword = async (req, res, next) => {
  const { email, otp, password } = req.body;
  const userExist = await User.findOne({email});

  if (!userExist)
    return next(new Error(messages.USER.notFound, { cause: 404 }));

    const otpExist = userExist.OTP.find(obj => decrypt({cipherText: obj.code}) === otp );
    if(!otpExist) return next(new Error("invalid otp!"));
  
  // تحديث كلمة المرور
  userExist.password = password;
  await userExist.save();

  return res.status(200).json({
    success: true,
    message: messages.USER.tryToLogin,
  });
};

// signin & signup with google 
const client = new OAuth2Client();
const verifyGoogleToken = async (idToken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.CLIENT_ID,
    });
    return ticket.getPayload();
  } catch (error) {
    console.error("Error verifying Google Token:", error);
    throw new Error("Invalid Google Token");
  }
};

export const googleLogin = async (req, res, next) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res
      .status(400)
      .json({ success: false, message: "idToken is required" });
  }

  const { name, email, picture } = await verifyGoogleToken(idToken);
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ")[1];
  let userExist = await User.findOne({ email });
  if (!userExist) {
    userExist = await User.create({
      email,
      firstName,
      lastName,
      profilePic: picture,
      provider: providers.GOOGLE,
    });
  }
  const { accessToken, refreshToken, safeUser } = generateUserToken(userExist);

  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: safeUser,
    },
  });
};


// refreshToken
export const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;
  const result = verifyToken({payload: refreshToken});
  if (result.error) return next(result.error)

  const access_token = generateToken({payload: {email: result.email, id: result.id}, options: {expiresIn: '1h'}})
  return res.status(200).json({
    success: true,
    access_token,
  });
};


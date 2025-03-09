import { User } from "../../db/models/index.js";
import { decrypt, messages } from "../../utils/index.js";
import cloudinary from "../../utils/multer/cloud.config.js";

// myProfile
export const myProfile = async (req, res, next) => {
  const userExist = req.userExist;
  const users = await User.find({ _id: { $ne: userExist.id } });

  return res.status(200).json({ success: true, message: "get my Profile successfully" ,data: {...userExist._doc, password: "", OTP: [],mobileNumber: decrypt({cipherText: userExist._doc.mobileNumber}),users }});
};

// getProfile user specific
export const ProfileUserSpecific = async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findById(userId);
  
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  return res.status(200).json({ success: true, message: "get user profile successfully",data: {...user, password: "", OTP: []} });
};

// softDelete
export const softDelete = async (req, res, next) => {
  req.userExist.deletedAt = new Date();

  await req.userExist.save();
  return res.status(200).json({
    success: true,
    message: messages.USER.archiveAccount,
  });
};

// update password
export const updatePassword = async (req, res, next) => {
  const {newPassword} = req.body;
  const {userExist} = req.userExist;

  userExist.password = newPassword;
  await userExist.save();

  return res.status(200).json({ success: true, message: "password updated successfully" });
};

// upload profilePic
export const uploadProfilePic = async (req, res, next) => {
   
  const folder = `job-search-app/users/${req.userExist._id}/profilePic`;
console.log( req.file.path);

  const {secure_url, public_id} = await cloudinary.uploader.upload(
    req.file.path, 
    {folder}
  );

const user = await User.findByIdAndUpdate(req.userExist.id,{ 
  profilePic: {secure_url, public_id}
});
  return res.status(200).json({ success: true, message: "profilePic uploaded successfully" });
};

// delete profilePic
export const deleteProfilePic = async (req, res, next) => {
  
   const { publicId } = req.body;

   if (!publicId) {
       return res.status(400).json({ success: false, message: "publicId is required" });
   }

   // حذف الصورة من Cloudinary
   const result = await cloudinary.uploader.destroy(publicId);

   if (result.result !== "ok") {
       return res.status(400).json({ success: false, message: "Failed to delete image" });
   }  
   const user = await User.findById(req.userExist._id)
   user.profilePic = null;
   await user.save()

  
  return res.status(200).json({ success: true, message: "profilePic deleted successfully" });
};

// upload CoverPic
export const uploadCoverPic = async (req, res, next) => {
  const folder = `job-search-app/users/${req.userExist._id}/coverPic`;

  const {secure_url, public_id} = await cloudinary.uploader.upload(
    req.file.path, 
    {folder}
  );

 await User.findByIdAndUpdate({_id: req.userExist._id},{ 
  coverPic: {secure_url, public_id}
});
  return res.status(200).json({ success: true, message: "coverPic uploaded successfully" });
};

// delete coverPic
export const deleteCoverPic = async (req, res, next) => {
  const { publicId } = req.body;

  if (!publicId) {
      return res.status(400).json({ success: false, message: "publicId is required" });
  }

  // حذف الصورة من Cloudinary
  const result = await cloudinary.uploader.destroy(publicId);

  if (result.result !== "ok") {
      return res.status(400).json({ success: false, message: "Failed to delete image" });
  }  
  const user = await User.findById(req.userExist._id)
  user.coverPic = null;
  await user.save()

 
 return res.status(200).json({ success: true, message: "coverPic deleted successfully" });
};









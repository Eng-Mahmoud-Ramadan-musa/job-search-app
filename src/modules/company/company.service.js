import moment from "moment";
import { Application, Company, Job } from "../../db/models/index.js";
import cloudinary from "../../utils/multer/cloud.config.js";

// add Company
export const addCompany = async (req, res, next) => {
  const userId = req.userExist._id
  const { companyName,companyEmail } = req.body

  const company = await Company.findOne({$or: [{companyName},{companyEmail}]})
  if(company) return next(new Error("company already exist", {cause: 409}));
  
  await Company.create({...req.body, createdBy: userId})
  return res.status(201).json({ success: true, message: "company created successfully"});
};

// update Company
export const updateCompany = async (req, res, next) => {
  const userId = req.userExist._id
  const { id } = req.params

  const company = await Company.findById(id)
  if(!company) return next(new Error("company not found", {cause: 404}));

  if(company.createdBy.toString() !== userId.toString()) return next(new Error("not authorized to update company", {cause: 401}))

  const {legalAttachment, ...updateDate} = req.body
  await Company.findByIdAndUpdate({_id: id}, updateDate);

  return res.status(200).json({ success: true, message: "company updated successfully"});
};

// soft delete
export const softDelete = async (req, res, next) => {
  const {id} = req.params;
  const userId = req.userExist._id

  const company = await Company.findOneAndUpdate({_id: id,createdBy: userId}, {deletedAt: new Date()})
  if(!company) return next(new Error("company not found", {cause: 404}));

  return res.status(200).json({ success: true, message: "company soft-delete successfully"});
};

// get company specific
export const getCompanySpecific = async (req, res, next) => {
  const {id} = req.params;

  const company = await Company.findById(id).populate("jobs");
  if(!company) return next(new Error("company not found", {cause: 404}));

  return res.status(200).json({ success: true, message: "get job for company successfully",data: company });
};

// search By Name
export const searchByName = async (req, res, next) => {
  const {companyName} = req.query;
  const companies = await Company.find({companyName: {$regex: companyName, $options: "i"}})
  if(!companies) return next(new Error("companies not found", {cause: 404}));

  return res.status(200).json({ success: true, message: "get companies by name successfully",data: companies });
};

// upload logo
export const uploadLogo= async (req, res, next) => {

  const folder = `job-search-app/company/${req.userExist._id}/logo`;

  const {secure_url, public_id} = await cloudinary.uploader.upload(
    req.file.path, 
    {folder}
  );

const user = await Company.findByIdAndUpdate({_id: req.userExist._id},{ 
  logo: {secure_url, public_id}
});
  return res.status(200).json({ success: true, message: "logo uploaded successfully" });
};

// delete logo
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
  const company = await Company.findById(req.userExist._id)
  company.logo = null;
  await company.save()

 
 return res.status(200).json({ success: true, message: "coverPic deleted successfully" });
};

// upload CoverPic
export const uploadCoverPic = async (req, res, next) => {

  const folder = `job-search-app/company/${req.userExist._id}/coverPic`;
  const {secure_url, public_id} = await cloudinary.uploader.upload(
    req.file.path, 
    {folder}
  );

 await Company.findByIdAndUpdate({_id: req.userExist._id},{ 
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
  const company = await Company.findById(req.userExist._id)
  company.coverPic = null;
  await company.save()

 
 return res.status(200).json({ success: true, message: "coverPic deleted successfully" });
};


// export const excelSheet = async (req, res, next) => {
//     const { companyId, date } = req.params;
//     const startOfDay = moment(date).startOf("day").toDate();
//     const endOfDay = moment(date).endOf("day").toDate();

//     // جلب الطلبات الخاصة بالشركة في هذا اليوم
//     const applications = await Application.find({
//       companyId: companyId,
//       createdAt: { $gte: startOfDay, $lte: endOfDay },
//     }).populate("userId", "firstName lastName email");

//     if (applications.length === 0) {
//       return res.status(404).json({ message: "لا توجد طلبات في هذا اليوم." });
//     }

//     // إنشاء بيانات الملف
//     const data = applications.map((app) => ({
//       companyName: `${app.userId.firstName} ${app.userId.lastName}`,
//       companyEmail: {type: String, unique: true, required: true},
// // : app.userId.email,
//       statusCompany: app.status,
//       applyDate: moment(app.createdAt).format("YYYY-MM-DD HH:mm:ss"),
//     }));

//     // إنشاء ملف Excel
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

//     const filePath = './exports/applications_${companyId}_${date}.xlsx';
//     XLSX.writeFile(workbook, filePath);

//     // إرسال الملف كاستجابة
//     res.download(filePath, (err) => {
//       if (err) {
//         console.error("Error downloading file:", err);
//         res.status(500).json({ message: "حدث خطأ أثناء تحميل الملف." });
//       }
//       // حذف الملف بعد التحميل
//       fs.unlinkSync(filePath);
//     });
//   }













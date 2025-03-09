import { Application, Company, Job } from "../../db/models/index.js";
import { emailEmitter } from "../../utils/index.js";
import cloudinary from "../../utils/multer/cloud.config.js";

// add Job
export const addJob = async (req, res, next) => {
  const userId = req.userExist._id
  const { companyId } = req.body

  const company = await Company.findById(companyId)
  if(!company) return next(new Error("company not found", {cause: 404}));
  console.log(company.createdBy.toString() , userId.toString());
  

  if(company.createdBy.toString() !== userId.toString()) return next(new Error("not authorized to add job", {cause: 401}))

  await Job.create({...req.body,addBy: userId})
  return res.status(200).json({ success: true, message: "job created successfully"});
};

// update Job
export const updateJob = async (req, res, next) => {
  const userId = req.userExist._id
  const { id } = req.params

  const job = await Job.findById(id)
  if(!job) return next(new Error("job not found", {cause: 404}));

  if(job.addBy.toString() !== userId.toString()) return next(new Error("not authorized to update job", {cause: 401}))

  await Job.findByIdAndUpdate({_id: id},{ ...req.body})
  return res.status(200).json({ success: true, message: "job updated successfully"});
};

// delete
export const deleteJob = async (req, res, next) => {
  const userId = req.userExist._id
  const { id } = req.params

  const job = await Job.findById(id)
  if(!job) return next(new Error("job not found", {cause: 404}));

  const company = await Company.findById(job.companyId)
  if(!job) return next(new Error("company not found", {cause: 404}));

  if(job.addBy.toString() !== userId.toString()) return next(new Error("not authorized to delete job", {cause: 401}))

  await Job.deleteOne()
  return res.status(200).json({ success: true, message: "job deleted successfully"});
};

// get Jobs
export const getJobs = async (req, res, next) => {
  const {companyId , skip = 0, limit = 5 , sortBy = "createdAt"} = req.query;

  const filter = companyId ? {} : {companyId};
  const totalJob = await Job.countDocuments(filter);
  
  const jobs = await Job.find(filter).skip(skip).limit(limit).sort({[sortBy]: -1})
  return res.status(200).json({ success: true,data: {totalJob, jobs} });
};

// filter jobs
export const filerJobs = async (req, res, next) => {
  const {workingTime , jobLocation, seniorityLevel , jobTitle, technicalSkills} = req.query;
  const filter = {};

  return res.status(200).json({ success: true,data: {...user, password: "", OTP: []} });
};

// get job applications
export const getJobApplications = async (req, res, next) => {
  const {id} = req.params;
  const job = await Job.findById(id).populate({
    path: "applications",
    populate: {
      path: "userId",
      select: "firstName lastName email profilePic"
    }, 
  });
  if(!job) return next(new Error("job not found!", {cause: 404}))
  return res.status(200).json({ success: true,data: job});
};

// apply to job
export const applyToJob = async (req, res, next) => {
  const {jobId} = req.body;
  const userId = req.userExist._id;

  const folder = `job-search-app/users/${userId}/CV`;
  
  const {secure_url, public_id} = await cloudinary.uploader.upload(
    req.file.path, 
    {folder},
  );
  
  const application = await Application.create({
    jobId,
    userId,
    userCV:{secure_url, public_id}
  });
  console.log(application);
  // send notification for HR
  // await io.emit("newApplication",{jobId, user: req.userExist})
  
  return res.status(200).json({ success: true,data: application});
};

// accept or reject
export const acceptOrReject = async (req, res, next) => {
  const {applicationId} = req.params;
  const {status} = req.body;
  if(!["accepted", "rejected"].includes(status)) return next(new Error("invalid status!", {cause: 404}))
  
  const application = await Application.findById(applicationId).populate("userId");
  if(!application) return next(new Error("application not found!", {cause: 404}))

  application.status = status;
  await application.save();

    emailEmitter.emit(
      "sendEmail",
      application.userId.email,
      "job status update",
      `your application has been ${status} `
    );
  return res.status(200).json({ success: true, data: application});
};


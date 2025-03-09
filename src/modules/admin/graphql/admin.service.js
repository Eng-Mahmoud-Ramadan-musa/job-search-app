import { roles } from "../../../db/models/helper/object.helper.js";
import { Company, User } from "../../../db/models/index.js";
import { isAuthenticate, isAuthorized } from "../../../utils/graphql/index.js";
import { messages } from "../../../utils/index.js";

// getAllData
export const getAllData = async (_,args,context) => {
   await isAuthenticate(context);
   isAuthorized(context,roles.ADMIN)
   const users = await User.find().select("-password -OTP")
   const Companies = await Company.find()
    return {users, Companies}
};

// toggleUserBan
export const toggleUserBan = async (_,args,context) => {
    await isAuthenticate(context);
    isAuthorized(context,roles.ADMIN);
    const {id} = args
    const user = await User.findById(id)
    if(!user) throw new Error(messages.USER.notFound, {cause: 404});
    user.bannedAt = user.bannedAt ? null : new Date();
    await user.save()
    
    return user;
};

// toggleCompanyBan
export const toggleCompanyBan = async (_,args,context) => {
    await isAuthenticate(context);
    isAuthorized(context,roles.ADMIN);
    const {id} = args
    const company = await Company.findById(id)
    if(!company) throw new Error("company not found!", {cause: 404});
    company.bannedAt = company.bannedAt ? null : new Date();
    await company.save()
    
    return company;
};

// approveCompany
export const approveCompany = async (_,args,context) => {
    await isAuthenticate(context);
    isAuthorized(context,roles.ADMIN);
    const {id} = args
    const company = await Company.findById(id)
    if(!company) throw new Error("company not found!", {cause: 404});
    company.approvedByAdmin = true
    await company.save()
    
    return company;
};

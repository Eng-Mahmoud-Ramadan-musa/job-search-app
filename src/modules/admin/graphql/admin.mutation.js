import { approveCompany, toggleCompanyBan, toggleUserBan } from "./admin.service.js";
import { idReq } from "./type/admin.type.req.js";
import {  companyResponse, userResponse } from "./type/admin.type.res.js";

export const adminMutations = {
  toggleUserBan: { type: userResponse, args: idReq, resolve: toggleUserBan },
  toggleCompanyBan: { type: companyResponse, args: idReq, resolve: toggleCompanyBan },
  approveCompany: { type: companyResponse, args: idReq, resolve: approveCompany },
};

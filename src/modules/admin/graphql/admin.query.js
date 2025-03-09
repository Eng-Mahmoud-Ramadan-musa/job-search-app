import { getAllData } from "./admin.service.js";
import { allDataResponse } from "./type/admin.type.res.js";

export const adminQuery = {
  getAllData: { type: allDataResponse, resolve: getAllData },
};


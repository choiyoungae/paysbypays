import { api } from "./index";

export const getMerchants = () => api("/merchants/list");
export const getMerchantDetails = () => api("/merchants/details");
export const getMerchantDetailsByCode = (mchtCode: string) =>  api(`/merchants/details/${mchtCode}`);
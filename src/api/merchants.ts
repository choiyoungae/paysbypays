import { api } from "./index";
import { ApiResponseListMerchantListRes, ApiResponseMerchantDetailRes } from "./types";

export const getMerchants = async (): Promise<ApiResponseListMerchantListRes> => {
    return api("/merchants/list");
};

export const getMerchantDetails = async (): Promise<ApiResponseMerchantDetailRes> => {
    return api(`/merchants/details`);
};

export const getMerchantDetailsByCode = (mchtCode: string) => api(`/merchants/details/${mchtCode}`);
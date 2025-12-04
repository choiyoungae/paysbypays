import { api } from "./index";
import { ApiResponseListMerchantListRes, ApiResponseMerchantDetailRes } from "./types";

export const getMerchants = async (): Promise<ApiResponseListMerchantListRes> => {
    return api("/merchants/list");
};

export const getMerchantDetail = async (
    mchtCode: string,
): Promise<ApiResponseMerchantDetailRes> => {
    return api(`/merchants/${mchtCode}`);
};

export const getMerchantDetailsByCode = (mchtCode: string) => api(`/merchants/details/${mchtCode}`);
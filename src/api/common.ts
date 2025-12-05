import { api } from "./index";
import { ApiResponseListPayTypeRes, ApiResponseListStatusRes } from "./types";

export const getPaymentStatusCodes = async () => {
    const res = await api<ApiResponseListStatusRes>(
        "/common/payment-status/all"
    );
    return res.data; // StatusRes[]
};

export const getPaymentTypeCodes = async () => {
    const res = await api<ApiResponseListPayTypeRes>(
        "/common/paymemt-type/all"
    );
    return res.data; // PayTypeRes[]
};

export const getMerchantStatusCodes = async () => {
    const res = await api<ApiResponseListStatusRes>(
        "/common/mcht-status/all"
    );
    return res.data;
};

import { api } from "./index";
import { ApiResponseListPaymentListRes } from "./types";

export const getPayments = async (): Promise<ApiResponseListPaymentListRes> => {
    return api("/payments/list");
};
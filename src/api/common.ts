import { api } from "./index";

export const getPaymentStatuses = () => api("/common/payment-status/all");
export const getPaymentTypes = () => api("/common/payment-type/all");
export const getMerchantStatuses = () => api("/common/mcht-status/all");

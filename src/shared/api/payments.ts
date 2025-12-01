import { api } from "./index";

export const getPayments = () => api("/payments/list");

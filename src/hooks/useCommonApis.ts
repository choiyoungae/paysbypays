import { useQuery } from "@tanstack/react-query";
import {
    getPaymentStatusCodes,
    getPaymentTypeCodes,
    getMerchantStatusCodes,
} from "@/api/common";

export function usePaymentStatusCodes() {
    return useQuery({
        queryKey: ["common", "payment-status"],
        queryFn: getPaymentStatusCodes,
        staleTime: Infinity,
        gcTime: Infinity,
    });
}

export function usePaymentTypeCodes() {
    return useQuery({
        queryKey: ["common", "payment-type"],
        queryFn: getPaymentTypeCodes,
        staleTime: Infinity,
        gcTime: Infinity,
    });
}

export function useMerchantStatusCodes() {
    return useQuery({
        queryKey: ["common", "mcht-status"],
        queryFn: getMerchantStatusCodes,
        staleTime: Infinity,
        gcTime: Infinity,
    });
}

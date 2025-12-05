"use client";

import { getMerchantDetails } from "@/api/merchants";
import { MerchantDetailRes } from "@/api/types";
import { useQuery } from "@tanstack/react-query";

export const useMerchants = () => {
    return useQuery<MerchantDetailRes[]>({
        queryKey: ["merchants"],
        queryFn: async () => {
            const res = await getMerchantDetails();
            return res.data;
        },
    });
};
import { useQuery } from "@tanstack/react-query";
import { getPayments } from "@/api/payments";
import { PaymentListRes } from "@/api/types";

async function fetchPayments(): Promise<PaymentListRes[]> {
    const res = await getPayments();
    return res.data;
}

export function usePayments() {
    return useQuery({
        queryKey: ["payments"],
        queryFn: fetchPayments,
    });
}

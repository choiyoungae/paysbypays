import type { PaymentListRes, PayType } from "@/api/types";

/* ================= 공통 util ================= */

export function parseAmount(amount: string): number {
    return Number(amount);
}

/* ================= KPI 집계 ================= */

export function computeKpi(payments: PaymentListRes[]) {
    let totalSales = 0;
    let successCount = 0;
    let failedCount = 0;
    let cancelledCount = 0;

    const merchantSet = new Set<string>();

    payments.forEach((p) => {
        merchantSet.add(p.mchtCode);

        if (p.status === "SUCCESS") {
            successCount += 1;
            totalSales += parseAmount(p.amount);
        } else if (p.status === "FAILED") {
            failedCount += 1;
        } else if (p.status === "CANCELLED") {
            cancelledCount += 1;
        }
    });

    return {
        totalSales,
        successCount,
        failedCount,
        cancelledCount,
        totalCount: payments.length,
        merchantCount: merchantSet.size,
    };
}

/* ================= 결제 타입별 ================= */

export type PaymentTypeStats = {
    type: PayType;
    count: number;
    amount: number;
};

export function computeByPayType(
    payments: PaymentListRes[],
): PaymentTypeStats[] {
    const map = new Map<PayType, { count: number; amount: number }>();

    payments.forEach((p) => {
        const current = map.get(p.payType) ?? { count: 0, amount: 0 };
        current.count += 1;
        if (p.status === "SUCCESS") {
            current.amount += parseAmount(p.amount);
        }
        map.set(p.payType, current);
    });

    return Array.from(map.entries()).map(([type, v]) => ({
        type,
        count: v.count,
        amount: v.amount,
    }));
}

/* ================= 가맹점별 매출 ================= */

export type MerchantSales = {
    mchtCode: string;
    totalAmount: number;
};

export function computeMerchantSales(
    payments: PaymentListRes[],
): MerchantSales[] {
    const map = new Map<string, number>();

    payments.forEach((p) => {
        if (p.status !== "SUCCESS") return;
        const prev = map.get(p.mchtCode) ?? 0;
        map.set(p.mchtCode, prev + parseAmount(p.amount));
    });

    return Array.from(map.entries())
        .map(([mchtCode, totalAmount]) => ({ mchtCode, totalAmount }))
        .sort((a, b) => b.totalAmount - a.totalAmount)
        .slice(0, 10);
}

export function getBarRatio(context: any) {
    const data = context.dataset.data as number[];
    const value = data[context.dataIndex];
    const max = Math.max(...data);

    return {
        value,
        max,
        ratio: value / max,
    };
}

/* ================= 시간대별 매출 ================= */

export type HourlySales = {
    hourLabel: string;
    totalAmount: number;
};

export function computeHourlySales(
    payments: PaymentListRes[],
    currency?: string,
): HourlySales[] {
    const hours = Array(24).fill(0) as number[];

    payments.forEach((p) => {
        if (p.status !== "SUCCESS") return;
        if (currency && p.currency !== currency) return;
        
        const h = new Date(p.paymentAt).getHours();
        hours[h] += parseAmount(p.amount);
    });

    return hours.map((amt, idx) => ({
        hourLabel: `${idx.toString().padStart(2, "0")}시`,
        totalAmount: amt,
    }));
}

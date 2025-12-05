"use client";

import { useMemo, useState } from "react";
import { usePayments } from "@/hooks/usePayments";
import "@/lib/chart";

import DashboardPaymentTypeDonut from "./DashboardPaymentTypeDonut";
import DashboardKpiCards from "./DashboardKpiCards";
import DashboardMerchantBar from "./DashboardMerchantBar";
import DashboardSalesByHourLine from "./DashboardSaleByHourLine";

import {
    computeKpi,
    computeByPayType,
    computeMerchantSales,
    computeHourlySales,
} from "../_lib/dashboardStats";
import { usePaymentTypeCodes } from "@/hooks/useCommonApis";
import { PayType, PayTypeLabelMap } from "@/api/types";

export default function DashboardClient() {
    const { data: payments = [], isLoading, isError } = usePayments();
    const { data: typeCodes = [], isLoading: isLoadingTypeCodes } = usePaymentTypeCodes();

    const {
        totalSales,
        successCount,
        failedCount,
        cancelledCount,
        totalCount,
        merchantCount,
    } = useMemo(() => computeKpi(payments), [payments]);

    const typeMap = useMemo<PayTypeLabelMap>(() => {
        const map: PayTypeLabelMap = {};
        typeCodes.forEach((item) => {
            const key = item.type as PayType
            map[key] = item.description;
        });
        return map;
    }, [typeCodes]);

    const paymentTypeStats = useMemo(
        () => computeByPayType(payments),
        [payments],
    );

    const merchantSales = useMemo(
        () => computeMerchantSales(payments),
        [payments],
    );

    const currencies = useMemo(
        () => Array.from(new Set(payments.map((p) => p.currency))),
        [payments],
    )

    const hourLabels = useMemo(
        () => Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}시`),
        [],
    );

    const hourlySeries = useMemo(() => {
        // 색 팔레트 (전체 + 통화들)
        const colors = ["#7592ff", "#68CBB0", "#B798EB", "#F2A979", "#E88FB1"];

        const keys = ["ALL", ...currencies]; // 전체 + 통화별

        return keys.map((key, idx) => {
            const sales = computeHourlySales(
                payments,
                key === "ALL" ? undefined : key,
            );

            return {
                label: key === "ALL" ? "전체" : key, // 범례에 표시될 이름
                values: sales.map((s) => s.totalAmount),
                color: colors[idx % colors.length],
            };
        });
    }, [payments, currencies]);

    if (isLoading || isLoadingTypeCodes) return <div>대시보드를 불러오는 중...</div>;
    if (isError) return <div>대시보드 데이터를 불러오지 못했습니다.</div>;

    return (
        <div className="space-y-6">
            {/* Row 1: KPI 카드 */}
            <DashboardKpiCards
                totalSales={totalSales}
                successCount={successCount}
                failedCount={failedCount}
                cancelledCount={cancelledCount}
                totalCount={totalCount}
                merchantCount={merchantCount}
            />

            {/* Row 2: 도넛 + 바 차트 */}
            <div className="grid gap-6 lg:grid-cols-2">
                <DashboardPaymentTypeDonut stats={paymentTypeStats} typeMap={typeMap} />
                <DashboardMerchantBar data={merchantSales} />
            </div>

            {/* Row 3: 시간대별 매출 */}
            <DashboardSalesByHourLine
                series={hourlySeries}
                labels={hourLabels}
            />
        </div>
    );
}
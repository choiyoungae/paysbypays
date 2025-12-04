"use client";

import { Bar } from "react-chartjs-2";
import { getBarRatio, type MerchantSales } from "../_lib/dashboardStats";
import ComponentCard from "@/components/common/ComponentCard";
import ChartDataLabels from "chartjs-plugin-datalabels";

type Props = {
    data: MerchantSales[];
};

export default function DashboardMerchantBar({ data }: Props) {
    const labels = data.map((d) => d.mchtCode);
    const values = data.map((d) => d.totalAmount);

    const chartData = {
        labels,
        datasets: [
            {
                label: "매출액",
                data: values,
                backgroundColor: "#7592ff",
                borderRadius: 6,
                barThickness: 30,
            },
        ],
    };

    const options = {
        indexAxis: "y" as const,
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                right: 16,
            },
        },
        plugins: {
            legend: {
                display: true,
                position: "top" as const,
                labels: {
                    color: "#334155",
                    font: { size: 11 },
                },
            },
            datalabels: {
                font: {
                    weight: "bold" as const,
                    size: 11,
                },
                anchor: "end" as const,
                color: (context: any) => {
                    const { ratio } = getBarRatio(context);
                    return ratio >= 0.35 ? "#ffffff" : "#334155";
                },
                align: (context: any) => {
                    const { ratio } = getBarRatio(context);
                    return ratio < 0.35 ? "right" : "left";
                },
                offset: 6,
                formatter: (value: number) =>
                    (Number(value) || 0).toLocaleString(),
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const raw =
                            context.parsed.x ??
                            context.parsed.y ??
                            context.raw ??
                            0;
                        const value = Number(raw) || 0;
                        return `${value.toLocaleString()}`;
                    },
                },
            },
        },

        scales: {
            x: {
                ticks: {
                    color: "#334155",
                    callback: (value: any) => {
                        const num = Number(value) || 0;
                        return num.toLocaleString();
                    },
                },
                grid: { display: false },
            },
            y: {
                ticks: {
                    color: "#334155",
                    autoSkip: false,
                    maxRotation: 0,
                    maxWidth: 90,
                },
                grid: { display: false },
            },
        },
    };


    return (
        <ComponentCard title="가맹점별 매출 Top 10">
            <div className="h-[682px]">
                <Bar
                    data={chartData}
                    options={options}
                    plugins={[ChartDataLabels]}
                />
            </div>
        </ComponentCard>
    );
}

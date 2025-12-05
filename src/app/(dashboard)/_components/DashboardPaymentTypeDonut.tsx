"use client";

import { useRouter } from "next/navigation";
import ComponentCard from "@/components/common/ComponentCard";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import type { ChartData, ChartOptions } from "chart.js";
import { PaymentTypeStats } from "../_lib/dashboardStats";
import { PayTypeLabelMap } from "@/api/types";

const COLOR_MAP: Record<string, string> = {
    ONLINE: "#7EA8F5",
    DEVICE: "#68CBB0",
    MOBILE: "#B798EB",
    VACT: "#F2A979",
    BILLING: "#E88FB1",
};

type Props = {
    stats: PaymentTypeStats[];
    typeMap: PayTypeLabelMap;
};

export default function DashboardPaymentTypeDonut({ stats, typeMap }: Props) {
    const router = useRouter();

    const labels = stats.map((s) => typeMap[s.type] ?? s.type);
    const counts = stats.map((s) => s.count);
    const colors = stats.map((s) => COLOR_MAP[s.type]);

    const total = counts.reduce((a, b) => a + b, 0);

    const data: ChartData<"doughnut", number[], string> = {
        labels,
        datasets: [
            {
                data: counts,
                backgroundColor: colors,
                borderWidth: 1,
                hoverOffset: 8,
            },
        ],
    };

    const options: ChartOptions<"doughnut"> = {
        onClick: (_event, elements, _chart) => {
            if (!elements.length) return;

            const { index } = elements[0]; 
            const clickedType = stats[index]?.type;

            if (!clickedType) return;

            router.push(`/payments?payType=${clickedType}`);
        },
        plugins: {
            datalabels: {
                color: "#fff",
                font: { weight: "bold", size: 12 },
                formatter: (_value, context) => {
                    const dataset = context.chart.data.datasets[0]
                        .data as number[];
                    const value = dataset[context.dataIndex];
                    const percent = ((value / total) * 100).toFixed(0);
                    return `${percent}%`;
                },
            },
        },
    };

    return (
        <ComponentCard title="결제 수단별 비율">
            <Doughnut
                data={data}
                options={options}
                plugins={[ChartDataLabels]}
            />
        </ComponentCard>
    );
}

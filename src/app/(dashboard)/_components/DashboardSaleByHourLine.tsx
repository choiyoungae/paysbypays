import ComponentCard from "@/components/common/ComponentCard";
import { Line } from "react-chartjs-2";
import { HourlySales } from "../_lib/dashboardStats";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { legendCursorPlugin } from "@/lib/chart";

type LineSeries = {
    label: string;    // "전체", "KRW", "USD" ...
    values: number[]; // 24시간 매출 배열
    color: string;    // 각 라인의 색
};

type Props = {
    labels: string[];     // ["00시", "01시", ...]
    series: LineSeries[]; // 여러 통화 시리즈
};

export default function DashboardSalesByHourLine({ labels, series }: Props) {
    const chartData = {
        labels,
        datasets: series.map((s) => ({
            label: s.label,
            data: s.values,
            borderColor: s.color,
            backgroundColor:  s.color,
            pointBackgroundColor: s.color,
            fill: false,
        })),
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top" as const,
                labels: {
                    color: "#334155",
                    font: { size: 11 },
                },
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const value = Number(context.parsed.y || 0);
                        const label = context.dataset.label || "";
                        return `${label}: ${value.toLocaleString()}`;
                    },
                },
            },
            datalabels: {
                display: false,
            },
        },
        scales: {
            y: {
                ticks: {
                    color: "#334155",
                    callback: (value: any) =>
                        (Number(value) || 0).toLocaleString(),
                },
            },
            x: {
                ticks: {
                    color: "#334155",
                    maxRotation: 0,
                },
                grid: { display: false },
            },
        },
    };

    return (
        <ComponentCard title="시간대별 매출 추이" subtitle="범례를 클릭하여 특정 통화의 조회 여부를 전환할 수 있어요">
            <div className="relative h-[380px] w-full">
                <Line data={chartData} options={options} plugins={[ChartDataLabels, legendCursorPlugin]} />
            </div>
        </ComponentCard>
    );
}

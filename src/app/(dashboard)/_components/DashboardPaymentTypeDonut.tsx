import ComponentCard from "@/components/common/ComponentCard";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { PaymentTypeStats } from "../_lib/dashboardStats";

const COLOR_MAP: Record<string, string> = {
  ONLINE:  "#7EA8F5",  // balanced blue
  DEVICE:  "#68CBB0",  // mid-tone mint teal
  MOBILE:  "#B798EB",  // mid lavender
  VACT:    "#F2A979",  // mid peach
  BILLING: "#E88FB1",  // mid rose
};


type Props = {
    stats: PaymentTypeStats[];
};

export default function DashboardPaymentTypeDonut({ stats }: Props) {
    const labels = stats.map((s) => s.type);
    const counts = stats.map((s) => s.count);
    const colors = labels.map((type) => COLOR_MAP[type]);

    const total = counts.reduce((a, b) => a + b, 0);

    const data = {
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

    const options = {
        plugins: {
            datalabels: {
                color: "#fff",
                font: {
                    weight: "bold" as const,
                    size: 12,
                },
                formatter: (_value: number, context: any) => {
                    const dataset = context.chart.data.datasets[0].data;
                    const value = dataset[context.dataIndex];
                    const percent = ((value / total) * 100).toFixed(0);
                    return `${percent}%`;
                },
            },
        },
    };

    return (
        <ComponentCard title="결제 수단별 비율">
            <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />
        </ComponentCard>
    );
}

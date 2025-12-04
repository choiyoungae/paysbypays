import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    type Chart as ChartType,
    type ChartEvent,
    type Plugin,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

/** 🔥 범례 hover 시 cursor: pointer 로 바꿔주는 플러그인 */
export const legendCursorPlugin: Plugin = {
    id: "legendCursorPlugin",
    // ⬇️ chart, args 타입을 명시해줌 (암시적 any 방지)
    afterEvent(chart: ChartType, args: { event: ChartEvent }) {
        const { event } = args;
        const legend = chart.legend;
        if (!legend || !event) return;

        // _getLegendItemAt 는 내부 메서드라 any 캐스팅
        const hoveredItem = (legend as any)._getLegendItemAt(event.x, event.y);
        (chart as any).canvas.style.cursor = hoveredItem ? "pointer" : "default";
    },
};

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend,
    ChartDataLabels,
    legendCursorPlugin,
);
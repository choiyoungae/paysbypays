import ComponentCard from "@/components/common/ComponentCard";

type Props = {
    totalSales: number;
    successCount: number;
    failedCount: number;
    cancelledCount: number;
    totalCount: number;
    merchantCount: number;
};

export default function DashboardKpiCards({
    totalSales,
    successCount,
    failedCount,
    cancelledCount,
    totalCount,
    merchantCount,
}: Props) {
    const failedRate =
        totalCount === 0 ? 0 : ((failedCount + cancelledCount) / totalCount) * 100;

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <ComponentCard title="총 결제 금액">
                <p className="text-2xl font-semibold">
                    {totalSales.toLocaleString()}원
                </p>
            </ComponentCard>

            <ComponentCard title="성공 결제 건수">
                <p className="text-2xl font-semibold">{successCount.toLocaleString()}건</p>
            </ComponentCard>

            <ComponentCard title="실패/취소 건수">
                <p className="text-2xl font-semibold">
                    {(failedCount + cancelledCount).toLocaleString()}건
                </p>
                <p className="text-xs text-gray-500">
                    실패율 {failedRate.toFixed(1)}%
                </p>
            </ComponentCard>

            <ComponentCard title="등록 가맹점 수">
                <p className="text-2xl font-semibold">
                    {merchantCount.toLocaleString()}개
                </p>
            </ComponentCard>
        </div>
    );
}

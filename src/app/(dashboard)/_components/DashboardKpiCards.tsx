import Link from "next/link";
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
    const totalAttempts = successCount + failedCount + cancelledCount;

    const failedRate =
        totalAttempts === 0 ? 0 : (failedCount / totalAttempts) * 100;

    const cancelledRate =
        totalAttempts === 0 ? 0 : (cancelledCount / totalAttempts) * 100;

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 items-stretch">
            {/* 1) 총 결제 금액 + 성공 건수 → SUCCESS 리스트 */}
            <Link href="/payments?status=SUCCESS" className="block h-full">
                <ComponentCard title="총 결제 금액" className="h-full">
                    <p className="text-2xl font-semibold">
                        {totalSales.toLocaleString()}원
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                        성공 결제 {successCount.toLocaleString()}건 기준
                    </p>
                </ComponentCard>
            </Link>

            {/* 2) 실패 결제 건수 → FAILED 리스트 */}
            <Link href="/payments?status=FAILED" className="block h-full">
                <ComponentCard title="실패 결제 건수" className="h-full">
                    <p className="text-2xl font-semibold">
                        {failedCount.toLocaleString()}건
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                        실패율 {failedRate.toFixed(1)}%
                    </p>
                </ComponentCard>
            </Link>

            {/* 3) 취소 결제 건수 → CANCELLED 리스트 */}
            <Link href="/payments?status=CANCELLED" className="block h-full">
                <ComponentCard title="취소 결제 건수" className="h-full">
                    <p className="text-2xl font-semibold">
                        {cancelledCount.toLocaleString()}건
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                        취소율 {cancelledRate.toFixed(1)}%
                    </p>
                </ComponentCard>
            </Link>

            {/* 4) 등록 가맹점 수 → 가맹점 목록 페이지(추후 구현) */}
            <Link href="/merchants" className="block h-full">
                <ComponentCard title="등록 가맹점 수" className="h-full">
                    <p className="text-2xl font-semibold">
                        {merchantCount.toLocaleString()}개
                    </p>
                </ComponentCard>
            </Link>
        </div>
    );
}

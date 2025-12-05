import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import type { MerchantDetailRes } from "@/api/types";

type MerchantsListTableProps = {
    data: MerchantDetailRes[];
    onRowClick?: (merchant: MerchantDetailRes) => void;
};

function getStatusBadgeColor(status: string) {
    switch (status) {
        case "ACTIVE":
            return "success";
        case "READY":
            return "warning";
        case "INACTIVE":
            return "light";
        case "CLOSED":
            return "light";
        default:
            return "primary";
    }
}

export default function MerchantsListTable({
    data,
    onRowClick,
}: MerchantsListTableProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[1100px]">
                    <Table className="table-fixed w-full">
                        <TableHeader className="border-b border-gray-100 dark:border-white/5">
                            <TableRow>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                    가맹점코드
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                    가맹점명
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                    상태
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                    업종
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                    사업자번호
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                    등록일시
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                            {data.map((item) => (
                                <TableRow
                                    key={item.mchtCode}
                                    className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
                                    onClick={onRowClick ? () => onRowClick(item) : undefined}
                                >
                                    <TableCell className="px-5 py-4 text-center">
                                        {item.mchtCode}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-center">
                                        {item.mchtName}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-center">
                                        <Badge size="sm" color={getStatusBadgeColor(item.status)}>
                                            {item.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-center">
                                        {item.bizType}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-center">
                                        {item.bizNo}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-center">
                                        {new Date(item.registeredAt).toLocaleString("ko-KR")}
                                    </TableCell>
                                </TableRow>
                            ))}

                            {data.length === 0 && (
                                <TableRow>
                                    <td
                                        colSpan={6}
                                        className="px-5 py-6 text-center text-gray-500"
                                    >
                                        조건에 맞는 가맹점이 없습니다.
                                    </td>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

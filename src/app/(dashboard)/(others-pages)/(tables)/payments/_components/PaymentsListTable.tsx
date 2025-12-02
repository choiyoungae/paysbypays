import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Badge from "@/components/ui/badge/Badge";
import type { PaymentListRes, PaymentStatus } from "@/api/types";

type PaymentsListTableProps = {
  data: PaymentListRes[];
};

export default function PaymentsListTable({ data }: PaymentsListTableProps) {
  function getStatusBadgeColor(status: PaymentStatus) {
    switch (status) {
      case "SUCCESS":
        return "success";
      case "PENDING":
        return "warning";
      case "FAILED":
        return "error";
      case "CANCELLED":
        return "light";
      default:
        return "primary";
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table className="table-fixed w-full">
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/5">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-sm dark:text-gray-400">결제코드</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-sm dark:text-gray-400">가맹점코드</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-sm dark:text-gray-400">금액</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-sm dark:text-gray-400">결제수단</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-sm dark:text-gray-400">상태</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-sm dark:text-gray-400">결제일시</TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
              {data.map((item) => (
                <TableRow key={item.paymentCode}>
                  {/* 결제코드 */}
                  <TableCell className="px-5 py-4 text-center">{item.paymentCode}</TableCell>

                  {/* 가맹점코드 */}
                  <TableCell className="px-5 py-4 text-center">{item.mchtCode}</TableCell>

                  {/* 금액 */}
                  <TableCell className="px-5 py-4 text-right">
                    {Number(item.amount).toLocaleString()}원
                  </TableCell>

                  {/* 결제수단 */}
                  <TableCell className="px-5 py-4 text-center">{item.payType}</TableCell>

                  {/* 상태 */}
                  <TableCell className="px-5 py-4 text-center">
                    <Badge size="sm" color={getStatusBadgeColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>

                  {/* 결제일시 */}
                  <TableCell className="px-5 py-4 text-center">
                    {new Date(item.paymentAt).toLocaleString("ko-KR")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

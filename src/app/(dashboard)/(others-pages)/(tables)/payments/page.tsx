import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { getPayments } from "@/shared/api/payments";
import { Metadata } from "next";
import PaymentsListTable from "@/app/(dashboard)/(others-pages)/(tables)/payments/_components/PaymentsListTable";

export const metadata: Metadata = {
  title: "올페이즈",
  description:
    "거래 내역 리스트",
};

export default async function PaymentsListPage() {
  const { data: payments } = await getPayments();
  return (
    <div>
      <PageBreadcrumb pageTitle="거래 내역 리스트" />
      <div className="space-y-6">
        <PaymentsListTable data={payments}/>
      </div>
    </div>
  );
}

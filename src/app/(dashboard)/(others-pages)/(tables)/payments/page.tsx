import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PaymentsListSection from "./_components/PaymentsListSection";

export default function PaymentsListPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="거래 내역 리스트" />
      <div className="space-y-6">
        <PaymentsListSection />
      </div>
    </div>
  );
}
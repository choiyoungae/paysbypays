import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import MerchantsListSection from "./_components/MerchantsListSection";

export default function PaymentsListPage() {
    return (
        <div>
            <PageBreadcrumb pageTitle="가맹점 리스트" />
            <div className="space-y-6">
                <MerchantsListSection />
            </div>
        </div>
    );
}
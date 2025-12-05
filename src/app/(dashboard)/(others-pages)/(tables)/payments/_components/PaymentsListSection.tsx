"use client";

import { usePayments } from "@/hooks/usePayments";
import PaymentsListTable from "./PaymentsListTable";
import { PaymentListRes, PaymentStatus, PayType, PayTypeLabelMap, StatusLabelMap } from "@/api/types";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { usePaymentStatusCodes, usePaymentTypeCodes } from "@/hooks/useCommonApis";

type StatusFilter = PaymentStatus | "ALL";
type PayTypeFilter = PayType | "ALL";

const STATUS_OPTIONS: StatusFilter[] = [
    "ALL",
    "PENDING",
    "SUCCESS",
    "FAILED",
    "CANCELLED",
];

const PAYTYPE_OPTIONS: PayTypeFilter[] = [
    "ALL",
    "ONLINE",
    "DEVICE",
    "MOBILE",
    "VACT",
    "BILLING",
];

export default function PaymentsListSection() {
    const { data = [], isLoading, isError } = usePayments();
    const { data: statusCodes = [] } = usePaymentStatusCodes();
    const { data: typeCodes = [] } = usePaymentTypeCodes();

    const statusMap = useMemo<StatusLabelMap>(() => {
        const map: StatusLabelMap = {};
        statusCodes.forEach((item) => {
            map[item.code as PaymentStatus] = item.description;
        });
        return map;
    }, [statusCodes]);

    const typeMap = useMemo<PayTypeLabelMap>(() => {
        const map: PayTypeLabelMap = {};
        typeCodes.forEach((item) => {
            map[item.type as PayType] = item.description;
        });
        return map;
    }, [typeCodes]);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const statusFromQuery = searchParams.get("status");
    const initialStatus: StatusFilter = STATUS_OPTIONS.includes(
        statusFromQuery as StatusFilter
    )
        ? (statusFromQuery as StatusFilter)
        : "ALL";

    const payTypeFromQuery = searchParams.get("payType");
    const initialPayType: PayTypeFilter = PAYTYPE_OPTIONS.includes(
        payTypeFromQuery as PayTypeFilter
    )
        ? (payTypeFromQuery as PayTypeFilter)
        : "ALL";

    const [statusFilter, setStatusFilter] = useState<StatusFilter>(initialStatus);
    const [payTypeFilter, setPayTypeFilter] = useState<PayTypeFilter>(initialPayType);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        const q = searchParams.get("status");
        const next: StatusFilter = STATUS_OPTIONS.includes(q as StatusFilter)
            ? (q as StatusFilter)
            : "ALL";
        setStatusFilter(next);
    }, [searchParams]);

    useEffect(() => {
        const q = searchParams.get("payType");
        const next: PayTypeFilter = PAYTYPE_OPTIONS.includes(q as PayTypeFilter)
            ? (q as PayTypeFilter)
            : "ALL";
        setPayTypeFilter(next);
    }, [searchParams]);

    const updateStatusInUrl = (nextStatus: StatusFilter) => {
        const params = new URLSearchParams(searchParams.toString());

        if (nextStatus === "ALL") {
            params.delete("status");
        } else {
            params.set("status", nextStatus);
        }

        params.delete("page");

        const queryString = params.toString();
        const target = queryString ? `${pathname}?${queryString}` : pathname;

        router.push(target, { scroll: false });
    };

    const updatePayTypeInUrl = (nextPayType: PayTypeFilter) => {
        const params = new URLSearchParams(searchParams.toString());

        if (nextPayType === "ALL") {
            params.delete("payType");
        } else {
            params.set("payType", nextPayType);
        }

        params.delete("page"); // 필터 바꾸면 페이지 1로

        const queryString = params.toString();
        const target = queryString ? `${pathname}?${queryString}` : pathname;

        router.push(target, { scroll: false });
    };


    const filtered: PaymentListRes[] = useMemo(() => {
        return data.filter((p) => {
            if (statusFilter !== "ALL" && p.status !== statusFilter) return false;
            if (payTypeFilter !== "ALL" && p.payType !== payTypeFilter) return false;

            if (search.trim()) {
                const keyword = search.toLowerCase();
                const inPayment = p.paymentCode.toLowerCase().includes(keyword);
                const inMcht = p.mchtCode.toLowerCase().includes(keyword);
                if (!inPayment && !inMcht) return false;
            }

            return true;
        });
    }, [data, statusFilter, payTypeFilter, search]);

    useEffect(() => {
        setPage(1);
    }, [statusFilter, payTypeFilter, search]);

    const totalPage = Math.max(1, Math.ceil(filtered.length / pageSize));
    const pagedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
    }, [filtered, page, pageSize]);


    if (isLoading) return <div>로딩 중...</div>;
    if (isError) return <div>결제 내역을 불러오지 못했습니다.</div>;

    return (
        <div className="space-y-4">
            {/* 필터 + 검색 */}
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3 px-4 py-3">
                {/* 상태 필터 */}
                <select
                    className="rounded border px-2 py-1 text-sm dark:border-white/5"
                    value={statusFilter}
                    onChange={(e) => {
                        const next = e.target.value as StatusFilter
                        setStatusFilter(next)
                        updateStatusInUrl(next)
                    }}
                >
                    <option value="ALL">전체 상태</option>
                    <option value="PENDING">{statusMap.PENDING ?? "결제 대기"}</option>
                    <option value="SUCCESS">{statusMap.SUCCESS ?? "결제 완료"}</option>
                    <option value="FAILED">{statusMap.FAILED ?? "결제 실패"}</option>
                    <option value="CANCELLED">{statusMap.CANCELLED ?? "환불 완료"}</option>
                </select>

                {/* 결제수단 필터 */}
                <select
                    className="rounded border px-2 py-1 text-sm dark:border-white/5"
                    value={payTypeFilter}
                    onChange={(e) => {
                        const next = e.target.value as PayTypeFilter
                        setPayTypeFilter(next)
                        updatePayTypeInUrl(next)
                    }}
                >
                    <option value="ALL">전체 수단</option>
                    <option value="ONLINE">{typeMap.ONLINE ?? "온라인"}</option>
                    <option value="DEVICE">{typeMap.DEVICE ?? "단말기"}</option>
                    <option value="MOBILE">{typeMap.MOBILE ?? "모바일"}</option>
                    <option value="VACT">{typeMap.VACT ?? "가상계좌"}</option>
                    <option value="BILLING">{typeMap.BILLING ?? "정기결제"}</option>
                </select>

                <input
                    className="placeholder-theme ml-auto rounded border px-3 py-1 text-sm"
                    placeholder="결제코드 또는 가맹점코드 검색"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <PaymentsListTable
                data={pagedData}
                statusMap={statusMap}
                typeMap={typeMap}
            />

            <div className="flex items-center justify-end gap-2 text-sm">
                <span className="text-gray-500">
                    총 {filtered.length}건 · {page} / {totalPage}페이지
                </span>
                <button
                    className="rounded border px-2 py-1 disabled:opacity-50"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                >
                    이전
                </button>
                <button
                    className="rounded border px-2 py-1 disabled:opacity-50"
                    onClick={() => setPage((p) => (p < totalPage ? p + 1 : p))}
                    disabled={page >= totalPage}
                >
                    다음
                </button>
            </div>
        </div>
    );
}
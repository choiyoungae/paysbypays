"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMerchants } from "@/hooks/useMerchants";
import { useMerchantStatusCodes } from "@/hooks/useCommonApis";
import { MerchantDetailRes, MerchantStatus } from "@/api/types";
import MerchantsListTable from "./MerchantsListTable";

type MerchantStatusFilter = MerchantStatus | "ALL";
type BizTypeFilter = string;

type MerchantStatusLabelMap = Partial<Record<MerchantStatus, string>>;

const MERCHANT_STATUS_OPTIONS: MerchantStatusFilter[] = [
    "ALL",
    "READY",
    "ACTIVE",
    "INACTIVE",
    "CLOSED",
];

export default function MerchantsListSection() {
    const { data = [], isLoading, isError } = useMerchants();
    const { data: statusCodes = [] } = useMerchantStatusCodes();
    const [selectedMerchant, setSelectedMerchant] = useState<MerchantDetailRes | null>(null);

    const merchantStatusMap = useMemo<MerchantStatusLabelMap>(() => {
        const map: MerchantStatusLabelMap = {};
        statusCodes.forEach((item) => {
            map[item.code as MerchantStatus] = item.description;
        });
        return map;
    }, [statusCodes]);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const statusFromQuery = searchParams.get("status");
    const bizTypeFromQuery = searchParams.get("bizType");
    const searchFromQuery = searchParams.get("q") ?? "";

    const initialStatus: MerchantStatusFilter = MERCHANT_STATUS_OPTIONS.includes(
        statusFromQuery as MerchantStatusFilter
    )
        ? (statusFromQuery as MerchantStatusFilter)
        : "ALL";

    const initialBizType: BizTypeFilter = bizTypeFromQuery ?? "ALL";

    const [statusFilter, setStatusFilter] =
        useState<MerchantStatusFilter>(initialStatus);
    const [bizTypeFilter, setBizTypeFilter] =
        useState<BizTypeFilter>(initialBizType);
    const [search, setSearch] = useState(searchFromQuery);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const bizTypes = useMemo(() => {
        const set = new Set<string>();
        data.forEach((m) => {
            if (m.bizType) set.add(m.bizType);
        });
        return ["ALL", ...Array.from(set)];
    }, [data]);

    useEffect(() => {
        const qStatus = searchParams.get("status");
        const nextStatus: MerchantStatusFilter =
            MERCHANT_STATUS_OPTIONS.includes(qStatus as MerchantStatusFilter)
                ? (qStatus as MerchantStatusFilter)
                : "ALL";
        setStatusFilter(nextStatus);

        const qBizType = searchParams.get("bizType") ?? "ALL";
        setBizTypeFilter(qBizType);

        const qSearch = searchParams.get("q") ?? "";
        setSearch(qSearch);
    }, [searchParams]);

    const updateUrl = (
        nextStatus: MerchantStatusFilter,
        nextBizType: BizTypeFilter,
        nextSearch: string
    ) => {
        const params = new URLSearchParams(searchParams.toString());

        if (nextStatus === "ALL") params.delete("status");
        else params.set("status", nextStatus);

        if (nextBizType === "ALL") params.delete("bizType");
        else params.set("bizType", nextBizType);

        if (nextSearch.trim()) params.set("q", nextSearch.trim());
        else params.delete("q");

        params.delete("page");

        const queryString = params.toString();
        const target = queryString ? `${pathname}?${queryString}` : pathname;

        router.push(target, { scroll: false });
    };

    const filtered: MerchantDetailRes[] = useMemo(() => {
        return data.filter((m) => {
            if (statusFilter !== "ALL" && m.status !== statusFilter) return false;
            if (bizTypeFilter !== "ALL" && m.bizType !== bizTypeFilter) return false;

            if (search.trim()) {
                const keyword = search.toLowerCase();
                const inCode = m.mchtCode.toLowerCase().includes(keyword);
                const inName = m.mchtName.toLowerCase().includes(keyword);
                if (!inCode && !inName) return false;
            }

            return true;
        });
    }, [data, statusFilter, bizTypeFilter, search]);

    useEffect(() => {
        setPage(1);
    }, [statusFilter, bizTypeFilter, search]);

    const totalPage = Math.max(1, Math.ceil(filtered.length / pageSize));

    const pagedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
    }, [filtered, page, pageSize]);

    if (isLoading) return <div>가맹점 정보를 불러오는 중...</div>;
    if (isError) return <div>가맹점 정보를 불러오지 못했습니다.</div>;

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-white/5 dark:bg-white/3">
                <select
                    className="rounded border px-2 py-1 text-sm dark:border-white/5"
                    value={statusFilter}
                    onChange={(e) => {
                        const next = e.target.value as MerchantStatusFilter;
                        setStatusFilter(next);
                        updateUrl(next, bizTypeFilter, search);
                    }}
                >
                    <option value="ALL">전체 상태</option>
                    <option value="READY">
                        {merchantStatusMap.READY ?? "대기"}
                    </option>
                    <option value="ACTIVE">
                        {merchantStatusMap.ACTIVE ?? "활성"}
                    </option>
                    <option value="INACTIVE">
                        {merchantStatusMap.INACTIVE ?? "중지"}
                    </option>
                    <option value="CLOSED">
                        {merchantStatusMap.CLOSED ?? "폐기"}
                    </option>
                </select>

                <select
                    className="rounded border px-2 py-1 text-sm dark:border-white/5"
                    value={bizTypeFilter}
                    onChange={(e) => {
                        const next = e.target.value as BizTypeFilter;
                        setBizTypeFilter(next);
                        updateUrl(statusFilter, next, search);
                    }}
                >
                    <option value="ALL">전체 업종</option>
                    {bizTypes
                        .filter((t) => t !== "ALL")
                        .map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                </select>

                <input
                    className="placeholder-theme ml-auto rounded border px-3 py-1 text-sm"
                    placeholder="가맹점 코드 또는 이름 검색"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onBlur={() => updateUrl(statusFilter, bizTypeFilter, search)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            updateUrl(statusFilter, bizTypeFilter, search);
                        }
                    }}
                />
            </div>

            <MerchantsListTable 
                data={pagedData} 
                onRowClick={(merchant) => setSelectedMerchant(merchant)} 
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
            {selectedMerchant && (
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/40"
                    onClick={() => setSelectedMerchant(null)}
                >
                    <div
                        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">
                                {selectedMerchant.mchtName}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {selectedMerchant.mchtCode}
                            </p>
                        </div>

                        <div className="space-y-2 text-sm">
                            <p>
                                <span className="font-medium">주소: </span>
                                {selectedMerchant.address}
                            </p>
                            <p>
                                <span className="font-medium">전화번호: </span>
                                {selectedMerchant.phone}
                            </p>
                            <p>
                                <span className="font-medium">이메일: </span>
                                {selectedMerchant.email}
                            </p>
                            <p>
                                <span className="font-medium">등록일: </span>
                                {selectedMerchant.registeredAt?.slice(0, 10)}
                            </p>
                            <p>
                                <span className="font-medium">업데이트일: </span>
                                {selectedMerchant.updatedAt?.slice(0, 10)}
                            </p>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                className="rounded border px-3 py-1 text-sm"
                                onClick={() => setSelectedMerchant(null)}
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

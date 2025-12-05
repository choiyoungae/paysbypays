export type PayType = "ONLINE" | "DEVICE" | "MOBILE" | "VACT" | "BILLING";
export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";

export interface PaymentListRes {
    paymentCode: string;
    mchtCode: string;
    amount: string;
    currency: string;
    payType: PayType;
    status: PaymentStatus;
    paymentAt: string;
}

export interface ApiResponseListPaymentListRes {
    status: number;
    message: string;
    data: PaymentListRes[];
}

export interface MerchantListRes {
    mchtCode: string;
    mchtName: string;
    status: string;
    bizType: string;
}

export interface ApiResponseListMerchantListRes {
    status: number;
    message: string;
    data: MerchantListRes[];
}

export interface MerchantDetailRes {
    mchtCode: string;
    mchtName: string;
    status: string;
    bizType: string;
    bizNo: string;
    address: string;
    phone: string;
    email: string;
    registeredAt: string;
    updatedAt: string;
}

export interface ApiResponseMerchantDetailRes {
    status: number;
    message: string;
    data: MerchantDetailRes;
}

export interface ApiResponseListMerchantDetailRes {
    status: number;
    message: string;
    data: MerchantDetailRes[];
}

export interface StatusRes {
    code: string;
    description: string;
}

export interface ApiResponseListStatusRes {
    status: number;
    message: string;
    data: StatusRes[];
}

export interface PayTypeRes {
    type: string;
    description: string;
}

export interface ApiResponseListPayTypeRes {
    status: number;
    message: string;
    data: PayTypeRes[];
}

// 상태 코드 → 라벨(설명)
export type StatusLabelMap = Partial<Record<PaymentStatus, string>>;

// 결제수단 코드 → 라벨(설명)
export type PayTypeLabelMap = Partial<Record<PayType, string>>;

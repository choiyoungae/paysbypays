type PayType = "ONLINE" | "DEVICE" | "MOBILE" | "VACT" | "BILLING";
type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";

export interface PaymentListRes {
    paymentCode: string;
    mchtCode: string;
    amount: string;
    currency: string;
    payType: PayType;
    status: PaymentStatus;
    paymentAt: string;
}

interface ApiResponseListPaymentListRes {
    status: number;
    message: string;
    data: PaymentListRes[];
}

interface MerchantListRes {
    mchtCode: string;
    mchtName: string;
    status: string;
    bizType: string;
}

interface ApiResponseListMerchantListRes {
    status: number;
    message: string;
    data: MerchantListRes[];
}

interface MerchantDetailRes {
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

interface ApiResponseMerchantDetailRes {
    status: number;
    message: string;
    data: MerchantDetailRes;
}

interface ApiResponseListMerchantDetailRes {
    status: number;
    message: string;
    data: MerchantDetailRes[];
}

interface StatusRes {
    code: string;
    description: string;
}

interface ApiResponseListStatusRes {
    status: number;
    message: string;
    data: StatusRes[];
}

interface PayTypeRes {
    type: string;
    description: string;
}

interface ApiResponseListPayTypeRes {
    status: number;
    message: string;
    data: PayTypeRes[];
}
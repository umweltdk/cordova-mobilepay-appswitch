import { IonicNativePlugin } from '@ionic-native/core';
export interface PaymentResult {
    success: boolean;
    cancelled: boolean;
    orderId: string;
}
export declare type PaymentSuccess = PaymentResult & {
    transactionId: String;
    signature: String;
    productPrice: Number;
    amountWithdrawnFromCard: Number;
};
export declare type PaymentCancelled = PaymentResult;
export declare type PaymentError = PaymentResult & {
    errorCode: number;
    errorMessage: string;
};
export declare class MobilePayAppSwitch extends IonicNativePlugin {
    isAppSwitchInProgress: boolean;
    isMobilePayInstalled(): Promise<boolean>;
    setupWithMerchantId(merchantId: string, merchantUrlScheme: string): Promise<void>;
    beginMobilePaymentWithPayment(orderId: string, productPrice: number): Promise<PaymentSuccess | PaymentCancelled | PaymentError>;
}

declare namespace VOO.Mobile.App.Models {
    class PaymentBalance implements VOO.Domain.Views.Billing.PaymentBalance {
        hasMobileAccountBalance: boolean;
        isAvailable: boolean;
        isOneBill: boolean;
        totalBalance: number;
        totalMobile: number;
        totalPack: number;
        totalTelevision: number;
        unPaidInvoices: number;
        unPaidMobileInvoices: number;
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];

    }
}
declare namespace Lowco.Models {
    class PaymentBalance implements Lowco.Domain.Views.Billing.PaymentBalance {
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
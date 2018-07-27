declare namespace VOO.Mobile.App.Models {

    class Invoice implements VOO.Domain.Views.Billing.Invoice {
        amount: number;
        documentReference: string;
        documentType: Domain.Views.Billing.BillingDocumentType;
        id: string;
        invoiceDate: Date;
        paymentDueDate: Date;
        paymentStatus: Domain.Views.Billing.PaymentStatusType;
        periodEndDate: Date;
        periodStartDate: Date;
        product: Domain.Views.Billing.ProductType;
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];
    }
    class InvoiceAddress implements VOO.Domain.Views.Billing.InvoiceAddress {
        boxNumber: string;
        building: string;
        city: string;
        country: string;
        houseNumber: string;
        houseNumber2: string;
        isValid: boolean;
        originaStringAddress: string;
        originaStringAddressWithoutSeparators: string;
        poBox: string;
        postCode: string;
        street: string;
        street2: string;
        street3: string;
    }
    class InvoiceCollection implements VOO.Domain.Views.Billing.InvoiceCollection {
        items: Domain.Views.Billing.Invoice[];
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];
    }
}
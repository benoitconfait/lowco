declare namespace Lowco.Models {
    class Contractor implements Lowco.Domain.Views.Product.Mobile.Contractor {
        firstName: string;
        gender: Domain.Views.Product.Mobile.Contractor.GenderType;
        lastname: string;
        msisdn: string;
    }

    class MobileCardHolder implements Lowco.Domain.Views.Product.Mobile.MobileCardHolder {
        firstname: string;
        lastname: string;

    }

    class HardwareInfo implements Lowco.Domain.Views.Product.Mobile.HardwareInfo {
        durationInMonth: number;
        id: number;
        monthlyPrice: number;
        name: string;
        ongoing: boolean;
        paidMonths: number;
        remainingMonth: number;
        totalPrice: number;
        unpaidMonths: number;
        upfrontFee: number;
        validFrom: Date;
        validTill: Date;
    }

    class CreditLimit implements Lowco.Domain.Views.Product.Mobile.CreditLimit {
        amount: number;
        definedByCustomer: boolean;
    }

    class MobileOfferPromotion implements Lowco.Domain.Views.Product.Mobile.MobileOfferPromotion {
        amount: number;
        endDate: Date;
        id: number;
    }

    class MobilePricedProduct implements Lowco.Domain.Views.Product.Mobile.MobilePricedProduct {
        category: Domain.Core.Views.Catalog.ProductCategory;
        id: string;
        monthlyPrice: number;
        type: Domain.Views.Product.ServiceType;
    }

    class MobileOffer implements Lowco.Domain.Views.Product.Mobile.MobileOffer {
        dataOnly: boolean;
        hardware: Lowco.Models.HardwareInfo;
        id: string;
        limit: Lowco.Models.CreditLimit;
        name: string;
        price: number;
        promotion: Lowco.Models.MobileOfferPromotion;
        services: Lowco.Models.MobilePricedProduct[];

    }

    class SimCard implements Lowco.Domain.Views.Product.Mobile.SimCard {
        iccid: string;
        indicator: Lowco.Domain.Views.Product.Mobile.SimCardIndicator;
        name: string;
        puk: string;
        status: Lowco.Domain.Views.Product.Mobile.SimCardStatus;

    }

    class BoostDataUsage implements Lowco.Domain.Views.Product.Mobile.BoostDataUsage {
        data: Domain.Views.Product.Mobile.UsageInfo;
    }

    class EuropeUsage implements Lowco.Domain.Views.Product.Mobile.EuropeUsage {
        sms: Domain.Views.Product.Mobile.UsageInfo;
        voice: Domain.Views.Product.Mobile.UsageInfo;
    }

    class MainUsage implements Lowco.Domain.Views.Product.Mobile.MainUsage {
        data: Domain.Views.Product.Mobile.UsageInfo;
        sms: Domain.Views.Product.Mobile.UsageInfo;
        voice: Domain.Views.Product.Mobile.UsageInfo;
        voice2VooMobile: Domain.Views.Product.Mobile.UsageInfo;
    }

    class NiceDeviceUsage implements Lowco.Domain.Views.Product.Mobile.NiceDeviceUsage {
        data: Domain.Views.Product.Mobile.UsageInfo;
    }

    class RoamingUsage implements Lowco.Domain.Views.Product.Mobile.RoamingUsage {
        money: Domain.Views.Product.Mobile.UsageInfo;
    }

    class MobileUsage implements Lowco.Domain.Views.Product.Mobile.MobileUsage {
        boostData: Lowco.Models.BoostDataUsage;
        europe: Lowco.Models.EuropeUsage;
        main: Lowco.Models.MainUsage;
        niceDevice: Lowco.Models.NiceDeviceUsage;
        roaming: Lowco.Models.RoamingUsage;

    }

    class MobileSubscription implements Lowco.Domain.Views.Product.Mobile.MobileSubscription {
        balance: number;
        holder: Lowco.Models.MobileCardHolder;
        id: string;
        msisdn: number;
        offer: Lowco.Models.MobileOffer;
        simCard: Lowco.Models.SimCard;
        usage: Lowco.Models.MobileUsage;
        validTill: Date;
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];
    }

    class MobileInformation implements Lowco.Domain.Views.Product.Mobile.MobileInformation {
        contractor: Lowco.Models.Contractor;
        subscriptions: Lowco.Models.MobileSubscription[];
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];
    }
}
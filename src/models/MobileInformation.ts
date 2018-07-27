declare namespace VOO.Mobile.App.Models {
    class Contractor implements VOO.Domain.Views.Product.Mobile.Contractor {
        firstName: string;
        gender: Domain.Views.Product.Mobile.Contractor.GenderType;
        lastname: string;
        msisdn: string;
    }

    class MobileCardHolder implements VOO.Domain.Views.Product.Mobile.MobileCardHolder {
        firstname: string;
        lastname: string;

    }

    class HardwareInfo implements VOO.Domain.Views.Product.Mobile.HardwareInfo {
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

    class CreditLimit implements VOO.Domain.Views.Product.Mobile.CreditLimit {
        amount: number;
        definedByCustomer: boolean;
    }

    class MobileOfferPromotion implements VOO.Domain.Views.Product.Mobile.MobileOfferPromotion {
        amount: number;
        endDate: Date;
        id: number;
    }

    class MobilePricedProduct implements VOO.Domain.Views.Product.Mobile.MobilePricedProduct {
        category: Domain.Core.Views.Catalog.ProductCategory;
        id: string;
        monthlyPrice: number;
        type: Domain.Views.Product.ServiceType;
    }

    class MobileOffer implements VOO.Domain.Views.Product.Mobile.MobileOffer {
        dataOnly: boolean;
        hardware: VOO.Mobile.App.Models.HardwareInfo;
        id: string;
        limit: VOO.Mobile.App.Models.CreditLimit;
        name: string;
        price: number;
        promotion: VOO.Mobile.App.Models.MobileOfferPromotion;
        services: VOO.Mobile.App.Models.MobilePricedProduct[];

    }

    class SimCard implements VOO.Domain.Views.Product.Mobile.SimCard {
        iccid: string;
        indicator: VOO.Domain.Views.Product.Mobile.SimCardIndicator;
        name: string;
        puk: string;
        status: VOO.Domain.Views.Product.Mobile.SimCardStatus;

    }

    class BoostDataUsage implements VOO.Domain.Views.Product.Mobile.BoostDataUsage {
        data: Domain.Views.Product.Mobile.UsageInfo;
    }

    class EuropeUsage implements VOO.Domain.Views.Product.Mobile.EuropeUsage {
        sms: Domain.Views.Product.Mobile.UsageInfo;
        voice: Domain.Views.Product.Mobile.UsageInfo;
    }

    class MainUsage implements VOO.Domain.Views.Product.Mobile.MainUsage {
        data: Domain.Views.Product.Mobile.UsageInfo;
        sms: Domain.Views.Product.Mobile.UsageInfo;
        voice: Domain.Views.Product.Mobile.UsageInfo;
        voice2VooMobile: Domain.Views.Product.Mobile.UsageInfo;
    }

    class NiceDeviceUsage implements VOO.Domain.Views.Product.Mobile.NiceDeviceUsage {
        data: Domain.Views.Product.Mobile.UsageInfo;
    }

    class RoamingUsage implements VOO.Domain.Views.Product.Mobile.RoamingUsage {
        money: Domain.Views.Product.Mobile.UsageInfo;
    }

    class MobileUsage implements VOO.Domain.Views.Product.Mobile.MobileUsage {
        boostData: VOO.Mobile.App.Models.BoostDataUsage;
        europe: VOO.Mobile.App.Models.EuropeUsage;
        main: VOO.Mobile.App.Models.MainUsage;
        niceDevice: VOO.Mobile.App.Models.NiceDeviceUsage;
        roaming: VOO.Mobile.App.Models.RoamingUsage;

    }

    class MobileSubscription implements VOO.Domain.Views.Product.Mobile.MobileSubscription {
        balance: number;
        holder: VOO.Mobile.App.Models.MobileCardHolder;
        id: string;
        msisdn: number;
        offer: VOO.Mobile.App.Models.MobileOffer;
        simCard: VOO.Mobile.App.Models.SimCard;
        usage: VOO.Mobile.App.Models.MobileUsage;
        validTill: Date;
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];
    }

    class MobileInformation implements VOO.Domain.Views.Product.Mobile.MobileInformation {
        contractor: VOO.Mobile.App.Models.Contractor;
        subscriptions: VOO.Mobile.App.Models.MobileSubscription[];
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];
    }
}
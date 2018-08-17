declare namespace Lowco.Models {
    class PhoneCallRecord {
        callDeviceType: string;
        callLocalisation: string;
        crCallBegin: Date;
        crDest: string;
        crDuration: number;
        crPriceTVAC: number;
        isIncluded: boolean;
    }

    class PerDayUsage {
        date: string;
        totalTVAC: number;
        items: PhoneCallRecord[];
    }

    class PhoneDailyUsage implements Lowco.Domain.Views.Usage.Phone.PhoneDailyUsage {
        callDeviceType: Domain.Views.Usage.Phone.PhoneDailyUsage.DeviceType;
        callLocalisation: Domain.Views.Usage.Phone.PhoneDailyUsage.Localisation;
        crCallBegin: Date;
        crDest: string;
        crDuration: number;
        crDurationS: string;
        crPeakOffpeak: string;
        crPrice: number;
        crPriceTVAC: number;
        isIncluded: boolean;
        iso3166a3: string;
        rdDescription: string;
        rdId: number;
        rgCode: string;
        rgDesc: string;
        rpCode: string;
        tbcCode: string;
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];
    }

    class PhoneDailyUsageCollection implements Lowco.Domain.Views.Usage.Phone.PhoneDailyUsageCollection {
        items: Domain.Views.Usage.Phone.PhoneDailyUsage[];
        options: Domain.Core.Views.Catalog.Config.OptionConfig[];
        outOfBundlePrice: number;
        outOfBundlePriceTVAC: number;
        totalVoiceCommunication: number;
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];
    }
}
declare namespace VOO.Mobile.App.Models {
    class NetDailyUsage implements VOO.Domain.Views.Usage.Net.NetDailyUsage {
        day: number;
        month: number;
        usageDay: Date;
        year: number;
        downloadVolumeAsBytes: number;
        totalVolumeAsBytes: number;
        totalVolumeAsUnit: number;
        uploadVolumeAsBytes: number;
        usageUnit: Domain.Views.Usage.Net.NetUsageUnit.UnitType;
        volumeMultiplicator: number;
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];        
    }

    class NetMonthlyUsage implements VOO.Domain.Views.Usage.Net.NetMonthlyUsage {
        connectionId: string;
        dailyUsages: VOO.Mobile.App.Models.NetDailyUsage[];
        dailyUsageUnit: Domain.Views.Usage.Net.NetUsageUnit.UnitType;
        overPriceDownloadAsEuro: number;
        overPriceUploadAsEuro: number;
        overQuotaDownloadAsBytes: number;
        overQuotaUploadAsBytes: number;
        period: Date;
        periodStartDate: string;
        quotaAsBytes: number;
        totalOverPriceAsEuro: number;
        totalOverQuotaAsBytes: number;
        downloadVolumeAsBytes: number;
        totalVolumeAsBytes: number;
        totalVolumeAsUnit: number;
        uploadVolumeAsBytes: number;
        usageUnit: Domain.Views.Usage.Net.NetUsageUnit.UnitType;
        volumeMultiplicator: number;
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];
    }

    class NetMonthlyUsageCollection implements VOO.Domain.Views.Usage.Net.NetMonthlyUsageCollection {
        items: VOO.Mobile.App.Models.NetMonthlyUsage[];
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];
    }
}
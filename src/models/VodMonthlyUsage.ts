declare namespace Lowco.Models {
    class VodDailyUsage implements Lowco.Domain.Views.Usage.Vod.VodDailyUsage {
        creationDateTime: Date;
        name: string;
        priceCurrency: string;
        priceHT: number;
        priceTTC: number;
        productType: string;
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];
 
    }

    class VodMonthlyUsage implements Lowco.Domain.Views.Usage.Vod.VodMonthlyUsage {
        connectionId: string;
        count: number;
        dailyUsages: Domain.Views.Usage.Vod.VodDailyUsage[];
        period: Date;
        periodStartDate: string;
        totalExvat: number;
        totalInvat: number;
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];

    }

    class VodMonthlyUsageCollection implements Lowco.Domain.Views.Usage.Vod.VodMonthlyUsageCollection {
        items: Domain.Views.Usage.Vod.VodMonthlyUsage[];
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];

    }
}
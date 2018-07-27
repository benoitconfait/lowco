declare namespace VOO.Mobile.App.Models {
    class CallDetailRecord implements VOO.Domain.Views.Usage.Mobile.CallDetailRecord {
        cost: number;
        national: boolean;
        offPlan: boolean;
        phoneNumber: string;
        time: Date;
        type: Domain.Views.Usage.Mobile.MobileDailyUsageType;
        unit: Domain.Views.Usage.Mobile.UsageUnit;
        usage: number;
    }

    class CallDetailRecordsHistory implements VOO.Domain.Views.Usage.Mobile.CallDetailRecordsHistory {
        items: Domain.Views.Usage.Mobile.MobileDailyUsage[];
        summary: Domain.Views.Usage.Mobile.UsageSummary;
        totalCount: number;
    }

    class MobileDailyUsage implements VOO.Domain.Views.Usage.Mobile.MobileDailyUsage {
        cost: number;
        date: Date;
        records: Domain.Views.Usage.Mobile.CallDetailRecord[];
    }
}
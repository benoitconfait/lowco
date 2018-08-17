declare namespace Lowco.Models {
    class Phone implements Lowco.Domain.Views.Phone.Phone {
        acbisNumber: string;
        displayId: string;
        displayName: string;
        eqNo: number;
        esId: string;
        flagPortability: boolean;
        flagRestricted: boolean;
        flagSuspended: boolean;
        flagVInstall: boolean;
        periodEnd: string;
        periodStart: string;
        serviceId: string;
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];
    }

    class PhonesCollection implements Lowco.Domain.Views.Phone.PhoneCollection {
        items: Domain.Views.Phone.Phone[];
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];
    }
}
declare namespace Lowco.Models {
    class TvParameters implements Lowco.Domain.Views.TvParameters.TvParameters {
        parentalControlMinAgeRating: string;
        parentalControlPinCode: string;
        vodPurchaseCode: string;
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];
    }
}
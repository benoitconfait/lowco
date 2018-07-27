declare namespace VOO.Mobile.App.Models {
    class TvParameters implements VOO.Domain.Views.TvParameters.TvParameters {
        parentalControlMinAgeRating: string;
        parentalControlPinCode: string;
        vodPurchaseCode: string;
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];
    }
}
declare namespace VOO.Mobile.App.Models {
    class OptionViewCollectionResource implements VOO.Domain.Views.Product.OptionViewCollectionResource {
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];
        activationStatuses: Domain.Views.Product.Activation.ActivationStatusView[];
        options: Domain.Views.Product.OptionViewResource[];
    }

    class OptionViewResource implements VOO.Domain.Views.Product.OptionViewResource {
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];
        activation: Domain.Views.Product.Activation.Activatability;
        category: Domain.Core.Views.Catalog.ProductCategory;
        creditLimit: number;
        discount: number;
        externalId: string;
        isIncludedInPack: boolean;
        key: string;
        onMostExpensive: Domain.Core.Views.Catalog.DiscountInfo.OrderableDiscount;
        phoneNumber: string;
        pointOfDeliveryId: string;
        price: number;
        priceWithoutDiscount: number;
        promos: Domain.Views.Product.OptionPromo[];
        sap14: string;
        simulated: boolean;
        simulationLocked: boolean;
        status: Domain.Views.Product.OptionStatus;
    }

    class OrderOptionsViewCollectionResource implements VOO.Domain.Views.Product.OrderOptionsViewCollectionResource {
        basket: Domain.Views.Product.OptionViewResource[];
        activationStatuses: Domain.Views.Product.Activation.ActivationStatusView[];
        options: Domain.Views.Product.OptionViewResource[];
        relations: System.Collections.Generic.KeyValuePair<string, Domain.Core.Hal.Link>[];
    }
}
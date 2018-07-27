
import DeviceType = VOO.Domain.Views.Usage.Phone.PhoneDailyUsage.DeviceType;
import Localisation = VOO.Domain.Views.Usage.Phone.PhoneDailyUsage.Localisation;

export const callDeviceTypeToString = (type: DeviceType) => {
    switch (type) {
        case DeviceType.Unspecified:
            return 'UNSPECIFIED';
        case DeviceType.Fixe:
            return 'FIXE';
        case DeviceType.Mobile:
            return 'MOBILE';
    }
    return '';
}

export const callLocalisationToString = (localisation: Localisation) => {
    switch (localisation) {
        case Localisation.Unspecified:
            return 'UNSPECIFIED';
        case Localisation.International:
            return 'INTERNATIONAL_SHORT';
        case Localisation.National:
            return 'NATIONAL_SHORT';
    }
    return '';
}
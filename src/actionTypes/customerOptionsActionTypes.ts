export enum CustomerOptionsActionTypes {
    FETCH_CUSTOMER_OPTIONS = 'FETCH_CUSTOMER_OPTIONS',
    FETCH_CUSTOMER_OPTIONS_FULFILLED = 'FETCH_CUSTOMER_OPTIONS_FULFILLED',
    FETCH_CUSTOMER_OPTIONS_ERROR = 'FETCH_CUSTOMER_OPTIONS_ERROR',
    FETCH_CUSTOMER_OPTIONS_CANCELLED = 'FETCH_CUSTOMER_OPTIONS_CANCELLED',
    ACTIVATE_CUSTOMER_OPTIONS = 'ACTIVATE_CUSTOMER_OPTIONS',
    ACTIVATE_CUSTOMER_OPTIONS_FULFILLED = 'ACTIVATE_CUSTOMER_OPTIONS_FULFILLED',
    ACTIVATE_CUSTOMER_OPTIONS_ERROR = 'ACTIVATE_CUSTOMER_OPTIONS_ERROR',
    ACTIVATE_CUSTOMER_OPTIONS_CANCELLED = 'ACTIVATE_CUSTOMER_OPTIONS_CANCELLED',
}

export enum OptionActivationOrigins {
    MobileFreeOptionsConfiguration = 'MobileFreeOptionsConfigurationScreen',
    MobileParametersOptionsConfiguration = 'MobileParametersOptionsConfigurationScreen',
    MobilePaidOptionsConfiguration = 'MobilePaidOptionsConfigurationScreen',
    NetFreeOptionsConfiguration = 'NetFreeOptionsConfigurationScreen',
    NetPaidOptionsConfiguration = 'NetPaidOptionsConfigurationScreen',
    TelPaidOptionsConfiguration = 'TelOptionsConfigurationScreen',
    TelParametersConfiguration = 'TelParametersConfigurationScreen',
    TvFreeOptionsConfiguration = 'TvFreeOptionsConfigurationScreen',
    TvPaidOptionsConfiguration = 'TvPaidOptionsConfigurationScreen',
    TvParametersConfiguration = 'TvParametersConfigurationScreen',
}

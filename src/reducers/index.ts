import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import { AsyncStorage, AppState } from 'react-native';
import { default as ConnectionInfoReducer, State as ConnectionInfoState } from './ConnectionInfoReducer';
import { default as CustomerReducer, State as CustomerState } from './CustomerReducer';
import { default as CustomerOptionsReducer, State as CustomerOptionsState } from './CustomerOptionsReducer';
import { default as AddressesReducer, State as AddressesState } from './AddressesReducer';
import { default as InternetUsageReducer, State as InternetUsageState } from './InternetUsageReducer';
import { default as InternetYearlyUsageReducer, State as InternetYearlyUsageState } from './InternetYearlyUsageReducer';
import { default as PhonesReducer, State as PhonesState } from './PhonesReducer';
import { default as PhoneUsageReducer, State as PhoneUsageState } from './PhoneUsageReducer';
import { default as VodUsageReducer, State as VodUsageState } from './VodUsageReducer';
import { default as MobileSubscriptionsReducer, State as MobileSubscriptionsState } from './MobileSubscriptionsReducer';
import { default as MobileCDRReducer, State as MobileCDRState } from './MobileCDRReducer';
import { default as PaymentBalanceReducer, State as PaymentBalanceState } from './PaymentBalanceReducer';
import { default as InvoicesReducer, State as InvoicesState } from './InvoicesReducer';
import { default as LastSuccessfulApiCallsTimeReducer, State as LastSuccessfulApiCallsTimeState } from './LastSuccessfulApiCallsTimeReducer';
import { default as AuthReducer, State as AuthState } from './AuthReducer';
import { default as AppStateReducer, State as AppRunningState } from './AppStateReducer';
import { default as TabNavigationReducer, State as TabNavigationState } from './TabNavigationReducer';
import { default as TvOptionsReducer, State as TvOptionsState } from './TvOptionsReducer';

export interface RootState {
    connectionInfo: ConnectionInfoState,
    customer: CustomerState,
    customerOptions: CustomerOptionsState,
    addresses: AddressesState,
    internetUsage: InternetUsageState,
    internetYearlyUsage: InternetYearlyUsageState,
    phones: PhonesState,
    phoneUsage: PhoneUsageState,
    vodUsage: VodUsageState,
    mobileSubscriptions: MobileSubscriptionsState,
    mobileCDR: MobileCDRState,
    paymentBalance: PaymentBalanceState,
    invoices: InvoicesState,
    lastSuccessfulApiCallsTime: LastSuccessfulApiCallsTimeState,
    auth: AuthState,
    tabNavigation: TabNavigationState,
    appState: AppRunningState,
    tvOptions: TvOptionsState
}

const sensitiveStorage = createSensitiveStorage({
    keychainService: 'myVooKeychain',
    sharedPreferencesName: 'myVooSharedPrefs'
});

const defaultPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: [],
    stateReconciler: autoMergeLevel2
};

const buildPersistConfig = (key: string) => {
    return {
        ...defaultPersistConfig,
        key: key
    };
};

const buildSecuredPersistConfig = (key: string) => {
    return {
        ...defaultPersistConfig,
        key: key,
        storage: sensitiveStorage
    };
};

export const reducers = combineReducers({
    connectionInfo: ConnectionInfoReducer,
    vodUsage: persistReducer(buildPersistConfig('vodUsage'), VodUsageReducer),
    customer: persistReducer(buildPersistConfig('customer'), CustomerReducer),
    customerOptions: persistReducer(buildPersistConfig('customerOptions'), CustomerOptionsReducer),
    addresses: persistReducer(buildPersistConfig('addresses'), AddressesReducer),
    internetUsage: persistReducer(buildPersistConfig('internetUsage'), InternetUsageReducer),
    internetYearlyUsage: persistReducer(buildPersistConfig('internetUsage'), InternetYearlyUsageReducer),
    phones: persistReducer(buildPersistConfig('phones'), PhonesReducer),
    phoneUsage: persistReducer(buildPersistConfig('phoneUsage'), PhoneUsageReducer),
    mobileSubscriptions: persistReducer(buildPersistConfig('mobileSubscriptions'), MobileSubscriptionsReducer),
    mobileCDR: persistReducer(buildPersistConfig('mobileCDR'), MobileCDRReducer),
    paymentBalance: persistReducer(buildPersistConfig('paymentBalance'), PaymentBalanceReducer),
    invoices: persistReducer(buildPersistConfig('invoices'), InvoicesReducer),
    lastSuccessfulApiCallsTime: LastSuccessfulApiCallsTimeReducer,
    auth: persistReducer(buildSecuredPersistConfig('auth'), AuthReducer),
    tabNavigation: TabNavigationReducer,
    appState: persistReducer(buildPersistConfig('appState'), AppStateReducer),
    tvOptions: persistReducer(buildPersistConfig('tvOptions'), TvOptionsReducer)

});

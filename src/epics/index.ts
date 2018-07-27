import { combineEpics } from 'redux-observable';
import { fetchInternetUsageEpic, fetchInternetYearlyUsageEpic } from './InternetUsageEpics';
import { fetchPhoneUsageEpic, fetchPhonesEpic } from './PhoneUsageEpics';
import { fetchVodUsageEpic } from './VodUsageEpics';
import { fetchMobileSubscriptionsEpic } from './MobileSubscriptionsEpics';
import { fetchMobileCDREpic } from './MobileCDREpics';
import { fetchPaymentBalanceEpic } from './PaymentBalanceEpics';
import { fetchInvoicesEpic, downloadInvoiceEpic } from './InvoicesEpics';
import { fetchCustomerEpic } from './CustomerEpics';
import { fetchCustomerOptionsEpic, activateCustomerOptionsEpic } from './CustomerOptionsEpics';
import { fetchAccessTokenEpic, refreshTokenEpic } from './AuthEpics';
import { setConnectionInfo } from './ConnectionInfoEpics';
import { fetchTvOptionsEpic, activateTvOptionsEpic } from './TvOptionsEpics';

export const rootEpic = combineEpics(
  fetchInternetUsageEpic,
  fetchInternetYearlyUsageEpic,
  fetchPhonesEpic,
  fetchPhoneUsageEpic,
  fetchVodUsageEpic,
  fetchMobileSubscriptionsEpic,
  fetchMobileCDREpic,
  fetchPaymentBalanceEpic,
  fetchInvoicesEpic,
  downloadInvoiceEpic,
  fetchCustomerEpic,
  fetchCustomerOptionsEpic,
  activateCustomerOptionsEpic,
  fetchAccessTokenEpic,
  refreshTokenEpic,
  setConnectionInfo,
  fetchTvOptionsEpic,
  activateTvOptionsEpic
);

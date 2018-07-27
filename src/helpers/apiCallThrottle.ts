const deltaMinutes = (date1: Date, date2: Date): number => {
    if (date1 && date2) {
        return (+date1 - +date2) / 60000;
    }
    return 0;
};

export const getKeyForParams = (params) => params && Object.keys(params).length > 0 ? JSON.stringify(params) : 'no-params';

const throttleTimeInMinutes = 1;

export const canCallApi = (apiEndpointName: VOO.Mobile.App.Enums.ApiEndPoint, paramsKey: string, store: any): boolean => {
    const state = store.getState();

    const lastSuccessfulApiCallTime = state.lastSuccessfulApiCallsTime[apiEndpointName] && state.lastSuccessfulApiCallsTime[apiEndpointName][paramsKey];
    if (!lastSuccessfulApiCallTime ||
        deltaMinutes(new Date(), lastSuccessfulApiCallTime) > throttleTimeInMinutes
    ) {
        return true;
    }
    return false;
};

export const forceCallApi = (store: any): boolean => {

    const state = store.getState();
    const forceCall = state.auth.forceCallApi;

    return forceCall;
};
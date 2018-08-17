import React from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, RefreshControl, Button, TouchableHighlight } from 'react-native';
import { Dispatch } from 'redux';
import translate from '../../../../../lang/translate';
import { RootState } from '../../../../../reducers';
import Models = Lowco.Models;
import ProductCategory = Lowco.Domain.Core.Views.Catalog.ProductCategory;
import numeral from '../../../../../helpers/numberFormatter';
import { scale } from '../../../../../helpers/scaleHelper';
import Communications from 'react-native-communications';
import * as customerOptionsActions from '../../../../../actions/CustomerOptionsActions';
import * as mobileSubscriptionsActions from '../../../../../actions/MobileSubscriptionsActions';
import OptionsSelector from '../OptionsSelector';
import MyScrollView from '../../../../common/MyScrollView';
import { COLOR_GRAY_70 } from '../../../../../styles/commonStyles';
import DropDown from '../../../../common/DropDown';
import { OptionActivationOrigins } from '../../../../../actionTypes/customerOptionsActionTypes';
import { formatNumber } from 'libphonenumber-js';
import config from '../../../../../config';

type ConnectedState = {
    customerOptions: Models.OptionViewResource[];
    loading: boolean;
    offline: boolean;
    error: any;
    mobileSubscriptions: Array<Models.MobileSubscription>;
    selectedMSISDN: number | null;
};

type ConnectedDispatch = {
    fetchOptions: () => void;
    activateOption: (option: Models.OptionViewResource) => void;
    fetchMobileSubscriptions: () => void;
    setSelectedMSISDN: (value) => void;
};

interface Props {
    fetchOptions: () => void;
    customerOptions: Models.OptionViewResource[];
    loading: boolean;
    offline: boolean;
    error: any;
    activateOption: (option: Models.OptionViewResource) => void;
    fetchMobileSubscriptions: () => void;
    mobileSubscriptions: Array<Models.MobileSubscription>;
    selectedMSISDN: number | null;
    setSelectedMSISDN: (value) => void;
}

interface State {
    refreshing: boolean;
}

export class MobileOptionsConfiguration extends React.Component<ConnectedState & ConnectedDispatch, State> {
    state: State;
    props: Props;

    constructor(props: Props) {
        super(props);
        // set initial state
        this.state = { refreshing: false };
        this.props = props;
    }

    componentWillMount() {
        this.props.fetchOptions();
        this.props.fetchMobileSubscriptions();
    }

    onRefresh() {
        this.props.fetchOptions();
        this.props.fetchMobileSubscriptions();
    }

    render() {
        const {
            loading,
            offline,
            error,
            customerOptions,
            activateOption,
            selectedMSISDN,
            setSelectedMSISDN,
            mobileSubscriptions } = this.props;

        const msisdns = Object.keys(mobileSubscriptions).map((msisdn) => ({
            key: msisdn,
            value: formatNumber(`+${msisdn}`, 'National')
        }));
        const subscription = mobileSubscriptions[selectedMSISDN || 0];
        const mobileOptions = customerOptions.filter(x =>
            x.category.toString() === 'Mobile' &&
            x.activation.optionActivationAllowed &&
            x.price !== 0);

        const noData = !msisdns || msisdns.length === 0 || !mobileOptions || mobileOptions.length === 0;
        const ignoredOptions = config.ignoredOptions;

        const selectedMobileOptions = subscription
            ? mobileOptions.filter(
                option => option.phoneNumber === subscription.msisdn.toString()
                    && ignoredOptions.indexOf(option.externalId) === -1) : [];

        return (
            <MyScrollView
                noData={noData}
                loading={loading}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
                error={error}
                offline={offline}
                noDataNoErrorText="Pas d'options"
            >
                <DropDown readOnly={Object.keys(mobileSubscriptions).length === 1} style={{ marginBottom: 5 }} defaultText={'Selectionner un plan mobile'} options={msisdns} selectedKey={subscription ? subscription.msisdn.toString() : null} onChange={setSelectedMSISDN} />
                <Text style={[styles.note, { paddingTop: scale(15) }]}>Son activation rend le service payant.</Text>
                <TouchableHighlight underlayColor='rgba(212,0,122,0.1)' onPress={() => Communications.phonecall('0478505050', true)}>
                    <Text style={styles.note}>
                        Si vous souhaitez désactiver une option, <Text style={{ textDecorationLine: 'underline' }}>appelez notre service client.</Text>
                    </Text>
                </TouchableHighlight>

                <OptionsSelector options={selectedMobileOptions} onActivateOptions={activateOption} key={'option-selector'} />
            </MyScrollView>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    featuredSection: {
        paddingTop: scale(20)
    },
    note: {
        paddingHorizontal: scale(20),
        fontSize: scale(10),
        lineHeight: scale(17),
        color: COLOR_GRAY_70
    }
});

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
    fetchMobileSubscriptions: () => dispatch(mobileSubscriptionsActions.fetchMobileSubscriptions()),
    setSelectedMSISDN: (value) => dispatch(mobileSubscriptionsActions.setSelectedMSISDN(value)),
    fetchOptions: () => dispatch(customerOptionsActions.fetchCustomerOptions()),
    activateOption: (option: Models.OptionViewResource) => {
        option.status = Lowco.Domain.Views.Product.OptionStatus.Active;
        return dispatch(customerOptionsActions.activateCustomerOptions(
            [option], OptionActivationOrigins.MobilePaidOptionsConfiguration));
    },
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
    return {
        loading: state.mobileSubscriptions.loading || state.customerOptions.loading,
        offline: state.connectionInfo && state.connectionInfo.offline,
        error: state.mobileSubscriptions.error || state.customerOptions.error,
        customerOptions: (state.customerOptions && state.customerOptions.options) ? state.customerOptions.options : [],
        selectedMSISDN: state.mobileSubscriptions ? state.mobileSubscriptions.selectedMSISDN : null,
        mobileSubscriptions: state.mobileSubscriptions.mobileSubscriptions ?
            state.mobileSubscriptions.mobileSubscriptions : []
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileOptionsConfiguration);


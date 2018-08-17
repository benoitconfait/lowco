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
import { getAddressesOptions } from '../../../../../helpers/addressesHelper';
import Communications from 'react-native-communications';
import * as addressActions from '../../../../../actions/AddressActions';
import * as customerActions from '../../../../../actions/CustomerActions';
import * as customerOptionsActions from '../../../../../actions/CustomerOptionsActions';
import OptionsSelector from '../OptionsSelector';
import DropDown from '../../../../common/DropDown';
import MyScrollView from '../../../../common/MyScrollView';
import { COLOR_GRAY_70 } from '../../../../../styles/commonStyles';
import { OptionActivationOrigins } from '../../../../../actionTypes/customerOptionsActionTypes';

type ConnectedState = {
    customerOptions: Models.OptionViewResource[];
    usageAddresses: Array<Models.Address> | null;
    selectedPodId: string | null;
    loading: boolean;
    offline: boolean;
    error: any;
};

type ConnectedDispatch = {
    fetchCustomer: () => void;
    setSelectedPodId: (value) => void;
    fetchOptions: () => void;
    activateOption: (option: Models.OptionViewResource) => void;
};

interface Props {
    fetchCustomer: () => void;
    setSelectedPodId: (value) => void;
    fetchOptions: () => void;
    activateOption: (option: Models.OptionViewResource) => void;
    customerOptions: Models.OptionViewResource[];
    usageAddresses: Array<Models.Address>;
    selectedPodId: string | null;
    loading: boolean;
    offline: boolean;
    error: any;
}

interface State {
    refreshing: boolean;
}

export class NetFreeOptionsConfiguration extends React.Component<ConnectedState & ConnectedDispatch, State> {
    state: State;
    props: Props;

    constructor(props: Props) {
        super(props);
        // set initial state
        this.state = { refreshing: false };
        this.props = props;
    }

    componentWillMount() {
        this.props.fetchCustomer();
        this.props.fetchOptions();
    }

    onRefresh() {
        this.props.fetchCustomer();
        this.props.fetchOptions();
    }

    render() {
        const {
            usageAddresses,
            selectedPodId,
            loading,
            offline,
            error,
            customerOptions,
            setSelectedPodId,
            activateOption } = this.props;

        // drop down options
        const addressOptions = getAddressesOptions(usageAddresses);

        const usageAddress = usageAddresses && usageAddresses.find((address) => address.pointOfDelivery === selectedPodId);

        const internetOptions = customerOptions.filter(x => x.category.toString() === 'Internet'
            && (x.activation.optionActivationAllowed
                || x.activation.reason.toString() === 'DeniedForPendingOperation') && x.price === 0);

        const podInternetOptions = internetOptions.filter(option => option.pointOfDeliveryId === selectedPodId);

        const noData = !addressOptions || addressOptions.length === 0 ||
            !internetOptions || internetOptions.length === 0;

        return (
            <MyScrollView
                noData={noData}
                loading={loading}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
                offline={offline}
                error={error}
                noDataNoErrorText="Pas d'options"
            >
                {(addressOptions && addressOptions.length > 0) ?
                    <DropDown
                        readOnly={addressOptions.length === 1 && typeof usageAddress !== "undefined"}
                        style={{ marginBottom: scale(12) }}
                        defaultText={'Selectionner une addresse'}
                        options={addressOptions}
                        selectedKey={selectedPodId}
                        onChange={setSelectedPodId} />
                    : null}
                <OptionsSelector options={podInternetOptions} onActivateOptions={activateOption} key={'option-selector'} />
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
    fetchCustomer: () => dispatch(customerActions.fetchCustomer()),
    setSelectedPodId: (value) => dispatch(addressActions.setSelectedPodId(value)),
    fetchOptions: () => dispatch(customerOptionsActions.fetchCustomerOptions()),
        activateOption: (option: Models.OptionViewResource) => {
            option.status = Lowco.Domain.Views.Product.OptionStatus.Active;
            return dispatch(customerOptionsActions.activateCustomerOptions(
                [option], OptionActivationOrigins.NetFreeOptionsConfiguration));
        },
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
    return {
        loading: state.customerOptions.loading || state.customer.loading,
        offline: state.connectionInfo && state.connectionInfo.offline,
        error: state.customerOptions.error,
        customerOptions: (state.customerOptions && state.customerOptions.options) ? state.customerOptions.options : [],
        usageAddresses: state.addresses ? state.addresses.usageAddresses : null,
        selectedPodId: state.addresses ? state.addresses.selectedPodId : null
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NetFreeOptionsConfiguration);

import React from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, RefreshControl, Button, TouchableHighlight } from 'react-native';
import { Dispatch } from 'redux';
import translate from '../../../../../lang/translate';
import { RootState } from '../../../../../reducers';
import Models = VOO.Mobile.App.Models;
import ProductCategory = VOO.Domain.Core.Views.Catalog.ProductCategory;
import numeral from '../../../../../helpers/numberFormatter';
import { scale } from '../../../../../helpers/scaleHelper';
import { getAddressesOptions } from '../../../../../helpers/addressesHelper';
import Communications from 'react-native-communications';
import * as customerActions from '../../../../../actions/CustomerActions';
import * as customerOptionsActions from '../../../../../actions/CustomerOptionsActions';
import * as addressActions from '../../../../../actions/AddressActions';
import OptionsSelector from '../OptionsSelector';
import { COLOR_GRAY_40, COLOR_GRAY_70, COLOR_GRAY_100 } from '../../../../../styles/commonStyles';
import MyScrollView from '../../../../common/MyScrollView';
import DropDown from '../../../../common/DropDown';
import Section from '../../../../common/Section';
import VISOption from '../../../../common/VISOption';
import { OptionActivationOrigins } from '../../../../../actionTypes/customerOptionsActionTypes';

type ConnectedState = {
    customerOptions: Models.OptionViewResource[];
    usageAddresses: Array<Models.Address> | null;
    loading: boolean;
    offline: boolean;
    error: any;
    selectedPodId: string | null;
};

type ConnectedDispatch = {
    fetchCustomer: () => void;
    fetchOptions: () => void;
    activateOption: (option: Models.OptionViewResource) => void;
    setSelectedPodId: (value) => void;
};

interface Props {
    fetchCustomer: () => void;
    fetchOptions: () => void;
    activateOption: (option: Models.OptionViewResource) => void;
    setSelectedPodId: (value) => void;
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

export class NetOptionsConfiguration extends React.Component<ConnectedState & ConnectedDispatch, State> {
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
            loading,
            offline,
            error,
            usageAddresses,
            selectedPodId,
            setSelectedPodId,
            customerOptions,
            activateOption } = this.props;

        // drop down options
        const addressOptions = getAddressesOptions(usageAddresses);

        const usageAddress = usageAddresses && usageAddresses.find((address) => address.pointOfDelivery === selectedPodId);

        const internetOptions = customerOptions.filter(x =>
            x.category.toString() === 'Internet' &&
            (x.activation.optionActivationAllowed
                || x.activation.reason.toString() === 'DeniedForPendingOperation') &&
            x.price !== 0);

        const noData = !addressOptions || addressOptions.length === 0 ||
            !internetOptions || internetOptions.length === 0;

        const podInternetOptions = internetOptions.filter(option => option.pointOfDeliveryId === selectedPodId);

        const visOptions = podInternetOptions.filter(option => option.externalId.indexOf('VOOSEC') >= 0);
        // const otherOptions = podInternetOptions.filter(option => option.externalId.indexOf('VOOSEC') < 0);

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
                        readOnly={addressOptions.length === 1 && typeof usageAddress !== 'undefined'}
                        style={{ marginBottom: scale(5) }}
                        defaultText={'Selectionner une addresse'}
                        options={addressOptions}
                        selectedKey={selectedPodId}
                        onChange={setSelectedPodId} />
                    : null}
                <Text style={[styles.note, { paddingTop: scale(15) }]}>Son activation rend le service payant.</Text>
                <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => Communications.phonecall('0478505050', true)}>
                    <Text style={styles.note}>
                        Si vous souhaitez désactiver une option, <Text style={{ textDecorationLine: 'underline' }}>appelez notre service client.</Text>
                    </Text>
                </TouchableHighlight>
                {/*otherOptions && otherOptions.length > 0 ?
                    <OptionsSelector options={otherOptions} onActivateOptions={activateOption} key={"option-selector"} /> : null */}
                {visOptions && visOptions.length > 0 ?
                    <VISOption style={{ marginTop: scale(15) }} hideDescription={false} onActivateOption={activateOption} visOptions={visOptions} /> : null}
            </MyScrollView>
        );
    }
}

const styles = StyleSheet.create({
    note: {
        paddingHorizontal: scale(20),
        fontSize: scale(10),
        lineHeight: scale(17),
        color: COLOR_GRAY_70
    },
    lineTextWrapper: {
        flexDirection: 'row',
    },
    lineTextLeft: {
        paddingRight: scale(10),
        justifyContent: 'flex-start',
        width: '70%'
    },
    header: {
        fontFamily: 'Roboto-Regular',
        fontSize: scale(15),
        color: COLOR_GRAY_100
    }
});

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
    fetchCustomer: () => dispatch(customerActions.fetchCustomer()),
    fetchOptions: () => dispatch(customerOptionsActions.fetchCustomerOptions()),
    activateOption: (option: Models.OptionViewResource) => {
        option.status = VOO.Domain.Views.Product.OptionStatus.Active;
        return dispatch(customerOptionsActions.activateCustomerOptions(
            [option], OptionActivationOrigins.NetPaidOptionsConfiguration));
    },
    setSelectedPodId: (value) => dispatch(addressActions.setSelectedPodId(value)),
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
    return {
        loading: state.customerOptions.loading || state.customer.loading,
        offline: state.connectionInfo && state.connectionInfo.offline,
        error: state.customerOptions.error || state.customer.error,
        usageAddresses: state.addresses ? state.addresses.usageAddresses : null,
        customerOptions: (state.customerOptions && state.customerOptions.options) ? state.customerOptions.options : [],
        selectedPodId: state.addresses ? state.addresses.selectedPodId : null
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NetOptionsConfiguration);


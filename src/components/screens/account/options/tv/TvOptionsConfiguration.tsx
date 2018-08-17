import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, RefreshControl, TouchableHighlight } from 'react-native';
import { Dispatch } from 'redux';
import translate from '../../../../../lang/translate';
import { RootState } from '../../../../../reducers';
import Models = Lowco.Models;
import { scale } from '../../../../../helpers/scaleHelper';
import { getAddressesOptions } from '../../../../../helpers/addressesHelper';
import Communications from 'react-native-communications';
import * as addressActions from '../../../../../actions/AddressActions';
import * as customerActions from '../../../../../actions/CustomerActions';
import * as customerOptionsActions from '../../../../../actions/CustomerOptionsActions';
import OptionsSelector from '../OptionsSelector';
import MyScrollView from '../../../../common/MyScrollView';
import DropDown from '../../../../common/DropDown';
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

export class TvOptionsConfiguration extends React.Component<ConnectedState & ConnectedDispatch, State> {
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
            setSelectedPodId,
            loading,
            offline,
            error,
            customerOptions,
            activateOption } = this.props;

        // drop down options
        const addressOptions = getAddressesOptions(usageAddresses);

        const usageAddress = usageAddresses && usageAddresses.find((address) => address.pointOfDelivery === selectedPodId);

        const tvOptions = customerOptions.filter(x =>
            x.category.toString() === 'Television' &&
            (x.activation.optionActivationAllowed
                || x.activation.reason.toString() === 'DeniedForPendingOperation') &&
            x.price !== 0 &&
            x.externalId !== 'LOC_DEC' &&
            x.externalId !== 'LOC_TN');

        const noData = !addressOptions || addressOptions.length === 0 ||
            !tvOptions || tvOptions.length === 0;

        const podTVOptions = tvOptions.filter(option => option.pointOfDeliveryId === selectedPodId);

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
                <Text style={[styles.note, { paddingTop: scale(15) }]}>Son activation rend le service payant. Si vous souhaitez</Text>
                <TouchableHighlight underlayColor='rgba(212,0,122,0.1)' onPress={() => Communications.phonecall('0478505050', true)}>
                    <Text style={styles.note}>
                        désactiver une option, <Text style={{ textDecorationLine: 'underline' }}>appelez notre service client.</Text>
                    </Text>
                </TouchableHighlight>

                <OptionsSelector options={podTVOptions} onActivateOptions={activateOption} key={'option-selector'} />
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
    fetchOptions: () => dispatch(customerOptionsActions.fetchCustomerOptions()),
    activateOption: (option: Models.OptionViewResource) => {
        option.status = Lowco.Domain.Views.Product.OptionStatus.Active;
        return dispatch(customerOptionsActions.activateCustomerOptions(
            [option], OptionActivationOrigins.TvPaidOptionsConfiguration));
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

export default connect(mapStateToProps, mapDispatchToProps)(TvOptionsConfiguration);


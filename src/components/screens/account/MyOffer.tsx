import React from 'react';
import { RefreshControl, ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import translate from '../../../lang/translate';
import { List, ListItem } from 'react-native-elements';
import { ProfileHeader } from './ProfileHeader';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { scale } from '../../../helpers/scaleHelper';
import { RootState } from '../../../reducers';
import * as addressActions from '../../../actions/AddressActions';
import * as customerActions from '../../../actions/CustomerActions';
import * as customerOptionsActions from '../../../actions/CustomerOptionsActions';
import * as mobileSubscriptionsActions from '../../../actions/MobileSubscriptionsActions';
import Models = Lowco.Models;
import Section from '../../common/Section';
import FixOffer from './FixOffer';
import MobileOffer from './MobileOffer';
import MyScrollView from '../../common/MyScrollView';


type ConnectedState = {
    loading: boolean;
    offline: boolean;
    error: any;
    options: Models.OptionViewResource[] | null;
    usageAddresses: Array<Models.Address> | null;
    mobileSubscriptions: Array<Models.MobileSubscription>;
    selectedPodId: string | null;
    selectedMSISDN: number | null;
    customer: any;
}

type ConnectedDispatch = {
    fetchCustomer: () => void;
    fetchCustomerOptions: () => void;
    fetchMobileSubscriptions: () => void;
    setSelectedPodId: (value) => void;
    setSelectedMSISDN: (value) => void;
}

interface Props {
    fetchCustomer: () => void;
    fetchCustomerOptions: () => void;
    fetchMobileSubscriptions: () => void;
    setSelectedPodId: (value) => void;
    setSelectedMSISDN: (value) => void;
    customer: any;
    options: Models.OptionViewResource[];
    usageAddresses: Array<Models.Address>;
    mobileSubscriptions: Array<Models.MobileSubscription>;
    loading: boolean;
    offline: boolean;
    error: any;
    selectedPodId: string | null;
    selectedMSISDN: number | null;
    navigation: any
}

interface State {
    refreshing: boolean;
}

export class MyOffer extends React.Component<ConnectedState & ConnectedDispatch, State> {
    props: Props;

    constructor(props: Props) {
        super(props);
        // set initial state
        this.state = { refreshing: false };
        this.props = props;
    }

    componentWillMount() {
        this.props.fetchCustomer();
        this.props.fetchCustomerOptions();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedPodId !== nextProps.selectedPodId) {
            this.props.fetchCustomerOptions();
        }
    }

    onRefresh() {
        this.props.fetchCustomer();
        this.props.fetchCustomerOptions();
    }

    render() {
        const {
            usageAddresses,
            mobileSubscriptions,
            loading,
            offline,
            error,
            selectedPodId,
            setSelectedPodId,
            selectedMSISDN,
            setSelectedMSISDN,
            customer,
            navigation,
            options } = this.props;
        const { customerId, firstname, lastname, login, gsmNumber, emailAddress } = customer;

        const noData = !usageAddresses && (!options || options.length === 0) &&
            !selectedPodId && (!mobileSubscriptions || mobileSubscriptions.length === 0) && !selectedMSISDN;

        return (
            <MyScrollView
                noData={noData}
                loading={loading}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
                error={error}
                offline={offline}
            >
                <FixOffer
                    style={{ marginTop: scale(15) }}
                    addresses={usageAddresses}
                    options={options}
                    selectedPodId={selectedPodId}
                    onAddressChange={setSelectedPodId} />
                <MobileOffer
                    style={{ marginVertical: scale(25) }}
                    subscriptions={mobileSubscriptions}
                    selectedMSISDN={selectedMSISDN}
                    onMobileChange={setSelectedMSISDN}
                />
            </MyScrollView>
        );
    }
}

const styles = StyleSheet.create({
    label: {
        marginTop: scale(22),
        marginBottom: scale(10),
        marginHorizontal: scale(20),
        fontFamily: 'Roboto',
        fontWeight: '500',
        fontSize: scale(10)
    },
    value: {
        marginHorizontal: scale(7),
        fontFamily: 'Roboto',
        fontSize: scale(13),
        lineHeight: scale(18)
    }
});
const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
    fetchCustomer: () => dispatch(customerActions.fetchCustomer()),
    fetchCustomerOptions: () => dispatch(customerOptionsActions.fetchCustomerOptions()),
    fetchMobileSubscriptions: () => dispatch(mobileSubscriptionsActions.fetchMobileSubscriptions()),
    setSelectedPodId: (value) => dispatch(addressActions.setSelectedPodId(value)),
    setSelectedMSISDN: (value) => dispatch(mobileSubscriptionsActions.setSelectedMSISDN(value))
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
    return {
        loading: state.customer.loading || state.customerOptions.loading || state.mobileSubscriptions.loading,
        error: state.customer.error || state.customerOptions.error || state.mobileSubscriptions.error,
        offline: state.connectionInfo && state.connectionInfo.offline,
        customer: state.customer ? state.customer : null,
        usageAddresses: state.addresses ? state.addresses.usageAddresses : null,
        mobileSubscriptions: state.mobileSubscriptions.mobileSubscriptions ?
            state.mobileSubscriptions.mobileSubscriptions : [],
        selectedPodId: state.addresses ? state.addresses.selectedPodId : null,
        selectedMSISDN: state.mobileSubscriptions ? state.mobileSubscriptions.selectedMSISDN : null,
        options: state.customerOptions ? state.customerOptions.options : [],
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOffer);

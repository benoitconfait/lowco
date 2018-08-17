import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, RefreshControl, TouchableHighlight } from 'react-native';
import { Dispatch } from 'redux';
import translate from '../../../../../lang/translate';
import { RootState } from '../../../../../reducers';
import Models = Lowco.Models;
import { scale } from '../../../../../helpers/scaleHelper';
import Communications from 'react-native-communications';
import * as phoneUsageActions from '../../../../../actions/PhoneUsageActions';
import * as customerOptionsActions from '../../../../../actions/CustomerOptionsActions';
import OptionsSelector from '../OptionsSelector';
import MyScrollView from '../../../../common/MyScrollView';
import DropDown from '../../../../common/DropDown';
import { COLOR_GRAY_70 } from '../../../../../styles/commonStyles';
import { OptionActivationOrigins } from '../../../../../actionTypes/customerOptionsActionTypes';
import { formatNumber } from 'libphonenumber-js';

type ConnectedState = {
    phones: Array<Models.Phone> | null;
    selectedPhoneNumber: string | null;
    customerOptions: Models.OptionViewResource[];
    loading: boolean;
    offline: boolean;
    error: any;
}

type ConnectedDispatch = {
    fetchPhones: () => void;
    setSelectedPhoneNumber: (value) => void;
    fetchOptions: () => void;
    activateOption: (option: Models.OptionViewResource) => void;
};

interface Props {
    fetchPhones: () => void;
    setSelectedPhoneNumber: (value) => void;
    fetchOptions: () => void;
    activateOption: (option: Models.OptionViewResource) => void;
    phones: Array<Models.Phone> | null;
    selectedPhoneNumber: string | null;
    customerOptions: Models.OptionViewResource[];
    loading: boolean;
    offline: boolean;
    error: any;
}

interface State {
    refreshing: boolean;
}

export class TelOptionsConfiguration extends React.Component<ConnectedState & ConnectedDispatch, State> {
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
    }

    onRefresh() {
        this.props.fetchOptions();
    }

    render() {
        const {
            loading,
            offline,
            error,
            phones,
            selectedPhoneNumber,
            setSelectedPhoneNumber,
            customerOptions,
            activateOption } = this.props;

        // drop down options
        const phoneOptions = phones && phones.length > 0 ? phones.map((phone) => {
            return {
                key: phone.esId,
                value: formatNumber(`+32${phone.esId}`, 'National')
            };
        }) : [];

        const telOptions = customerOptions.filter(x => x.category.toString() === 'Phone'
            && (x.activation.optionActivationAllowed
                || x.activation.reason.toString() === 'DeniedForPendingOperation') && x.price !== 0);

        const noData = !phoneOptions || phoneOptions.length === 0 ||
            !telOptions || telOptions.length === 0;

        const phoneTelOptions = telOptions.filter(option => option.phoneNumber === selectedPhoneNumber);

        console.log('TEL', telOptions, phoneTelOptions, selectedPhoneNumber);

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
                <DropDown readOnly={phones && phones.length === 1 || false} style={{ marginBottom: scale(5) }} defaultText={'Selectionner un numéro'} options={phoneOptions} selectedKey={selectedPhoneNumber || ''} onChange={setSelectedPhoneNumber} />
                <Text style={[styles.note, { paddingTop: scale(20) }]}>Son activation rend le service payant.</Text>
                <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => Communications.phonecall('0478505050', true)}>
                    <Text style={styles.note}>
                        Si vous souhaitez désactiver une option, <Text style={{ textDecorationLine: 'underline' }}>appelez notre service client.</Text>
                    </Text>
                </TouchableHighlight>

                <OptionsSelector options={phoneTelOptions} onActivateOptions={activateOption} key={'option-selector'} />
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
    fetchPhones: () => dispatch(phoneUsageActions.fetchPhones()),
    setSelectedPhoneNumber: (value) => dispatch(phoneUsageActions.setSelectedPhoneNumber(value)),
    fetchOptions: () => dispatch(customerOptionsActions.fetchCustomerOptions()),
    activateOption: (option: Models.OptionViewResource) => {
        option.status = Lowco.Domain.Views.Product.OptionStatus.Active;
        return dispatch(customerOptionsActions.activateCustomerOptions(
            [option], OptionActivationOrigins.TelPaidOptionsConfiguration));
    },
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
    return {
        loading: state.customerOptions.loading,
        offline: state.connectionInfo && state.connectionInfo.offline,
        error: state.customerOptions.error,
        customerOptions: (state.customerOptions && state.customerOptions.options) ? state.customerOptions.options : [],
        selectedPhoneNumber: state.phones ? state.phones.selectedPhoneNumber : null,
        phones: state.phones ? state.phones.phones : null,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TelOptionsConfiguration);


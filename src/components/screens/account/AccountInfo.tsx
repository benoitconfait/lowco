import React from 'react';
import { RefreshControl, ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLOR_GRAY_80 } from '../../../styles/commonStyles';
import translate from '../../../lang/translate';
import { List, ListItem } from 'react-native-elements';
import { ProfileHeader } from './ProfileHeader';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { scale } from '../../../helpers/scaleHelper';
import { RootState } from '../../../reducers';
import * as customerActions from '../../../actions/CustomerActions';
import * as phoneUsageActions from '../../../actions/PhoneUsageActions';
import Section from '../../common/Section';
import MyScrollView from '../../common/MyScrollView';
import Models = Lowco.Models;
import LineColumnType = VOO.Mobile.App.Enums.LineColumnType;
import { formatNumber } from 'libphonenumber-js';

type ConnectedState = {
    offline: boolean;
    loading: boolean;
    error: any;
    customer: any;
    phones: Array<Models.Phone> | null;
    billingAddress: Models.Address | null;
}

type ConnectedDispatch = {
    fetchPhones: () => void;
    fetchCustomer: () => void;
}

interface Props {
    fetchPhones: () => void;
    fetchCustomer: () => void;
    customer: any;
    phones: Array<Models.Phone> | null;
    billingAddress: Models.Address | null;
    offline: boolean;
    loading: boolean;
    error: any;
    navigation: any;
}

interface State {
    refreshing: boolean;
}

export class AccountInfo extends React.Component<ConnectedState & ConnectedDispatch, State> {
    props: Props;

    constructor(props: Props) {
        super(props);
        // set initial state
        this.state = { refreshing: false };
        this.props = props;
    }

    componentWillMount() {
        this.props.fetchCustomer();
        this.props.fetchPhones();
    }

    onRefresh() {
        this.props.fetchCustomer();
        this.props.fetchPhones();
    }

    render() {
        const { loading, offline, error, navigation, customer, billingAddress, phones } = this.props;
        const { customerId, firstname, lastname, login, gsmNumber, emailAddress } = customer;

        let phoneNumber = phones && phones.length > 0 ? phones[0].esId : null;

        return (
            <MyScrollView
                noData={false}
                loading={loading}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
                error={error}
                offline={offline}
            >
                <Text style={styles.label}>MON NUMÉRO DE CLIENT VOO</Text>
                <Section noBorderBottom={true}>
                    <Text style={styles.value}>{customerId}</Text>
                </Section>
                <Text style={styles.label}>MON NOM ET PRÉNOM</Text>
                <Section noBorderBottom={true}>
                    <Text style={styles.value}>{firstname && lastname ? `${firstname} ${lastname}` : ''}</Text>
                </Section>
                <Text style={styles.label}>MON IDENTIFIANT VOO</Text>
                <Section noBorderBottom={true}>
                    <Text style={styles.value}>{login}</Text>
                    <Text style={styles.note}>Vous pouvez mettre à jour votre e-mail sur my.voo.be</Text>
                </Section>
                {phoneNumber ? (<View>
                    <Text style={styles.label}>MON NUMÉRO DE TÉLÉPHONE FIXE</Text>
                    <Section noBorderBottom={true}>
                        <Text style={styles.value}>{formatNumber(`+32${parseInt(phoneNumber, 10)}`, 'National')}</Text>
                    </Section>
                </View>) : null}
                {billingAddress ?
                    (<View>
                        <Text style={styles.label}>MON ADRESSE DE FACTURATION</Text>
                        <Section noBorderBottom={true}>
                            <Text style={styles.value}>{billingAddress.street}, {billingAddress.streetId}</Text>
                            <Text style={styles.value}>{billingAddress.zipCode} {billingAddress.city}</Text>
                        </Section>
                    </View>) : null}
                <Text style={styles.label}>MON NUMÉRO DE GSM</Text>
                <Section noBorderBottom={true}>
                    <Text style={styles.value}>{formatNumber(`+32${parseInt(gsmNumber, 10)}`, 'National')}</Text>
                </Section>
                <Text style={styles.label}>MON E-MAIL DE CONTACT</Text>
                <Section noBorderBottom={true}>
                    <Text style={styles.value}>{emailAddress}</Text>
                </Section>
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
        fontSize: scale(10),
        letterSpacing: scale(1)
    },
    value: {
        marginHorizontal: scale(7),
        fontFamily: 'Roboto',
        fontSize: scale(13),
        lineHeight: scale(18)
    },
    note: {
        marginTop: scale(3),
        marginHorizontal: scale(7),
        fontFamily: 'Roboto',
        fontSize: scale(10),
        color: COLOR_GRAY_80
    }
});

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
    fetchCustomer: () => dispatch(customerActions.fetchCustomer()),
    fetchPhones: () => dispatch(phoneUsageActions.fetchPhones()),
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
    return {
        loading: state.customer.loading || state.phones.loading,
        error: state.customer.error || state.phones.error,
        offline: state.connectionInfo && state.connectionInfo.offline,
        customer: state.customer ? state.customer : null,
        phones: state.phones ? state.phones.phones : null,
        billingAddress: state.addresses ? state.addresses.billingAddress : null,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);

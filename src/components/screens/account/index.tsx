import React from 'react';
import { View, StyleSheet, Text, Button, FlatList } from 'react-native';
import translate from '../../../lang/translate';
import { List } from 'react-native-elements';
import MyListItem from '../../common/MyListItem';
import { ProfileHeader } from './ProfileHeader';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { scale } from '../../../helpers/scaleHelper';
import { RootState } from '../../../reducers';
import * as customerActions from '../../../actions/CustomerActions';
import { COLOR_GRAY_20, COLOR_GRAY_100 } from '../../../styles/commonStyles';
import TermsConditionsPrivaclyLink from './TermsConditionsPrivacyLink';
import Models = Lowco.Models;

type ConnectedState = {
    loading: boolean;
    customer: any;
}

type ConnectedDispatch = {
    fetchCustomer: () => void;
}

interface Props {
    fetchCustomer: () => void;
    customer: any;
    loading: boolean;
    navigation: any;
}

interface State {
}

export class Account extends React.Component<ConnectedState & ConnectedDispatch, State> {
    props: Props;

    constructor(props: Props) {
        super(props);
        // set initial state
        this.props = props;
    }

    componentDidMount() {
        const { navigation, customer } = this.props;
        const { firstname, lastname, customerId } = customer;

        navigation.setParams({
            firstname,
            lastname,
            customerId
        });
    }

    render() {
        const { navigation, customer } = this.props;
        const { firstname, lastname, customerId } = customer;

        return (
            <View style={styles.content}>
                {/* <ProfileHeader clientName={firstname && lastname ? `${firstname} ${lastname}` : ''} clientNumber={customerId} /> */}
                <List containerStyle={styles.list}>
                    <MyListItem
                        key="MyOffer"
                        title="Mon offre"
                        onPress={() => navigation.navigate('MyOffer')}
                    />
                    <MyListItem
                        key="AccountInfo"
                        title="Informations du compte"
                        onPress={() => navigation.navigate('AccountInfo')}
                    />

                    <MyListItem
                        key="AccountOptions"
                        title="Configurer mon offre"
                        onPress={() => navigation.navigate('AccountOptions')}
                    />
                </List>
                <TermsConditionsPrivaclyLink />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    list: {
        borderTopWidth: 0,
        marginBottom: scale(34),
        marginTop: scale(0)
    },
    listItemContainer: {
        borderTopWidth: 0,
        borderBottomWidth: scale(1),
        borderBottomColor: COLOR_GRAY_20
    },
    listItem: {
        fontFamily: 'Roboto-Regular',
        fontSize: scale(14),
        color: COLOR_GRAY_100
    }
});

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
    fetchCustomer: () => dispatch(customerActions.fetchCustomer())
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
    return {
        loading: state.customer && state.customer.loading,
        customer: state.customer ? state.customer : null
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);

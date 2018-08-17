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
import { COLOR_GRAY_20, COLOR_GRAY_40 } from '../../../styles/commonStyles';
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

export class AccountOptions extends React.Component<ConnectedState & ConnectedDispatch, State> {
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
        const { navigation } = this.props;
        return (
            <View style={styles.content}>
                <List containerStyle={styles.list}>
                    <MyListItem
                        key="AccountOptionsNet"
                        title="NET"
                        onPress={() => navigation.navigate('AccountOptionsNet')}
                    />
                    <MyListItem
                        key="AccountOptionsTel"
                        title="TEL"
                        onPress={() => navigation.navigate('AccountOptionsTel')}
                    />
                    <MyListItem
                        key="AccountOptionsTv"
                        title="TV"
                        onPress={() => navigation.navigate('AccountOptionsTv')}
                    />
                    <MyListItem
                        key="AccountOptionsMobile"
                        title="Mobile"
                        onPress={() => navigation.navigate('AccountOptionsMobile')}
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
        marginBottom: scale(34),
        marginTop: scale(0)
    },
    link: {
        backgroundColor: COLOR_GRAY_20,
        borderBottomColor: COLOR_GRAY_40
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountOptions);

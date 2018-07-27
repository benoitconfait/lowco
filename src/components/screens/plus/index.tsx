import React from 'react';
import { StyleSheet, View, Linking, ImageBackground, TouchableHighlight, Text } from 'react-native';
import { COLOR_GRAY_20, COLOR_GRAY_30, COLOR_PRIMARY } from '../../../styles/commonStyles';
import { List } from 'react-native-elements';
import MyListItem from '../../common/MyListItem';
import { scale } from '../../../helpers/scaleHelper';
import translate from '../../../lang/translate';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../../reducers';
import { logout } from '../../../actions/AuthAction';
import { fetchCustomer } from '../../../actions/CustomerActions';

type ConnectedState = {

};

type ConnectedDispatch = {
    logout: () => void;
    fetchCustomer: () => void;
};

interface Props {
    logout: () => void;
    fetchCustomer: () => void;
    navigation: any;
}

interface State {

}

export class Plus extends React.Component<ConnectedState & ConnectedDispatch, State> {
    state: State;
    props: Props;

    constructor(props: Props) {
        super(props);
        // set initial state
        this.state = {};
        this.props = props;
    }

    _disconnectUser() {
        this.props.logout();
        this.props.fetchCustomer();
        this.props.navigation.navigate('Home');
    }

    _openApp(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    render() {

        return (
            <View style={styles.container}>
                <ImageBackground
                    resizeMode='cover'
                    style={styles.backgroundImage}
                    source={require('../../../../assets/img/my-account-bg.png')} />
                <View style={styles.body}>
                    <List containerStyle={{ marginTop: 0, marginBottom: scale(115), borderTopColor: COLOR_GRAY_20 }}>
                        <MyListItem
                            key="VOOassistance"
                            title="VOOassistance"
                            onPress={() => Linking.openURL('https://assistance.voo.be/')}
                        />
                        <MyListItem
                            key="Contactez-nous"
                            title="Contactez-nous"
                            onPress={() => Linking.openURL('https://form.voo.be/fr/contact')}
                        />
                        {/* <MyListItem
                        key="VOOmotion"
                        title="VOOmotion"
                        onPress={() => this._openApp('//voomotion')}
                    />
                    <MyListItem
                        key="VOO Internet Security"
                        title="VOO Internet Security"
                        onPress={() => this._openApp('//vis')}
                    /> */}
                    </List>

                    <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => this._disconnectUser()} style={[styles.button]}>
                        <Text style={[styles.validateButtonText]}>{translate('LOGOUT')}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1,
        backgroundColor: COLOR_GRAY_20,
        justifyContent: 'flex-start'
    },
    backgroundImage: {
        height: 235,
        margin: 0,
        padding: 0
    },
    link: {
        borderBottomColor: COLOR_GRAY_30
    },
    button: {
        backgroundColor: '#fff',
        maxHeight: scale(48),
        padding: scale(15),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: COLOR_GRAY_30,
        borderBottomWidth: scale(1)
    },
    validateButtonText: {
        fontFamily: 'Roboto-Regular',
        fontSize: scale(14),
        color: COLOR_PRIMARY
    },
});

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
    logout: () => dispatch(logout()),
    fetchCustomer: () => dispatch(fetchCustomer()),
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Plus);



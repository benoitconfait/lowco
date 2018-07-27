import React from 'react';
import { connect } from 'react-redux';
import { Platform, View, ScrollView, StyleSheet, Text, ActivityIndicator, RefreshControl, TouchableHighlight, TextInput, Picker } from 'react-native';
import { List } from 'react-native-elements';
import MyListItem from '../../../../common/MyListItem';
import TextHeader from '../../../../common/TextHeader';
import { Dispatch } from 'redux';
import translate from '../../../../../lang/translate';
import { RootState } from '../../../../../reducers';
import Models = VOO.Mobile.App.Models;
import { scale } from '../../../../../helpers/scaleHelper';
import Communications from 'react-native-communications';
import * as tvOptionsActions from '../../../../../actions/TvOptionsActions';
import OptionsSelector from '../OptionsSelector';
import MyScrollView from '../../../../common/MyScrollView';
import { COLOR_ERROR, COLOR_GRAY_20, COLOR_GRAY_30, COLOR_GRAY_70, COLOR_GRAY_100, COLOR_WARNING, COLOR_POSITIVE, COLOR_PRIMARY } from '../../../../../styles/commonStyles';
import Modal from 'react-native-modal';
import { Dropdown } from 'react-native-material-dropdown';

type ConnectedState = {
    parentalControlMinAgeRating: string | null,
    parentalControlPinCode: string | null,
    vodPurchaseCode: string | null,
    loading: boolean;
    offline: boolean;
    error: any;
}

type ConnectedDispatch = {
    fetchTvOptions: () => void;
    activateOption: (option: any) => void;
    updateParentalControlAge: (age: string) => void;
    updateParentalControlPin: (pin: string) => void;
    updateVODPurchaseCode: (code: string) => void;
}

interface Props {
    fetchTvOptions: () => void;
    parentalControlMinAgeRating: string | null;
    parentalControlPinCode: string | null;
    vodPurchaseCode: string | null;
    loading: boolean;
    offline: boolean;
    error: any;
    navigation: any;
    activateOption: (option: any) => void;
    updateParentalControlAge: (age: string) => void;
    updateParentalControlPin: (pin: string) => void;
    updateVODPurchaseCode: (code: string) => void;
}

interface State {
    refreshing: boolean;
    parentalCodeModalVisible: boolean;
    purchaseCodeModalVisible: boolean;
    ageControlModalVisible: boolean;
    savedParentalCode: string | null;
    savedPurchaseCode: string | null;
    savedMinAge: string | null;
}

export class TvParametersConfiguration extends React.Component<ConnectedState & ConnectedDispatch, State> {
    state: State;
    props: Props;

    constructor(props: Props) {
        super(props);
        // set initial state
        this.state = {
            refreshing: false,
            parentalCodeModalVisible: false,
            purchaseCodeModalVisible: false,
            ageControlModalVisible: false,
            savedParentalCode: null,
            savedPurchaseCode: null,
            savedMinAge: null
        };
        this.props = props;
    }

    componentWillMount() {
        this.props.fetchTvOptions();
    }

    onRefresh() {
        this.props.fetchTvOptions();
    }

    openModal(name: string) {
        switch (name) {
            case 'parentalCode':
                this.setState({
                    parentalCodeModalVisible: true,
                    savedParentalCode: this.props.parentalControlPinCode
                });
                break;
            case 'purchaseCode':
                this.setState({
                    purchaseCodeModalVisible: true,
                    savedPurchaseCode: this.props.vodPurchaseCode
                });
                break;
            case 'ageControl':
                this.setState({
                    ageControlModalVisible: true,
                    savedMinAge: this.props.parentalControlMinAgeRating
                });
                break;
        }

    }

    closeModal(name: string, cancel?: boolean) {
        switch (name) {
            case 'parentalCode':
                this.setState({ parentalCodeModalVisible: false });
                if (cancel) {
                    this.updateParentalControlPin(this.state.savedParentalCode || '');
                }
                break;
            case 'purchaseCode':
                this.setState({ purchaseCodeModalVisible: false });
                if (cancel) {
                    this.updateVODPurchaseCode(this.state.savedPurchaseCode || '');
                }
                break;
            case 'ageControl':
                this.setState({ ageControlModalVisible: false });
                if (cancel) {
                    this.updateParentalControlAge(this.state.savedMinAge || '');
                }
                break;
        }
    }

    isFourDigits(pin) {
        var reg = new RegExp(/^\d+$/);
        return pin && reg.test(pin) && pin.length === 4;
    }

    activateOption(name: string) {
        switch (name) {
            case 'parentalCode':
                if (this.isFourDigits(this.props.parentalControlPinCode)) {
                    this.props.activateOption({ ParentalCode: this.props.parentalControlPinCode });
                    this.closeModal(name);
                }
                break;
            case 'purchaseCode':
                if (this.isFourDigits(this.props.vodPurchaseCode)) {
                    this.props.activateOption({ PurchaseCode: this.props.vodPurchaseCode });
                    this.closeModal(name);
                }
                break;
            case 'ageControl':
                this.props.activateOption({ MinAgeRating: this.props.parentalControlMinAgeRating });
                this.closeModal(name);
                break;
        }
    }

    updateParentalControlAge(age: string) {
        this.props.updateParentalControlAge(age);
    }

    updateParentalControlPin(pin: string) {
        this.props.updateParentalControlPin(pin);
    }

    updateVODPurchaseCode(code: string) {
        this.props.updateVODPurchaseCode(code)
    }

    render() {
        const {
            loading,
            error,
            offline,
            parentalControlMinAgeRating,
            parentalControlPinCode,
            vodPurchaseCode,
            activateOption,
            navigation } = this.props;

        const minAgeRating = parentalControlMinAgeRating ? parentalControlMinAgeRating : '10';
        const ageControlOptions = [
            { value: '10', label: '10 ans' },
            { value: '12', label: '12 ans' },
            { value: '16', label: '16 ans' },
            { value: '20', label: '20 ans' },
        ];

        return (
            <MyScrollView
                noData={false}
                loading={loading}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh.bind(this)}
                offline={offline}
                error={error}
                noDataNoErrorText=""
            >
                <Modal
                    isVisible={this.state.parentalCodeModalVisible}
                    onBackdropPress={() => this.closeModal('parentalCode')}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{'Modifier son code PIN'}</Text>
                            <Text style={styles.modalDescription}>Entrez votre nouveau code PIN</Text>
                            <View style={Platform.OS === 'ios' ? styles.pinTextInputWrapperIOS : null }>
                                <TextInput
                                    underlineColorAndroid={COLOR_PRIMARY}
                                    style={styles.pinTextInput}
                                    placeholder='****'
                                    maxLength={4}
                                    keyboardType={'numeric'}
                                    defaultValue={this.props.parentalControlPinCode ? this.props.parentalControlPinCode : ''}
                                    onChangeText={(pin) => this.updateParentalControlPin(pin)} />
                            </View>
                        </View>
                        <View style={styles.modalButtons}>
                            <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => this.closeModal('parentalCode', true)} style={[styles.modalButton, styles.modalLeftButton]}>
                                <Text style={styles.modalCancelButtonText}>Annuler</Text>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => this.activateOption('parentalCode')} style={styles.modalButton}>
                                <Text style={styles.modalOKButtonText}>Confirmer</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                <Modal
                    isVisible={this.state.purchaseCodeModalVisible}
                    onBackdropPress={() => this.closeModal('purchaseCode')}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{'Modifier son code PIN'}</Text>
                            <Text style={styles.modalDescription}>Entrez votre nouveau code PIN</Text>
                            <View style={Platform.OS === 'ios' ? styles.pinTextInputWrapperIOS : null }>
                                <TextInput
                                    underlineColorAndroid={COLOR_PRIMARY}
                                    style={styles.pinTextInput}
                                    placeholder='****'
                                    maxLength={4}
                                    keyboardType={'numeric'}
                                    defaultValue={this.props.vodPurchaseCode ? this.props.vodPurchaseCode : ''}
                                    onChangeText={(pin) => this.updateVODPurchaseCode(pin)}
                                />
                            </View>
                        </View>
                        <View style={styles.modalButtons}>
                            <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => this.closeModal('purchaseCode', true)} style={[styles.modalButton, styles.modalLeftButton]}>
                                <Text style={styles.modalCancelButtonText}>Annuler</Text>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => this.activateOption('purchaseCode')} style={styles.modalButton}>
                                <Text style={styles.modalOKButtonText}>Confirmer</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                <Modal
                    isVisible={this.state.ageControlModalVisible}
                    onBackdropPress={() => this.closeModal('ageControl')}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{'Modifier la limite d\'âge'}</Text>
                            <Text style={styles.modalDescription}>Sélectionner la nouvelle limite d'âge</Text>
                            <View style={{ width: 220, marginLeft: 8 }}>
                                <Dropdown
                                    value={this.props.parentalControlMinAgeRating}
                                    data={ageControlOptions}
                                    onChangeText={(age) => this.updateParentalControlAge(age)}
                                />
                            </View>
                        </View>
                        <View style={styles.modalButtons}>
                            <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => this.closeModal('ageControl', true)} style={[styles.modalButton, styles.modalLeftButton]}>
                                <Text style={styles.modalCancelButtonText}>Annuler</Text>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => this.activateOption('ageControl')} style={styles.modalButton}>
                                <Text style={styles.modalOKButtonText}>Confirmer</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>


                <Text style={[styles.note, { paddingTop: scale(20), paddingBottom: scale(20) }]}>Permet de configurer gratuitement le produit, ne change pas l'abonnement.</Text>
                <TextHeader
                    text={translate('PARENTAL_CONTROL')}
                />
                <List containerStyle={styles.list}>
                    <MyListItem
                        key={'ParentalPinCode'}
                        title={'Code PIN'}
                        onPress={() => this.openModal('parentalCode')}
                    />
                    <MyListItem
                        key={'AgeLimit'}
                        title={'Limite d\'âge'}
                        rightTitle={`${parentalControlMinAgeRating ? parentalControlMinAgeRating : null} ans`}
                        rightTitleStyle={styles.ageLimit}
                        onPress={() => this.openModal('ageControl')}
                    />
                </List>
                <TextHeader
                    text={translate('BUY_CODE')}
                />
                <List containerStyle={styles.list}>
                    <MyListItem
                        key={'BuyPinCode'}
                        title={'Code PIN'}
                        onPress={() => this.openModal('purchaseCode')}
                    />
                </List>
            </MyScrollView>
        );
    }
};

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
    },
    body: {
        flex: 1,
        backgroundColor: COLOR_GRAY_20
    },
    ageLimit: {
        color: COLOR_PRIMARY
    },
    modalContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: scale(2)
    },
    modalContent: {
        paddingVertical: scale(25),
        paddingHorizontal: scale(10),
        alignItems: 'center'
    },
    modalTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: scale(15),
        marginBottom: scale(5),
        color: COLOR_GRAY_100
    },
    modalDescription: {
        fontSize: scale(14),
        textAlign: 'center',
        lineHeight: scale(29),
        color: COLOR_GRAY_70
    },
    modalButtons: {
        borderTopWidth: scale(1),
        borderTopColor: COLOR_GRAY_30,
        flexDirection: 'row'
    },
    modalButton: {
        paddingVertical: scale(20),
        width: '50%',
        alignItems: 'center'
    },
    modalLeftButton: {
        borderRightWidth: scale(1),
        borderRightColor: COLOR_GRAY_30,
    },
    modalCancelButtonText: {
        fontSize: scale(14),
        color: COLOR_GRAY_100
    },
    modalOKButtonText: {
        fontSize: scale(14),
        color: COLOR_PRIMARY
    },
    pinTextInput: {
        fontSize: scale(14),
        height: Platform.OS === 'ios' ? scale(24) : scale(40),
        width: scale(38),
    },
    pinTextInputWrapperIOS: {
        borderBottomColor: COLOR_PRIMARY,
        borderBottomWidth: scale(1)
    },
    list: {
        borderTopWidth: 0,
        marginBottom: scale(20),
        marginTop: scale(6)
    },
});

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
    fetchTvOptions: () => dispatch(tvOptionsActions.fetchTvOptions()),
    activateOption: (option) => dispatch(tvOptionsActions.activateTvOptions(option)),
    updateParentalControlAge: (age) => dispatch(tvOptionsActions.updateParentalControlAge(age)),
    updateParentalControlPin: (pin) => dispatch(tvOptionsActions.updateParentalControlPin(pin)),
    updateVODPurchaseCode: (code) => dispatch(tvOptionsActions.updateVODPurchaseCode(code)),
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
    return {
        loading: state.tvOptions.loading,
        offline: state.connectionInfo && state.connectionInfo.offline,
        error: state.tvOptions.error,
        parentalControlMinAgeRating: state.tvOptions && state.tvOptions.parentalControlMinAgeRating,
        parentalControlPinCode: state.tvOptions && state.tvOptions.parentalControlPinCode,
        vodPurchaseCode: state.tvOptions && state.tvOptions.vodPurchaseCode
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TvParametersConfiguration);


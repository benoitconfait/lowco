import React from 'react';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, RefreshControl, TouchableHighlight, Button } from 'react-native';
import { Dispatch } from 'redux';
import translate from '../../../../../lang/translate';
import { RootState } from '../../../../../reducers';
import Models = VOO.Mobile.App.Models;
import numeral from '../../../../../helpers/numberFormatter';
import { scale } from '../../../../../helpers/scaleHelper';
import Communications from 'react-native-communications';
import { COLOR_WHITE, COLOR_POSITIVE, COLOR_PRIMARY, COLOR_GRAY_30, COLOR_GRAY_40, COLOR_GRAY_70, COLOR_GRAY_100, COLOR_GRAY_20 } from '../../../../../styles/commonStyles';
import { fetchCustomerOptions, activateCustomerOptions } from '../../../../../actions/CustomerOptionsActions';
import * as mobileSubscriptionsActions from '../../../../../actions/MobileSubscriptionsActions';
import DropDown from '../../../../common/DropDown';
import { OptionActivationOrigins } from '../../../../../actionTypes/customerOptionsActionTypes';
import Modal from 'react-native-modal';
import { formatNumber } from 'libphonenumber-js';

type ConnectedState = {
    customerOptions: Models.OptionViewResource[];
    loading: boolean;
    mobileSubscriptions: Array<Models.MobileSubscription>;
    selectedMSISDN: number | null;
};

type ConnectedDispatch = {
    fetchOptions: () => void;
    activateOption: (option: Models.OptionViewResource) => void;
    fetchMobileSubscriptions: () => void;
    setSelectedMSISDN: (value) => void;
};

interface State {
    refreshing: boolean;
    modalVisible: boolean;
    selectedValue: number;
}

interface Props {
    fetchOptions: () => void;
    setLimitOption: (limitOption: any) => void;
    customerOptions: Models.OptionViewResource[];
    loading: boolean;
    limitOption: any;
    activateOption: (option: any) => void;
    fetchMobileSubscriptions: () => void;
    mobileSubscriptions: Array<Models.MobileSubscription>;
    selectedMSISDN: number | null;
    setSelectedMSISDN: (value) => void;
}

export class MobileFreeOptionsConfiguration extends React.Component<ConnectedState & ConnectedDispatch, State> {

    state: State;
    props: Props;

    getLimitOption(): any {
         const subscription = this.props.mobileSubscriptions[this.props.selectedMSISDN || 0];

        const result = subscription && this.props.customerOptions.filter((option: Models.OptionViewResource) => option.externalId === 'LIMIT' && option.phoneNumber === subscription.msisdn.toString());
        return result && result[0] ? result[0] : null;
    }

    constructor(props: Props) {
        super(props);
        // set initial state
        this.state = {
            refreshing: false,
            modalVisible: false,
            selectedValue: 50, // default value,
        };

        this.props = props;
    }

    selectLimitValue(value: number): void {
        this.setState({
            ... this.state,
            selectedValue: value
        });
    }

    componentDidMount() {

        this.props.fetchOptions();
        this.props.fetchMobileSubscriptions();
        const limit = this.getLimitOption();

        this.setState({
            ...this.state,
            selectedValue: limit != null ? limit.creditLimit : 50, // default value,
        });
    }

    toggleModal(): void {
        this.state.modalVisible ? this.setState({
            ...this.state,
            modalVisible: false
        }) : this.setState({
            ...this.state,
            modalVisible: true
        });
    }

    closeModal() {
        this.setState({ ...this.state, modalVisible: false });
    }

    validate(option: any): void {

        option = {
            ...option,
            mobileCreditLimit: this.state.selectedValue
        };

        this.props.activateOption(option);
        this.toggleModal();
    }
    cancel(): void {
        this.selectLimitValue(this.getLimitOption());
        this.toggleModal();
    }
    render() {
        const {
            loading,
            customerOptions,
            activateOption,
            selectedMSISDN,
            setSelectedMSISDN,
            mobileSubscriptions } = this.props;

        const msisdns = Object.keys(mobileSubscriptions).map((msisdn) => ({
            key: msisdn,
            value: formatNumber(`+${msisdn}`, 'National')
        }));
        const subscription = mobileSubscriptions[selectedMSISDN || 0];
        const limit = this.getLimitOption();

        return (
            <View style={styles.container}>
                {
                    (loading) ?
                        (
                            <ActivityIndicator
                                animating
                                style={[{ height: 80 }]}
                                size='large'
                            />
                        ) : null
                }
                <DropDown readOnly={Object.keys(mobileSubscriptions).length === 1} style={{ marginBottom: scale(25) }} defaultText={'Selectionner un plan mobile'} options={msisdns} selectedKey={subscription ? subscription.msisdn.toString() : null} onChange={setSelectedMSISDN} />
                {
                    (limit === null) ? null :
                        <View style={[styles.container]}>
                            <View style={[styles.limitSection]}>
                                <View style={[styles.lineTextWrapper]}>
                                    <View style={styles.lineTextLeft}>
                                        <Text style={[styles.limitSectionItemText, styles.limitOptionName]}>{limit.name} {limit.status === 'Inactive' ? '' : '-'} <Text style={styles.limitOptionPrice}>{limit.status === 'Inactive' ? '' : `${limit.creditLimit}€`}</Text></Text>
                                    </View>
                                    <View style={styles.lineTextRight}>
                                        <Text style={[styles.limitSectionItemText, styles.limitOptionStatus]}>{limit.status === 'Inactive' ? '' : translate('ACTIVE').toUpperCase()}</Text>
                                    </View>
                                </View>
                                <View style={[styles.lineTextWrapper]}>
                                    <View style={styles.lineTextLeft}>
                                        <Text style={[styles.limitSectionItemText, styles.limitOptionMessage, styles.limitOptionMessageLength, styles.remainingColor]}>{limit.description}</Text>
                                    </View>
                                    <View style={styles.lineTextRight}>
                                        <Text style={[styles.limitSectionItemText, styles.limitOptionMessage, styles.limitOptionStatusPrice]}>{translate('FREE')}</Text>
                                    </View>
                                </View>
                                <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => this.toggleModal()} style={[styles.button]}>
                                    <Text style={styles.buttonText}>Modifier mon plafond</Text>
                                </TouchableHighlight>
                            </View>

                            <Modal
                                isVisible={this.state.modalVisible}
                                onBackdropPress={() => this.closeModal()}>
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent}>
                                        <View style={styles.modalHeader}>
                                            <Text style={[styles.limitOptionsHeaderText1]}>Modifier mon plafond</Text>
                                            <Text style={[styles.limitOptionsHeaderText2]}>Sélectionnez votre montant hors-forfait autorisé</Text>
                                        </View>
                                        <View style={[styles.limitOptionSelectionSection]}>
                                            <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => this.selectLimitValue(0)} style={[styles.limitSelect, this.state.selectedValue === 0 ? styles.selected : styles.inactive]}>
                                                <Text style={[styles.limitSelectlabel, this.state.selectedValue === 0 ? styles.selectedLabel : styles.inactiveLabel]}>0€</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => this.selectLimitValue(10)} style={[styles.limitSelect, this.state.selectedValue === 10 ? styles.selected : styles.inactive]}>
                                                <Text style={[styles.limitSelectlabel, this.state.selectedValue === 10 ? styles.selectedLabel : styles.inactiveLabel]}>10€</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => this.selectLimitValue(20)} style={[styles.limitSelect, this.state.selectedValue === 20 ? styles.selected : styles.inactive]}>
                                                <Text style={[styles.limitSelectlabel, this.state.selectedValue === 20 ? styles.selectedLabel : styles.inactiveLabel]}>20€</Text>
                                            </TouchableHighlight>
                                        </View>
                                        <View style={[styles.limitOptionSelectionSection]}>
                                            <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => this.selectLimitValue(30)} style={[styles.limitSelect, this.state.selectedValue === 30 ? styles.selected : styles.inactive]}>
                                                <Text style={[styles.limitSelectlabel, this.state.selectedValue === 30 ? styles.selectedLabel : styles.inactiveLabel]}>30€</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => this.selectLimitValue(40)} style={[styles.limitSelect, this.state.selectedValue === 40 ? styles.selected : styles.inactive]}>
                                                <Text style={[styles.limitSelectlabel, this.state.selectedValue === 40 ? styles.selectedLabel : styles.inactiveLabel]}>40€</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => this.selectLimitValue(50)} style={[styles.limitSelect, this.state.selectedValue === 50 ? styles.selected : styles.inactive]}>
                                                <Text style={[styles.limitSelectlabel, this.state.selectedValue === 50 ? styles.selectedLabel : styles.inactiveLabel]}>50€</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                    <View style={styles.modalButtons}>
                                        <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => this.cancel()} style={[styles.modalButton, styles.modalLeftButton]}>
                                            <Text style={[styles.modalCancelButtonText]}>Annuler</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => this.validate(limit)} style={styles.modalButton}>
                                            <Text style={[styles.modalOKButtonText]}>Valider</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_GRAY_20
    },
    lineTextWrapper: {
        flexDirection: 'row',
    },
    lineTextLeft: {
        paddingRight: scale(10),
        justifyContent: 'flex-start',
        width: '70%'
    },
    lineTextRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '30%'
    },
    limitSection: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: scale(15),
        maxHeight: scale(160)
    },
    limitSectionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    limitSectionItemText: {
        marginHorizontal: scale(25),
        lineHeight: scale(20),
        fontFamily: 'Roboto-Regular'
    },
    limitOptionText: {
        marginTop: scale(10),
    },
    limitOptionName: {
        fontSize: scale(14),
        color: COLOR_GRAY_100
    },
    limitOptionPrice: {
        color: COLOR_PRIMARY
    },
    limitOptionStatus: {
        fontSize: scale(11),
        color: COLOR_POSITIVE
    },
    limitOptionMessage: {
        marginTop: scale(3),
        fontSize: scale(10.5),
        lineHeight: scale(17)
    },
    limitOptionMessageLength: {
        width: scale(200)
    },
    limitOptionStatusPrice: {
        fontFamily: 'Roboto-Regular',
        fontSize: scale(10),
        color: COLOR_GRAY_100
    },
    button: {
        backgroundColor: COLOR_PRIMARY,
        borderRadius: scale(4),
        maxHeight: scale(45),
        marginVertical: scale(22),
        marginHorizontal: scale(20),
        marginBottom: 0,
        padding: scale(15),
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff'
    },
    modalContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: scale(4)
    },
    modalContent: {
        paddingHorizontal: scale(10),
        paddingTop: scale(2),
        alignItems: 'center'
    },
    modalHeader: {
        paddingBottom: scale(11)
    },
    modalButtons: {
        marginTop: scale(23),
        borderTopWidth: scale(1),
        borderTopColor: COLOR_GRAY_30,
        flexDirection: 'row'
    },
    modalButton: {
        paddingVertical: scale(18),
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
    limitOptionsHeader: {
        paddingTop: scale(3),
        paddingBottom: scale(10)
    },
    limitOptionsHeaderText1: {
        lineHeight: scale(20),
        fontSize: scale(14),
        textAlign: 'center',
        marginTop: scale(25),
        marginBottom: scale(8),
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
        color: COLOR_GRAY_100
    },
    limitOptionsHeaderText2: {
        lineHeight: scale(20),
        fontSize: scale(14),
        textAlign: 'center',
        marginBottom: scale(10),
        fontFamily: 'Roboto-Regular',
        paddingHorizontal: scale(40),
        color: COLOR_GRAY_70
    },
    limitOptionSelectionSection: {
        paddingTop: 0,
        paddingHorizontal: scale(10),
        paddingBottom: scale(13),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    limitSelect: {
        backgroundColor: COLOR_WHITE,
        borderColor: COLOR_GRAY_40,
        height: scale(40),
        borderWidth: scale(1),
        borderRadius: 4,
        padding: scale(5),
        marginHorizontal: scale(7),
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 0,
    },
    inactive: {
        borderColor: COLOR_GRAY_40
    },
    inactiveLabel: {
        color: COLOR_GRAY_70
    },
    selected: {
        borderColor: COLOR_PRIMARY
    },
    selectedLabel: {
        color: COLOR_PRIMARY
    },
    limitSelectlabel: {
        fontFamily: 'Roboto-Medium',
        fontSize: scale(14)
    },
    limitOptionSelectionActions: {
        flex: 1,
        marginTop: scale(6),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    limitOptionSelectionActionButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderTopColor: COLOR_GRAY_40,
        borderTopWidth: scale(1)
    },
    cancelButtonText: {
        fontSize: scale(14),
        color: COLOR_GRAY_100
    },
    validateButtonText: {
        fontSize: scale(14),
        color: COLOR_PRIMARY
    },
    rightButton: {
        borderLeftColor: COLOR_GRAY_40,
        borderLeftWidth: scale(1),
        borderBottomRightRadius: 5
    },
    leftButton: {
        borderBottomLeftRadius: 5
    },
    remainingColor: {
        color: COLOR_GRAY_70
    },
    note: {
        paddingVertical: scale(15),
        paddingHorizontal: scale(20),
        fontSize: scale(10),
        lineHeight: scale(18),
        color: COLOR_GRAY_70
    }
});

const mapDispatchToProps = (dispatch: Dispatch<any>): ConnectedDispatch => ({
    fetchMobileSubscriptions: () => dispatch(mobileSubscriptionsActions.fetchMobileSubscriptions()),
    setSelectedMSISDN: (value) => dispatch(mobileSubscriptionsActions.setSelectedMSISDN(value)),
    fetchOptions: () => dispatch(fetchCustomerOptions()),
    activateOption: (option: any) => {
        option.status = 'Active';
        return dispatch(activateCustomerOptions(
            [option], OptionActivationOrigins.MobileFreeOptionsConfiguration));
    },
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
    return {
        loading: state.customer.loading || state.customerOptions.loading,
        customerOptions: (state.customerOptions && state.customerOptions.options) ? state.customerOptions.options : [],
        selectedMSISDN: state.mobileSubscriptions ? state.mobileSubscriptions.selectedMSISDN : null,
        mobileSubscriptions: state.mobileSubscriptions.mobileSubscriptions ?
            state.mobileSubscriptions.mobileSubscriptions : []
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileFreeOptionsConfiguration);

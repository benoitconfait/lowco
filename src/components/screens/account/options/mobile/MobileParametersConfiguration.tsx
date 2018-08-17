import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, RefreshControl, TouchableHighlight } from 'react-native';
import { Dispatch } from 'redux';
import translate from '../../../../../lang/translate';
import { RootState } from '../../../../../reducers';
import Models = Lowco.Models;
import { scale } from '../../../../../helpers/scaleHelper';
import Communications from 'react-native-communications';
import * as customerOptionsActions from '../../../../../actions/CustomerOptionsActions';
import OptionsSelector from '../OptionsSelector';
import { COLOR_GRAY_70 } from '../../../../../styles/commonStyles';
import { OptionActivationOrigins } from '../../../../../actionTypes/customerOptionsActionTypes';

type ConnectedState = {
    customerOptions: Models.OptionViewResource[];
    loading: boolean;
};

type ConnectedDispatch = {
    fetchOptions: () => void;
    activateOption: (option: Models.OptionViewResource) => void;
};

interface Props {
    fetchOptions: () => void;
    customerOptions: Models.OptionViewResource[];
    loading: boolean;
    activateOption: (option: Models.OptionViewResource) => void;
}

interface State {
    refreshing: boolean;
}

export class MobileParametersConfiguration extends React.Component<ConnectedState & ConnectedDispatch, State> {
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
            customerOptions,
            activateOption } = this.props;

        // const mobileOptions = customerOptions.filter(x => x.category.toString() === "Mobile" && x.activation.optionActivationAllowed && x.price === 0);
        return (
            <View style={styles.content}>
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
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                >
                    <Text style={[styles.note, { paddingTop: scale(20) }]}>Permet de configurer gratuitement le produit, ne change</Text>
                    <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => Communications.phonecall('0478505050', true)}>
                        <Text style={styles.note}>
                            pas l'abonnement. Si vous souhaitez désactiver une option, <Text style={{ textDecorationLine: 'underline' }}>appelez notre service client.</Text>
                        </Text>
                    </TouchableHighlight>
                    {/* <OptionsSelector hideOptionDescription={true} options={mobileOptions} onActivateOptions={activateOption} key={"option-selector"} /> */}
                </ScrollView>
            </View >
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
    fetchOptions: () => dispatch(customerOptionsActions.fetchCustomerOptions()),
        activateOption: (option: Models.OptionViewResource) => {
            option.status = Lowco.Domain.Views.Product.OptionStatus.Active;
            return dispatch(customerOptionsActions.activateCustomerOptions(
                [option], OptionActivationOrigins.MobileParametersOptionsConfiguration));
        },
});

const mapStateToProps = (state: RootState, ownProps: any): ConnectedState => {
    return {
        loading: state.customer.loading || state.internetUsage.loading,
        customerOptions: (state.customerOptions && state.customerOptions.options) ? state.customerOptions.options : []
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileParametersConfiguration);


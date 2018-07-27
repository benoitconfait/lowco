import React from 'react';
import { Text, View, Button, StyleSheet, TouchableHighlight } from 'react-native';
import Image from 'react-native-remote-svg';
import Modal from 'react-native-modal';
import { COLOR_GRAY_20, COLOR_GRAY_60, COLOR_PRIMARY } from '../../styles/commonStyles';
import { scale } from '../../helpers/scaleHelper';
import Icon = VOO.Mobile.App.Enums.Icon;
import IconImage from './IconImage';

interface Props {
    style?: any;
    options: any;
    selectedKey?: string | null,
    defaultText: string,
    readOnly?: boolean | null,
    onChange: (value: string) => void;
}

interface State {
    modalVisible: boolean
}

export default class DropDown extends React.Component<Props, State> {
    state: State;
    props: Props;

    constructor(props: Props) {
        super(props);
        this.state = {
            modalVisible: false
        };
        this.props = props;
    }

    openModal() {
        this.setState({ modalVisible: true });
    }

    onChange(value) {
        this.props.onChange(value);
        this.closeModal();
    }

    closeModal() {
        this.setState({ modalVisible: false });
    }

    render() {
        const { style } = this.props;

        if (!this.props.options || this.props.options.length === 0) {
            return null;
        }

        const selectedOption = this.props.options && this.props.options.length > 0 && this.props.selectedKey ?
            this.props.options.find((option) => option.key === this.props.selectedKey) : null;

        if (this.props.readOnly) {
            return (
                <Text style={[styles.buttonText, styles.readOnly]}>{selectedOption ? selectedOption.value : this.props.defaultText}</Text>
            );
        }
        return (
            <View style={[styles.container, style]}>
                <Modal
                    isVisible={this.state.modalVisible}
                    style={styles.bottomModal}
                    onBackdropPress={() => this.closeModal()}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                            {this.props.options.map((option) => (
                                <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" key={`dd-${option.key}`} style={[styles.button, styles.withBorderBottom, styles.fullWidth]} onPress={() => this.onChange(option.key)}>
                                    <View style={{ flexDirection: 'row' }}>
                                        {option.key === this.props.selectedKey ? <IconImage style={styles.checkMark} icon={Icon.CHECK_MARK} /> : <View style={styles.checkMarkSpace}></View>}
                                        <Text style={[styles.optionText]}>{option.value}</Text>
                                    </View>
                                </TouchableHighlight>
                            ))}
                        </View>
                    </View>
                </Modal>
                <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" style={[styles.selectorButton, styles.button]} onPress={() => this.openModal()}>
                    <View>
                        <Text style={styles.buttonText}>{selectedOption ? selectedOption.value : this.props.defaultText}</Text>
                        <IconImage style={styles.carrot} icon={Icon.LITTLE_ARROW_DOWN} />
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        marginTop: scale(10),
        marginHorizontal: scale(22)
    },
    modalContainer: {
        backgroundColor: 'grey',
    },
    innerContainer: {
        alignItems: 'center',
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
    },
    button: {
        backgroundColor: '#ffffff'
    },
    selectorButton: {
        borderRadius: scale(3),
        paddingVertical: scale(14),
        paddingHorizontal: scale(20)
    },
    buttonText: {
        fontFamily: 'Roboto-Medium',
        fontSize: scale(14),
        alignItems: 'center',
        color: '#000000',       
        textAlign: 'center'
    },
    optionText: {
        fontFamily: 'Roboto-Regular',
        fontSize: scale(14),
        alignItems: 'center',
        color: '#000000',
        width: '100%',
        textAlign: 'left'
    },
    checkMark: {
        marginRight: 7
    },
    checkMarkSpace: {
        width: 23
    },
    readOnly: {
        paddingTop: scale(12),
        paddingBottom: scale(5),
    },
    withBorderBottom: {
        borderBottomWidth: scale(1),
        borderBottomColor: COLOR_GRAY_20
    },
    fullWidth: {
        width: '100%',
        paddingVertical: scale(12),
        paddingHorizontal: scale(20)
    },
    carrot: {
        position: 'absolute',
        right: scale(-7),
        top: scale(5),
        width: scale(7.5),
        height: scale(7.5)
    }
});

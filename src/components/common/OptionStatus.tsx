import React from 'react';
import { StyleSheet, View, Text, Button, TouchableHighlight, Alert } from 'react-native';
import { COLOR_ERROR, COLOR_GRAY_20, COLOR_GRAY_30, COLOR_GRAY_70, COLOR_GRAY_80, COLOR_GRAY_100, COLOR_WARNING, COLOR_POSITIVE, COLOR_PRIMARY } from '../../styles/commonStyles';
import IconImage from './IconImage';
import LineColumnType = VOO.Mobile.App.Enums.LineColumnType;
import Icon = VOO.Mobile.App.Enums.Icon;
import { scale } from '../../helpers/scaleHelper';
import numeral from '../../helpers/numberFormatter';
import translate from '../../lang/translate';
import Modal from 'react-native-modal';
import Models = Lowco.Models;

interface Props {
  onActivateOption: (option: Models.OptionViewResource) => void;
  option: any;
}

interface State {
  modalVisible: boolean
}

export default class OptionStatus extends React.Component<Props, State> {
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

  closeModal() {
    this.setState({ modalVisible: false });
  }

  activateOption() {
    if (this.props.option && this.props.option.key) {
      const activeOption = {
        ...this.props.option,
        status: 'Active'
      };
      this.props.onActivateOption(activeOption);
    }
    this.closeModal();
  }

  renderActivateButton(option) {

    return (
      <View>
        <Modal
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{this.props.option && this.props.option.name ? this.props.option.name : 'Confirmation'}</Text>
              <Text style={styles.modalDescription}>Êtes-vous certain de vouloir activer cette option ? Vous ne pourrez pas la désactiver à partir de cette application.</Text>
            </View>
            <View style={styles.modalButtons}>
              <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => this.closeModal()} style={[styles.modalButton, styles.modalLeftButton]}>
                <Text style={styles.modalCancelButtonText}>Annuler</Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => this.activateOption()} style={styles.modalButton}>
                <Text style={styles.modalOKButtonText}>Confirmer</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" style={[styles.selectableOption, option.price && option.price > 0 ? { width: scale(78) } : { width: scale(68) }]} onPress={() => this.openModal()}>
          <Text style={styles.selectableOptionText}>{option.price && option.price > 0 ? `${numeral(option.price).format()}€ /mois` : 'ACTIVER'}</Text>
        </TouchableHighlight>
      </View>
    );
  }

  renderStatusLabel(status) {
    const baseStatusStyle = {
      paddingTop: scale(2), letterSpacing: scale(1), marginRight: scale(-2)
    };
    const statusStyle = {
      'PendingActive': { ...baseStatusStyle, color: COLOR_WARNING },
      'Active': { ...baseStatusStyle, color: COLOR_POSITIVE }
    };

    return (
      <Text style={[styles.lineSmall, statusStyle[status]]}>{translate(status.toUpperCase())}</Text>
    );
  }

  render() {
    const { option } = this.props;

    if (option.status === 'Inactive') {
      return this.renderActivateButton(option);
    }
    return this.renderStatusLabel(option.status);
  }
}

const styles = StyleSheet.create({
  lineTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  lineTextLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    width: '70%'
  },
  lineTextRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '30%'
  },
  lineText: {
    fontFamily: 'Roboto-Regular',
    fontSize: scale(14),
  },
  header: {
    fontFamily: 'Roboto-Regular',
    fontSize: scale(16),
  },
  lineWithBorderBottom: {
    borderBottomWidth: scale(1),
    borderBottomColor: COLOR_GRAY_20
  },
  lineSmall: {
    fontSize: scale(11),
  },
  lineSmallBold: {
    fontWeight: 'bold',
    fontSize: scale(11)
  },
  lineSmallWithIcon: {
    marginRight: scale(5)
  },
  activated: {
    color: COLOR_POSITIVE
  },
  activation: {
    color: '#ccc'
  },
  remainingColor: {
    color: COLOR_GRAY_70
  },
  warningColor: {
    color: COLOR_ERROR
  },
  selectableOption: {
    paddingVertical: scale(5),
    borderRadius: scale(60),
    backgroundColor: COLOR_PRIMARY
  },
  selectableOptionText: {
    fontFamily: 'Roboto-Regular',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scale(10),
    textAlign: 'center'
  },
  modalContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: scale(4)
  },
  modalContent: {
    paddingVertical: scale(25),
    paddingHorizontal: scale(10),
    alignItems: 'center'
  },
  modalTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: scale(15),
    marginBottom: scale(11),
    color: COLOR_GRAY_100
  },
  modalDescription: {
    fontSize: scale(13.5),
    textAlign: 'center',
    lineHeight: scale(22),
    color: COLOR_GRAY_80
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
});

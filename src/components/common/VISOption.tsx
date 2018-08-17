import React from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';
import { COLOR_WHITE, COLOR_ERROR, COLOR_WARNING, COLOR_GRAY_20, COLOR_GRAY_40, COLOR_GRAY_70, COLOR_GRAY_100, COLOR_POSITIVE, COLOR_PRIMARY } from '../../styles/commonStyles';
import IconImage from './IconImage';
import Icon = VOO.Mobile.App.Enums.Icon;
import LineColumnType = VOO.Mobile.App.Enums.LineColumnType;
import DropDown from '../common/DropDown';
import Section from '../common/Section';
import OptionStatus from './OptionStatus';
import { scale } from '../../helpers/scaleHelper';
import numeral from '../../helpers/numberFormatter';
import translate from '../../lang/translate';
import Models = Lowco.Models;

interface Props {
  style?: any,
  hideDescription?: boolean,
  visOptions: any[],
  onActivateOption: (option: Models.OptionViewResource) => void
}

interface State {
  selectedOption: string | null
}

export default class VISOption extends React.Component<Props, State> {
  state: State;
  props: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedOption: 'VOOSEC01'
    };
    this.props = props;
  }

  setSelectedOption(key) {
    this.setState({
      selectedOption: key
    });
  }

  renderPromo = (promo) => {
    if (promo) {
      return (
        <View style={styles.promoWrapper}>
          <View style={styles.promoLabel}>
            <Text style={styles.promoLabelText}>PROMO</Text>
          </View>
          <Text style={styles.promoText}>{translate(promo.id)}</Text>
        </View>
      );
    }

    return null;
  }

  getPrice = (option) => {
    return option.price && option.price > 0 ? `${numeral(option.price).format()}€ /${translate('MONTH')}` : '';
  }

  renderButton(onActivateOption, option, visOptions) {
    const toActivateOption = option.externalId === 'VOOSEC01' ?
      visOptions.find(option => option.externalId === 'VOOSEC02') :
      visOptions.find(option => option.externalId === 'VOOSEC01');

    return (
      <View style={{ paddingHorizontal: scale(7) }}>
        <Text style={styles.activatedText}>{translate(option.externalId === 'VOOSEC01' ? 'SIX_ACTIVATED_DEVICES' : 'TWELVE_ACTIVATED_DEVICES')}</Text>
        <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" onPress={() => onActivateOption(toActivateOption)} style={[styles.button]}>
          <Text style={styles.buttonText}>{translate(toActivateOption.externalId === 'VOOSEC02' ? 'ADD_6_DEVICES' : 'REMOVE_6_DEVICES') + ' (' + this.getPrice(toActivateOption) + ')'}</Text>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    const {
      style,
      hideDescription,
      visOptions,
      onActivateOption } = this.props;

    if (!visOptions || visOptions.length === 0) {
      return null;
    }

    const dropdownOptions = visOptions.sort((optionA, optionB) => optionA.priority - optionB.priority).map(option =>
      ({
        key: option.externalId,
        value: `${translate(`OPTIONS_PAGE_DROPDOWN_${option.externalId}`)} (${this.getPrice(option)})`
      })
    );

    // find active option or default to VOOSEC01
    const option = visOptions.find(option => option.status === 'Active') ||
      visOptions.find(option => option.externalId === this.state.selectedOption) ||
      visOptions[0];

    const activeOption = option.status === 'Active' ? option : null;
    const promo = option && option.promos && option.promos.length > 0 && option.promos[0];

    return (
      <Section style={[style]}
        key={`option-selector-vis`}
      >
        <View style={[styles.lineTextWrapper]}>
          <View style={styles.lineTextLeft}>
            <Text style={styles.header}>{translate('VOOSEC_NAME')}</Text>
            {option.status !== 'Active' ? this.renderPromo(promo) : null}
          </View>
          <View style={styles.lineTextRight}>
            <OptionStatus onActivateOption={onActivateOption} option={option} />
          </View>
        </View>
        {hideDescription ? null :
          <View style={[styles.lineTextWrapper, { paddingTop: scale(3)}]}>
            <View style={styles.lineTextLeft}>
              <Text style={[styles.description, styles.lineSmall, styles.remainingColor]}>{option.description}</Text>
            </View>
            <View style={styles.lineTextRight}>
              <Text style={[styles.lineSmall, styles.description]}>{option.status !== 'Inactive' ? this.getPrice(option) : ''}</Text>
            </View>
          </View>}
        {option.status === 'Inactive' ?
          <DropDown style={{ marginHorizontal: scale(7), borderWidth: scale(1), borderColor: COLOR_GRAY_40, borderRadius: scale(4) }} defaultText={''}
            options={dropdownOptions} selectedKey={this.state.selectedOption} onChange={this.setSelectedOption.bind(this)} /> : null}
        {option.status === 'Active' ? this.renderButton(onActivateOption, option, visOptions) : null}
      </Section>
    );
  }
}

const styles = StyleSheet.create({
  promoWrapper: {
    flexDirection: 'row',
    marginTop: scale(2),
    marginBottom: scale(10)
  },
  promoLabel: {
    borderRadius: scale(2),
    backgroundColor: COLOR_WARNING,
    paddingVertical: scale(1),
    paddingHorizontal: scale(3),
    marginRight: scale(4)
  },
  promoLabelText: {
    color: COLOR_WHITE,
    fontFamily: 'MuseoSansRounded-700',
    fontSize: scale(8),
  },
  promoText: {
    color: COLOR_WARNING,
    fontSize: scale(10),
    lineHeight: scale(11)
  },
  lineTextWrapper: {
    flexDirection: 'row',
    paddingHorizontal: scale(7)
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
  lineText: {
    fontFamily: 'Roboto-Regular',
    fontSize: scale(14),
  },
  header: {
    fontFamily: 'Roboto-Regular',
    fontSize: scale(14),
    color: COLOR_GRAY_100
  },
  lineWithBorderBottom: {
    borderBottomWidth: scale(1),
    borderBottomColor: COLOR_GRAY_20
  },
  lineSmall: {
    fontFamily: 'Roboto-Regular',
    fontSize: scale(10),
    color: COLOR_GRAY_100
  },
  description: {
    lineHeight: scale(17)
  },
  lineSmallBold: {
    fontWeight: 'bold',
    fontSize: scale(10)
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
    width: 90,
    height: 35,
    borderRadius: scale(60),
    backgroundColor: COLOR_PRIMARY
  },
  selectableOptionText: {
    fontFamily: 'Roboto-Regular',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: scale(10),
    textAlign: 'center',
    paddingTop: scale(5)
  },
  modalContainer: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center'
  },
  activatedText: {
    fontSize: scale(12),
    paddingTop: scale(7),
    color: COLOR_POSITIVE
  },
  button: {
    backgroundColor: COLOR_PRIMARY,
    borderRadius: scale(4),
    maxHeight: scale(45),
    marginVertical: scale(12),
    marginBottom: 0,
    paddingVertical: scale(15),
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff'
  }
});
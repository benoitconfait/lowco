import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { COLOR_WHITE, COLOR_ERROR, COLOR_WARNING, COLOR_GRAY_20, COLOR_GRAY_70, COLOR_GRAY_100, COLOR_POSITIVE, COLOR_PRIMARY } from '../../styles/commonStyles';
import IconImage from './IconImage';
import Icon = VOO.Mobile.App.Enums.Icon;
import LineColumnType = VOO.Mobile.App.Enums.LineColumnType;
import OptionStatus from './OptionStatus';
import { scale } from '../../helpers/scaleHelper';
import numeral from '../../helpers/numberFormatter';
import translate from '../../lang/translate';
import Models = Lowco.Models;

interface Props {
  hideDescription?: boolean,
  option: any,
  onActivateOption: (option: Models.OptionViewResource) => void
}

function Option({
  hideDescription,
  option,
  onActivateOption }: Props) {

  const renderPromo = (promo) => {
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
  };

  const getPrice = (option) => {
    if (option.status !== 'Inactive') {
      return option.price && option.price > 0 ? `${numeral(option.price).format()}€ /mois` : 'Gratuit';
    }
    return '';
  };

  const promo = option && option.promos && option.promos.length > 0 && option.promos[0];

  return (
    <View style={styles.optionWrapper}>
      <View style={[styles.lineTextWrapper]}>
        <View style={styles.lineTextLeft}>
          <Text style={styles.header}>{option.name}</Text>
          {option.status === 'Inactive' ? renderPromo(promo) : null}
          {hideDescription ? null :
            <Text style={[styles.description, styles.lineSmall, styles.remainingColor]}>{option.description}</Text>}
        </View>
        <View style={styles.lineTextRight}>
            <OptionStatus onActivateOption={onActivateOption} option={option} />
            {hideDescription ? null :
              <Text style={[styles.lineSmall, styles.description]}>{getPrice(option)}</Text>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  optionWrapper: {
    paddingHorizontal: scale(7)
  },
  promoWrapper: {
    flexDirection: 'row',
    marginTop: scale(2),
    marginBottom: scale(1)
  },
  promoLabel: {
    borderRadius: scale(2),
    backgroundColor: COLOR_WARNING,
    paddingVertical: scale(1),
    paddingHorizontal: scale(4),
    marginRight: scale(4),
    height: scale(12)
  },
  promoLabelText: {
    color: COLOR_WHITE,
    fontFamily: 'MuseoSansRounded-700',
    fontSize: scale(8),
  },
  promoText: {
    color: COLOR_WARNING,
    fontSize: scale(10),
    lineHeight: scale(11),
    width: '70%'
  },
  lineTextWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: scale(3)
  },
  lineTextLeft: {
    paddingRight: scale(10),
    justifyContent: 'flex-start',
    width: '68.5%'
  },
  lineTextRight: {
    flexDirection: 'column',
    alignItems: 'flex-end'
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
    paddingTop: scale(4),
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
  }
});


export default Option;
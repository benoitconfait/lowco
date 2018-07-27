import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLOR_POSITIVE, COLOR_WARNING, COLOR_ERROR, COLOR_GRAY_20, COLOR_GRAY_70, COLOR_GRAY_100 } from '../../styles/commonStyles';
import IconImage from './IconImage';
import LineColumnType = VOO.Mobile.App.Enums.LineColumnType;
import Icon = VOO.Mobile.App.Enums.Icon;
import IconSize = VOO.Mobile.App.Enums.IconSize;
import { scale } from '../../helpers/scaleHelper';

interface Props {
  style?: any,
  column1Icon?: Icon | null,
  column1Text?: string | null,
  column1Type?: LineColumnType | null,
  column1Text2?: string | null,
  column1Text2Type?: LineColumnType | null,
  column2Icon?: Icon | null,
  column2Text?: string | null,
  column2Type?: LineColumnType | null
  column2Text2?: string | null,
  column2Text2Type?: LineColumnType | null,
}

const getStylesForType = (columnType?: LineColumnType | null): Array<Object> => {
  const {
    lineUsage,
    lineText,
    lineMedium,
    lineSmall,
    lettersSpaced,
    positiveColor,
    warningColor,
    errorColor,
    headerStyle,
    headerBoldStyle,
    headerErrorStyle,
    remainingColor
  } = styles;
  switch (columnType) {
    case LineColumnType.Positive:
      return [lineSmall, positiveColor];
    case LineColumnType.PositiveSpaced:
      return [lineSmall, positiveColor, lettersSpaced];
    case LineColumnType.Warning:
      return [lineSmall, warningColor];
    case LineColumnType.WarningSpaced:
      return [lineSmall, warningColor, lettersSpaced];
    case LineColumnType.Error:
      return [lineSmall, errorColor];
    case LineColumnType.ErrorSpaced:
      return [lineSmall, errorColor, lettersSpaced];
    case LineColumnType.Header:
      return [lineSmall, headerStyle];
    case LineColumnType.HeaderBold:
      return [lineSmall, headerStyle, headerBoldStyle];
    case LineColumnType.HeaderError:
      return [lineSmall, headerErrorStyle];
    case LineColumnType.Usage:
      return [lineUsage];
    case LineColumnType.UsageError:
      return [lineUsage, errorColor];
    case LineColumnType.Medium:
      return [lineMedium];
    case LineColumnType.MediumInfo:
      return [lineMedium, remainingColor];
    case LineColumnType.MediumInfoSpaced:
      return [lineMedium, remainingColor, lettersSpaced];
    case LineColumnType.MediumErrorSpaced:
      return [lineMedium, errorColor, lettersSpaced];
    case LineColumnType.Info:
      return [lineSmall, remainingColor];
    case LineColumnType.InfoSpaced:
      return [lineSmall, remainingColor, lettersSpaced];
    default:
      return [lineText];
  };
}

function TwoColumnLine({ style,
  column1Icon, column1Text, column1Type, column1Text2, column1Text2Type,
  column2Icon, column2Text, column2Type, column2Text2, column2Text2Type }: Props) {
  const {
    lineTextWrapper,
    lineTextLeft,
    lineTextRight
  } = styles;


  return (
    <View style={[lineTextWrapper, style]}>
      <View style={lineTextLeft}>
        {column1Icon ? <IconImage style={{ marginRight: 5 }} icon={column1Icon} /> : null}
        {column1Text && column1Text.length > 0 ?
          <Text style={getStylesForType(column1Type)}>{column1Text}</Text> : null}
        {column1Text2 && column1Text2.length > 0 ?
          <Text style={getStylesForType(column1Text2Type)}>{column1Text2}</Text> : null}
      </View>
      <View style={lineTextRight}>
        {column2Text && column2Text.length > 0 ?
          <Text style={[getStylesForType(column2Type), { textAlign: 'right' }]}>{column2Text}</Text> : null}
        {column2Text2 && column2Text2.length > 0 ?
          <Text style={[getStylesForType(column2Text2Type), { textAlign: 'right' }]}>{column2Text2}</Text> : null}
        {column2Icon ? <IconImage color={column2Type === LineColumnType.Error ? COLOR_ERROR : null} style={{ marginLeft: scale(5) }} size={IconSize.SMALL} icon={column2Icon} /> : null}
      </View>
    </View>
  );
};

export default TwoColumnLine;

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
    width: '67%'
  },
  lineTextRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  lineText: {
    fontFamily: 'Roboto-Regular',
    fontSize: scale(14),
  },
  lineUsage: {
    fontFamily: 'Roboto-Regular',
    fontSize: scale(12),
  },
  lineWithBorderBottom: {
    borderBottomWidth: scale(1),
    borderBottomColor: COLOR_GRAY_20
  },
  lineSmall: {
    fontFamily: 'Roboto-Regular',
    fontSize: scale(10),
  },
  lettersSpaced: {
    letterSpacing: scale(1)
  },
  lineMedium: {
    fontFamily: 'Roboto-Regular',
    fontSize: scale(11)
  },
  lineSmallWithIcon: {
    marginRight: scale(5)
  },
  headerStyle: {
    fontFamily: 'Roboto-Medium',
    letterSpacing: scale(1),
    color: COLOR_GRAY_100
  },
  headerBoldStyle: {
    fontSize: scale(11)
  },
  headerErrorStyle: {
    fontFamily: 'Roboto-Regular',
    letterSpacing: scale(1),
    color: COLOR_ERROR,
    fontSize: scale(11)
  },
  remainingColor: {
    color: COLOR_GRAY_70
  },
  positiveColor: {
    color: COLOR_POSITIVE
  },
  warningColor: {
    color: COLOR_WARNING
  },
  errorColor: {
    color: COLOR_ERROR
  },
  lineProgressBar: {
    width: '100%',
    borderWidth: 0,
    borderRadius: scale(4),
    height: scale(6)
  }
});

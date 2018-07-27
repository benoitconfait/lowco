import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { COLOR_WARNING, COLOR_GRAY_20, COLOR_GRAY_60 } from '../../styles/commonStyles';
import TwoColumnLine from './TwoColumnLine';
import IconImage from './IconImage';
import Icon = VOO.Mobile.App.Enums.Icon;
import IconSize = VOO.Mobile.App.Enums.IconSize;
import LineColumnType = VOO.Mobile.App.Enums.LineColumnType;
import { scale } from '../../helpers/scaleHelper';

interface Props {
  icon?: Icon | null,
  iconSize?: IconSize,
  line1Column1Text?: string | null,
  line1Column1Type?: LineColumnType | null,
  line1Column1Text2?: string | null,
  line1Column1Text2Type?: LineColumnType | null,
  line1Column2Text?: string | null,
  line1Column2Type?: LineColumnType | null,
  line1Column2Text2?: string | null,
  line1Column2Text2Type?: LineColumnType | null,
  line2Column1Text?: string | null,
  line2Column1Type?: LineColumnType | null,
  line2Column2Text?: string | null,
  line2Column2Type?: LineColumnType | null
}

function TwoLines({
  icon,
  iconSize,
  line1Column1Text,
  line1Column1Type,
  line1Column1Text2,
  line1Column1Text2Type,
  line1Column2Text,
  line1Column2Type,
  line1Column2Text2,
  line1Column2Text2Type,
  line2Column1Text,
  line2Column1Type,
  line2Column2Text,
  line2Column2Type }: Props) {

  const { containerStyle } = styles;
  const width = icon ? '90.5%' : '100%';

  let iconStyle: any = { marginRight: 5};

if (iconSize === IconSize.BIG) {
  iconStyle = {
    marginTop: 5,
    marginRight: 12
  };
}

return (
  <View style={containerStyle}>
    {icon ? <IconImage style={iconStyle} size={iconSize} icon={icon} /> : null}
    <View style={{ width: width }}>
      <TwoColumnLine
        style={{ paddingBottom: 6 }}
        column1Icon={null}
        column1Text={line1Column1Text}
        column1Type={line1Column1Type}
        column1Text2={line1Column1Text2}
        column1Text2Type={line1Column1Text2Type}
        column2Icon={null}
        column2Text={line1Column2Text}
        column2Type={line1Column2Type}
        column2Text2={line1Column2Text2}
        column2Text2Type={line1Column2Text2Type}
      />
      <TwoColumnLine
        style={null}
        column1Icon={null}
        column1Text={line2Column1Text}
        column1Type={line2Column1Type}
        column2Icon={null}
        column2Text={line2Column2Text}
        column2Type={line2Column2Type}
      />
    </View>
  </View>
);
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    marginBottom: scale(-1)
  }
});

export default TwoLines;
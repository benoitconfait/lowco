import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLOR_GRAY_30 } from '../../styles/commonStyles';
import { scale } from '../../helpers/scaleHelper';

interface Props {
    children: object;
    style?: any;
    noBorderBottom?: boolean;
}

function Section({ children, style, noBorderBottom }: Props) {
    const { container, borderBottom } = styles;

    return (
        <View style={[container, noBorderBottom ? null : borderBottom, style]}>
            {children}
        </View>
        );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingVertical: scale(17),
        paddingHorizontal: scale(12)
    },
    borderBottom: {
        borderBottomWidth: scale(1),
        borderBottomColor: COLOR_GRAY_30
  }
});

export default Section;

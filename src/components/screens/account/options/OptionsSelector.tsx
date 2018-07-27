import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card } from '../../../common/card';
import TextHeader from '../../../common/TextHeader';
import Section from '../../../common/Section';
import Option from '../../../common/Option';
import ProgressBar from '../../../common/ProgressBar';
import translate from '../../../../lang/translate';
import LineColumnType = VOO.Mobile.App.Enums.LineColumnType;
import { scale } from '../../../../helpers/scaleHelper';
import numeral from '../../../../helpers/numberFormatter';
import moment from 'moment';
import { formatSeconds } from '../../../../helpers/momentFormatter';
import { COLOR_GRAY_20, COLOR_GRAY_40, COLOR_GRAY_100 } from '../../../../styles/commonStyles';
import Icon = VOO.Mobile.App.Enums.Icon;
import Models = VOO.Mobile.App.Models;

interface Props {
    hideOptionDescription?: boolean,
    options: any,
    onActivateOptions: (option: Models.OptionViewResource) => void
}

function OptionsSelector({ hideOptionDescription, options, onActivateOptions }: Props) {
    return (
        <View style={styles.content}>
            {options && options.length > 0 && options.sort((optionA, optionB) => optionA.priority - optionB.priority).map((option, index) =>
                <Section
                    key={`option-selector-${index}`}
                    style={{ paddingVertical: scale(11.2), borderBottomColor: COLOR_GRAY_20 }}
                >
                    <Option
                        hideDescription={hideOptionDescription}
                        option={option}
                        onActivateOption={onActivateOptions}
                        key={`option-lines-${index}`}
                    />
                </Section>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        marginTop: scale(15),
        marginBottom: scale(20),
    },
    lineTextWrapper: {
        flexDirection: 'row',
    },
    lineTextLeft: {
        paddingRight: scale(10),
        justifyContent: 'flex-start',
        width: '70%'
    },
    header: {
        fontFamily: 'Roboto-Regular',
        fontSize: scale(15),
        color: COLOR_GRAY_100
    },
});

export default OptionsSelector;

import React from 'react';
import SmallLabelValue from '../../common/SmallLabelValue';
import moment from 'moment';
import translate from '../../../lang/translate';
import SafariView from 'react-native-safari-view';
import { scale } from '../../../helpers/scaleHelper';
import {
    StyleSheet,
    Platform,
    Linking,
    TouchableHighlight,
    Text
} from 'react-native';
import { COLOR_GRAY_60 } from '../../../styles/commonStyles';

interface Props {
    style?: any;
}

function TermsConditionsPrivacyLink({ style }: Props) {
    const openURL = url => {
        // Use SafariView on iOS
        if (Platform.OS === 'ios') {
            SafariView.show({
                url: url,
                fromBottom: true
            });
        } else {
            // Or Linking.openURL on Android
            Linking.openURL(url);
        }
    }

    return (
        <TouchableHighlight underlayColor="rgba(212,0,122,0.1)" style={[styles.linkButton, style]} onPress={() => openURL('http://www.voo.be/fr/conditions-generales/')}>
            <Text style={styles.linkText}>{translate('TERMS_CONDITIONS_PRIVACY')}</Text>
        </TouchableHighlight>
    );
};


const styles = StyleSheet.create({
    linkButton: {
        alignSelf: 'center',
        borderBottomWidth: scale(1),
        borderBottomColor: COLOR_GRAY_60
    },
    linkText: {
        fontFamily: 'Roboto-Regular',
        fontSize: scale(10),
        color: COLOR_GRAY_60
    }
  });

export default TermsConditionsPrivacyLink;

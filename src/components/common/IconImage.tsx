import React from 'react';
import { StyleSheet } from 'react-native';
import Image from 'react-native-remote-svg';
import Icon = VOO.Mobile.App.Enums.Icon;
import IconSize = VOO.Mobile.App.Enums.IconSize;
import {
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    Download,
    Exclamation,
    CircledExclamation,
    SadFace,
    SmileyFace,
    SpeechBubble,
    Voo,
    WorldGlobe,
    CheckMark,
    Euro,
    Fixe,
    List,
    Hamburger,
    Phone,
    Smartphone,
    Sms,
    Net,
    DownloadInvoice,
    User
} from '../common/icons';
import { scale } from '../../helpers/scaleHelper';

interface Props {
    icon: Icon;
    size?: IconSize;
    style?: any;
    color?: string | null;
}

const iconImage = {
    [Icon.ARROW_LEFT]: ArrowLeft,
    [Icon.ARROW_RIGHT]: ArrowRight,
    [Icon.LITTLE_ARROW_DOWN]: ArrowDown,
    [Icon.DOWNLOAD]: Download,
    [Icon.FACE_SAD]: SadFace,
    [Icon.FACE_SMILE]: SmileyFace,
    [Icon.HAMBURGER]: Hamburger,
    [Icon.SPEECH_BUBBLE]: SpeechBubble,
    [Icon.VOO_CIRCLED]: Voo,
    [Icon.WORLD_GLOBE]: WorldGlobe,
    [Icon.EXCLAMATION]: Exclamation,
    [Icon.EXCLAMATION_CIRCLED]: CircledExclamation,
    [Icon.CHECK_MARK]: CheckMark,
    [Icon.EURO]: Euro,
    [Icon.FIXE]: Fixe,
    [Icon.LIST]: List,
    [Icon.PHONE]: Phone,
    [Icon.SMARTPHONE]: Smartphone,
    [Icon.SMS]: Sms,
    [Icon.NET]: Net,
    [Icon.DOWNLOAD_INVOICE]: DownloadInvoice,
    [Icon.USER]: User,
};

function IconImage({ icon, size, style, color }: Props) {
    const SvgIcon = iconImage[icon];
    let iconStyle = styles.icon;

    if (size) {
        switch (size) {
            case IconSize.XSMALL:
                iconStyle = styles.xsmallIcon;
                break;
            case IconSize.SMALL:
                iconStyle = styles.smallIcon;
                break;
            case IconSize.BIG:
                iconStyle = styles.bigIcon;
                break;
                case IconSize.GIANT:
                iconStyle = styles.giantIcon;
                break;
        }
    }

    if (SvgIcon) {
        return (
            <SvgIcon color={color} style={[iconStyle, style]} />
        );
    }
    return null;
};

const styles = StyleSheet.create({
    icon: {
        height: scale(16),
        width: scale(16)
    },
    xsmallIcon: {
        height: scale(10),
        width: scale(10)        
    },
    smallIcon: {
        height: scale(14),
        width: scale(14)
    },
    bigIcon: {
        height: scale(20),
        width: scale(20)
    },
    giantIcon: {
        height: scale(60),
        width: scale(60)
    }
});

export default IconImage;

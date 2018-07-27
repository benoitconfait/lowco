import React from 'react';
import Svg, {
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg';
import { COLOR_PRIMARY } from '../../../styles/commonStyles';

interface Props {
    style: any,
    color?: string | null
}

function PhoneIcon({ style, color }: Props) {
    return (
        <Svg style={style} viewBox="-5 -5 122.1 122.8">
            <G id="phone">
                <Path fill="none" stroke={color || COLOR_PRIMARY} strokeWidth={10} strokeLinejoin="round" strokeMiterlimit={10} class="st0" d="M88.4,69.6c0,0-8.2,5.6-12.2,8c-4,2.3-6.4,0.6-9.1-2.1c-0.6-0.6-2.1-2.1-3.9-3.9c0,0-11.2-11.2-17.5-17.5c-1.8-1.8-3.3-3.3-3.9-3.9c-2.7-2.8-4.4-5.1-2.1-9.1c2.3-4,8-12.2,8-12.2L24.4,5.6c0,0-4.7,4.7-12.6,12.6c-7.9,7.9-8.1,21,2.4,31.5c10.5,10.5,14.1,14.1,14.1,14.1l3.9,3.9l17.5,17.5l3.9,3.9c0,0,3.6,3.6,14.1,14.1c10.5,10.5,23.6,10.3,31.5,2.4c7.9-7.9,12.6-12.6,12.6-12.6L88.4,69.6z"/>
            </G>
        </Svg>
    );
};
export default PhoneIcon;

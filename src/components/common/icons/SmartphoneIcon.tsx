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
        <Svg style={style} viewBox="0 0 60 60">
            <G id="mobile_tablet">
                <Path fill={color || COLOR_PRIMARY} d="M43.67,5.5H16.33a4.84,4.84,0,0,0-4.83,4.83V49.67a4.84,4.84,0,0,0,4.83,4.83H43.67a4.84,4.84,0,0,0,4.83-4.83V10.33A4.84,4.84,0,0,0,43.67,5.5Zm.83,44.17a.85.85,0,0,1-.83.83H16.33a.85.85,0,0,1-.83-.83V10.33a.85.85,0,0,1,.83-.83H43.67a.85.85,0,0,1,.83.83Z" />
                <Circle fill={color || COLOR_PRIMARY} cx="30" cy="45.4" r="1.6" />
            </G>
        </Svg>
    );
};
export default PhoneIcon;

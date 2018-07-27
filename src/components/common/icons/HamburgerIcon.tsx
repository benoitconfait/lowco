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

function HamburgerIcon({ style, color }: Props) {
    return (
        <Svg style={style} viewBox="0 0 56.7 56.7">
            <G id="hamburger">
                <Path fill={color || COLOR_PRIMARY} d="M52.3,31.7H5.5c-1.8,0-3.3-1.5-3.3-3.3l0,0c0-1.8,1.5-3.3,3.3-3.3h46.8c1.8,0,3.3,1.5,3.3,3.3l0,0C55.6,30.2,54.1,31.7,52.3,31.7z" />
                <Path fill={color || COLOR_PRIMARY} d="M52.3,47.1H5.5c-1.8,0-3.3-1.5-3.3-3.3l0,0c0-1.8,1.5-3.3,3.3-3.3h46.8c1.8,0,3.3,1.5,3.3,3.3l0,0C55.6,45.6,54.1,47.1,52.3,47.1z" />
                <Path fill={color || COLOR_PRIMARY} d="M52.3,16.8H5.5c-1.8,0-3.3-1.5-3.3-3.3l0,0c0-1.8,1.5-3.3,3.3-3.3h46.8c1.8,0,3.3,1.5,3.3,3.3l0,0C55.6,15.3,54.1,16.8,52.3,16.8z" />
            </G>
        </Svg>
    );
};
export default HamburgerIcon;

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

function ArrowRightIcon({ style, color }: Props) {
    return (
        <Svg style={style} viewBox="0 0 284.9 284.9">
            <G id="arrow_right">
                <Path fill={color || COLOR_PRIMARY} d="M221.9,135L88.8,3.5c-1.9-1.9-4.1-2.9-6.6-2.8s-4.7,1-6.6,2.9L61.5,17.9c-1.9,1.9-2.9,4.1-2.8,6.6s0.9,4.7,2.9,6.5l112.3,110.7l-111,112.2c-1.9,1.9-2.9,4.1-2.8,6.6c0,2.5,0.9,4.7,2.9,6.5l14.3,14c1.9,1.9,4.1,2.9,6.6,2.8c2.5,0,4.7-1,6.6-2.9l131.6-133c1.9-1.9,2.9-4.1,2.8-6.6C224.8,138.9,223.8,136.8,221.9,135z"/>
            </G>
        </Svg>
    );
};
export default ArrowRightIcon;

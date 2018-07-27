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

function CheckMarkIcon({ style, color }: Props) {
    return (
        <Svg style={style} viewBox="0 0 60 60">
            <G id="check_mark">
                <Path fill={color || COLOR_PRIMARY} class="cls-1" d="M39.65,23.26,26.91,34.55l-6.52-6a2,2,0,1,0-2.71,2.94l7.85,7.23a2,2,0,0,0,2.68,0L42.3,26.26a2,2,0,0,0-2.65-3Z" />
            </G>
        </Svg>
    );
};
export default CheckMarkIcon;

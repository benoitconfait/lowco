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

function VooIcon({ style, color }: Props) {
    return (
        <Svg style={style} viewBox="0 0 60 60">
            <G id="voo_round">
                <Path fill={color || COLOR_PRIMARY} class="cls-1" d="M30,4.32A25.68,25.68,0,1,0,55.68,30,25.71,25.71,0,0,0,30,4.32Z" />
                <Path fill="white" class="cls-2" d="M43.57,26.14l-10.1,15.5a4.16,4.16,0,0,1-7,0L16.43,26.14a4.14,4.14,0,0,1,7-4.49L30,31.81l6.61-10.16a4.14,4.14,0,0,1,7,4.49Z" />
            </G>
        </Svg>
    );
};
export default VooIcon;

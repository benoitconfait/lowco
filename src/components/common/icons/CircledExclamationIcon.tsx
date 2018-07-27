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

function CircledExclamationIcon({ style, color }: Props) {
    return (
        <Svg style={style} viewBox="0 0 60 60">
            <G id="exclamation_round">
                <Path fill={color || COLOR_PRIMARY} class="cls-1" d="M30,4.32A25.68,25.68,0,1,0,55.68,30,25.7,25.7,0,0,0,30,4.32Zm0,47.35A21.68,21.68,0,1,1,51.68,30,21.7,21.7,0,0,1,30,51.68Z" />
                <Path fill={color || COLOR_PRIMARY} class="cls-1" d="M29.62,35.09h.7A1,1,0,0,0,31.41,34l.16-14.27a1,1,0,0,0-1.06-1.06H29.42a.94.94,0,0,0-1,1.06L28.56,34A1,1,0,0,0,29.62,35.09Z" />
                <Rect fill={color || COLOR_PRIMARY} class="cls-1" x="28.4" y="38.16" width="3.2" height="3.14" rx="1.06" ry="1.06" />
            </G>
        </Svg>
    );
};
export default CircledExclamationIcon;

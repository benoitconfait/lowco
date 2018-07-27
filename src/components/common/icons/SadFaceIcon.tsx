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

function SadFaceIcon({ style, color }: Props) {
    return (
        <Svg style={style} viewBox="0 0 60 60">
            <G id="face_sad">
                <Path fill={color || COLOR_PRIMARY} class="cls-1" d="M30,4.32A25.68,25.68,0,1,0,55.68,30,25.71,25.71,0,0,0,30,4.32Zm0,47.35A21.68,21.68,0,1,1,51.68,30,21.7,21.7,0,0,1,30,51.68Z" />
                <Path fill={color || COLOR_PRIMARY} class="cls-1" d="M30,33.21a8.48,8.48,0,0,0-7.62,4.71A2,2,0,0,0,26,39.72a4.52,4.52,0,0,1,8.09,0,2,2,0,1,0,3.58-1.79A8.48,8.48,0,0,0,30,33.21Z" />
                <Circle fill={color || COLOR_PRIMARY} class="cls-1" cx="21.31" cy="23.86" r="2.66" />
                <Circle fill={color || COLOR_PRIMARY} class="cls-1" cx="38.69" cy="23.86" r="2.66" />
            </G>
        </Svg>
    );
};
export default SadFaceIcon;

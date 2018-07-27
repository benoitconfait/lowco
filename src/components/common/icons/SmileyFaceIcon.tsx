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

function SmileyFaceIcon({ style, color }: Props) {
    return (
        <Svg style={style} viewBox="0 0 60 60">
            <G id="smiley-face">
                <Path fill={color || COLOR_PRIMARY} d="M30,4.32A25.68,25.68,0,1,0,55.68,30,25.71,25.71,0,0,0,30,4.32Zm0,47.35A21.68,21.68,0,1,1,51.68,30,21.7,21.7,0,0,1,30,51.68Z" />
                <Path fill={color || COLOR_PRIMARY} d="M41.22,33a2,2,0,0,0-2.68.89,9.54,9.54,0,0,1-17.07,0,2,2,0,0,0-3.58,1.79,13.54,13.54,0,0,0,24.22,0A2,2,0,0,0,41.22,33Z" />
                <Circle fill={color || COLOR_PRIMARY} cx="21.31" cy="23.86" r="2.66" />
                <Circle fill={color || COLOR_PRIMARY} cx="38.69" cy="23.86" r="2.66" />
            </G>
        </Svg>
    );
};
export default SmileyFaceIcon;

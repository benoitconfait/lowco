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

function ListIcon({ style, color }: Props) {
    return (
        <Svg style={style} viewBox="0 0 56.7 56.7">
            <G id="list">
                <Circle fill={color || COLOR_PRIMARY} cx="7.1" cy="13.6" r="5" />
                <Path fill={color || COLOR_PRIMARY} d="M44.9,16.6h-20c-1.8,0-3.3-1.5-3.3-3.3l0,0c0-1.8,1.5-3.3,3.3-3.3h19.9c1.8,0,3.3,1.5,3.3,3.3l0,0C48.2,15.1,46.7,16.6,44.9,16.6z" />
                <Circle fill={color || COLOR_PRIMARY} cx="7.1" cy="28.7" r="5" />
                <Path fill={color || COLOR_PRIMARY} d="M52.3,31.7H24.9c-1.8,0-3.3-1.5-3.3-3.3l0,0c0-1.8,1.5-3.3,3.3-3.3h27.4c1.8,0,3.3,1.5,3.3,3.3l0,0C55.6,30.2,54.1,31.7,52.3,31.7z" />
                <Circle fill={color || COLOR_PRIMARY} cx="7.1" cy="43.9" r="5" />
                <Path fill={color || COLOR_PRIMARY} d="M40.7,46.9H24.9c-1.8,0-3.3-1.5-3.3-3.3l0,0c0-1.8,1.5-3.3,3.3-3.3h15.7c1.8,0,3.3,1.5,3.3,3.3l0,0C44,45.4,42.5,46.9,40.7,46.9z" />
            </G>
        </Svg>
    );
};
export default ListIcon;

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

function ArrowDownIcon({ style, color }: Props) {
    return (
        <Svg style={style} viewBox="0 0 306 306">
            <G id="arrow_down">
                <Polygon fill={color || COLOR_PRIMARY} stroke={color || COLOR_PRIMARY} strokeWidth={5} strokeMiterlimit={10} class="st0" points="301,96.3 266.5,61.7 153,175.2 39.5,61.7 5,96.3 153,244.3 		"/>
            </G>
        </Svg>
    );
};
export default ArrowDownIcon;

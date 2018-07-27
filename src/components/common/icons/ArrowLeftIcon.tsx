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

function ArrowLeftIcon({ style, color }: Props) {
    return (
        <Svg style={style} viewBox="0 0 284.9 284.9">
            <G id="arrow_left">
                <Path fill={color || COLOR_PRIMARY} d="M62.2,149l133,133c1.9,1.9,4.1,2.9,6.6,2.9c2.5,0,4.7-1,6.6-2.9l14.3-14.3c1.9-1.9,2.9-4.1,2.9-6.6s-0.9-4.7-2.9-6.6L110.5,142.5L222.7,30.3c1.9-1.9,2.9-4.1,2.9-6.6c0-2.5-0.9-4.7-2.9-6.6L208.4,2.9c-1.9-1.9-4.1-2.9-6.6-2.9c-2.5,0-4.7,1-6.6,2.9l-133,133c-1.9,1.9-2.9,4.1-2.9,6.6S60.3,147.1,62.2,149z"/>
            </G>
        </Svg>
    );
};
export default ArrowLeftIcon;

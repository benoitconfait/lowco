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
import { COLOR_WHITE } from '../../../styles/commonStyles';

interface Props {
    style: any,
    color?: string | null
}

function ArrowRetryIcon({ style, color }: Props) {
    return (
        <Svg x="0px" y="0px" viewBox="0 0 284.9 284.9" style={style}>
            <Path fill={color || COLOR_WHITE} d="M222.9,68.2c-41.9-41.9-110.1-41.9-152,0c-14,14-23.7,31.1-28.3,50l-7-7c-4-4-10.5-4-14.4,0s-4,10.5,0,14.4L52.5,157l32.6-29.9c0.1-0.1,0.3-0.3,0.4-0.4c3.8-3.8,4-10.1,0.3-14.1c-3.8-4.1-10.3-4.5-14.4-0.6l-7.8,7.1c4.1-13.8,11.5-26.3,21.9-36.6c33.9-33.9,89.2-33.9,123.2,0c33.9,33.9,33.9,89.2,0,123.2c-33.9,33.9-89.2,33.9-123.2,0c-4-4-10.5-4-14.4,0c-4,4-4,10.5,0,14.4c41.8,42.1,110,42,152,0.1C264.8,178.3,264.8,110.2,222.9,68.2z" />
        </Svg>
    );
};
export default ArrowRetryIcon;

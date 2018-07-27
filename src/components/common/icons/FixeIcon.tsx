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
        <Svg style={style} viewBox="0 0 120.6 128.8">
            <G id="fixe">
                <Path fill="none" stroke={color || COLOR_PRIMARY} strokeWidth={6}
                    strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10}
                    d="M92.8,107.2V20.4c0-9.1-7.4-16.5-16.5-16.5H44.1c-9.1,0-16.5,7.4-16.5,16.5v86.8" />
                <Path fill={color || COLOR_PRIMARY} d="M51.5,63.7c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4C49.7,59.7,51.5,61.5,51.5,63.7" />
                <Path fill={color || COLOR_PRIMARY} d="M64.2,63.7c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4C62.4,59.7,64.2,61.5,64.2,63.7" />
                <Path fill={color || COLOR_PRIMARY} d="M76.9,63.7c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4C75.1,59.7,76.9,61.5,76.9,63.7" />
                <Path fill={color || COLOR_PRIMARY} d="M51.5,76.6c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4C49.7,72.6,51.5,74.4,51.5,76.6" />
                <Path fill={color || COLOR_PRIMARY} d="M64.2,76.6c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4C62.4,72.6,64.2,74.4,64.2,76.6" />
                <Path fill={color || COLOR_PRIMARY} d="M76.9,76.6c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4C75.1,72.6,76.9,74.4,76.9,76.6" />
                <Path fill={color || COLOR_PRIMARY} d="M51.5,89.5c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4C49.7,85.5,51.5,87.3,51.5,89.5" />
                <Path fill={color || COLOR_PRIMARY} d="M64.2,89.5c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4C62.4,85.5,64.2,87.3,64.2,89.5" />
                <Path fill={color || COLOR_PRIMARY} d="M76.9,89.5c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4C75.1,85.5,76.9,87.3,76.9,89.5" />
                <Path fill="none" stroke={color || COLOR_PRIMARY} strokeWidth={6}
                    strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10}
                    d="M92.8,91.1c14.4,7.5,23.8,19.9,23.8,33.9H3.8c0-13.9,9.4-26.3,23.8-33.8" />
                <Path fill="none" stroke={color || COLOR_PRIMARY} strokeWidth={4} strokeMiterlimit={10}
                    d="M42.6,43.9V24.3c0-2.5,2-4.5,4.5-4.5h26.3c2.5,0,4.5,2,4.5,4.5v19.7c0,2.5-2,4.5-4.5,4.5H47C44.6,48.4,42.6,46.4,42.6,43.9z" />
            </G>
        </Svg>
    );
};
export default VooIcon;

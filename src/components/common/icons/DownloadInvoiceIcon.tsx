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

function DownloadIcon({ style, color }: Props) {
    return (
        <Svg style={style} viewBox="2 3 46.5 45.8">
            <G id="download-invoice">
                <Polyline fill="none" stroke={color || COLOR_PRIMARY} strokeWidth={4} strokeMiterlimit={10} class="st0" points="47.2,33.9 47.2,46.6 2.3,46.6 2.3,33.9 		" />
                <G>
                    <Line fill="none" stroke={color || COLOR_PRIMARY} strokeWidth={4} strokeLinejoin="round" strokeMiterlimit={10} class="st1" x1="24.3" y1="32.3" x2="24.3" y2="0.3" />
                    <Polyline fill="none" stroke={color || COLOR_PRIMARY} strokeWidth={4} strokeMiterlimit={10} class="st0" points="39.6,17.6 24.5,32.7 9.4,17.6 			" />
                </G>
            </G>
        </Svg>
    );
};
export default DownloadIcon;

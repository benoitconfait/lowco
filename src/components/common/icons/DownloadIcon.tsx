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
        <Svg style={style} viewBox="0 0 60 60">
            <G id="download">
                <Polygon fill={color || COLOR_PRIMARY} class="cls-1" points="50.47 39.44 50.47 50.17 9.53 50.17 9.53 39.44 5.53 39.44 5.53 54.17 54.47 54.17 54.47 39.44 50.47 39.44" />
                <Polygon fill={color || COLOR_PRIMARY} class="cls-1" points="46.52 24.58 43.69 21.75 32 33.44 32 5.83 28 5.83 28 33.45 16.31 21.75 13.48 24.58 30 41.1 46.52 24.58" />
            </G>
        </Svg>
    );
};
export default DownloadIcon;

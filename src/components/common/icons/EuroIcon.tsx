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

function EuroIcon({ style, color }: Props) {
    return (
        <Svg style={style} viewBox="0 0 40 15">
            <G id="euro">
                <Path fill={color || COLOR_PRIMARY} class="st1" d="M9,10.5c0-1,0.4-1.5,1.5-1.5h1.3c-0.2-0.9-0.2-2.5,0-3.6h-1.2C9.4,5.3,9,4.8,9,3.7c0-1.1,0.4-1.6,1.6-1.6h1.8c2.1-7.6,8.7-13.1,17-13.1c1.3,0,2.5,0.2,3.3,0.2c1.1,0.2,1.6,1,1.2,2l-0.3,1.4c-0.2,1-0.9,1.4-1.7,1.2c-0.7-0.1-1.7-0.2-2.7-0.2c-5.6,0-9.9,3.3-11.6,8.5h12.2c1.2,0,1.7,0.5,1.5,1.7c-0.2,1.1-0.7,1.5-1.8,1.5H16.9c-0.1,1.1-0.1,2.5,0,3.6h11.7c1.2,0,1.8,0.5,1.5,1.7c-0.2,1.1-0.7,1.5-1.8,1.5H17.7c1.6,5.2,6,8.8,11.6,8.8c1.2,0,2.2-0.1,3-0.2c1-0.2,1.8,0.2,1.9,1.2l0.3,1.4c0.2,1-0.2,1.8-1.2,2c-1,0.2-2.4,0.4-4,0.4c-8.6,0-15.1-5.5-17-13.5h-1.8C9.4,12.1,9,11.5,9,10.5z"/>
            </G>
        </Svg>
    );
};
export default EuroIcon;

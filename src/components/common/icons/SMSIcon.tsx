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

function SMSIcon({ style, color }: Props) {
    return (
        <Svg style={style} viewBox="0 0 52.4 51.9">
            <G id="fixe">
            	<Path fill="none" stroke={color || COLOR_PRIMARY} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} class="st0" d="M26.2,2.2C13.1,2.2,2.4,12.8,2.4,25.9c0,4.8,1.4,9.3,3.9,13l-1,2.8l-2.9,7.9l7.9-2.9l2.8-1c3.8,2.5,8.3,3.9,13.1,3.9C39.4,49.7,50,39.1,50,25.9C50,12.8,39.4,2.2,26.2,2.2z"/>
            	<G>
		            <Line fill="none" stroke={color || COLOR_PRIMARY} strokeWidth={3} strokeMiterlimit={10} class="st1" x1="13.9" y1="19.6" x2="38.9" y2="19.6"/>
		            <Line fill="none" stroke={color || COLOR_PRIMARY} strokeWidth={3} strokeMiterlimit={10} class="st1" x1="13.9" y1="26.6" x2="38.9" y2="26.6"/>
		            <Line fill="none" stroke={color || COLOR_PRIMARY} strokeWidth={3} strokeMiterlimit={10} class="st1" x1="13.9" y1="33.6" x2="30.9" y2="33.6"/>
	            </G>
            </G>
        </Svg>
    );
};
export default SMSIcon;

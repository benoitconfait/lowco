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

function UserIcon({ style, color }: Props) {
    return (
        <Svg style={style} viewBox="0 0 60 60">
            <G id="user">
                <Path fill={color || COLOR_PRIMARY} class="cls-1" d="M30,35.15a15,15,0,1,0-15-15A15,15,0,0,0,30,35.15ZM30,9.09a11,11,0,1,1-11,11A11,11,0,0,1,30,9.09Z"/>
                <Path fill={color || COLOR_PRIMARY} class="cls-1" d="M42.38,34.16a2,2,0,0,0-1.26.45L29.94,43.67,19,34.71a2,2,0,0,0-1.27-.45c-4.12,0-11.8,5.16-11.8,15.08,0,0,.08,2.59.08,3.57a2,2,0,0,0,2,2H52a2,2,0,0,0,2-2c0-1,.06-3.57.06-3.62C54.07,39.36,46.46,34.16,42.38,34.16ZM50,50.91H10c0-.87,0-1.64,0-1.64,0-7,4.89-10.37,7.19-10.93l11.55,9.46a2,2,0,0,0,2.53,0L43,38.25c2.27.57,7.08,4,7.08,11C50.07,49.25,50.05,50,50,50.91Z"/>
            </G>
        </Svg>
    );
};
export default UserIcon;

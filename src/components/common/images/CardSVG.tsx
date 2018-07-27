import React from 'react';
import { scale } from '../../../helpers/scaleHelper';
import Svg, {
    ClipPath,
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
    transform?: any
}

// .st0{fill:#E4E6EE;}
// .st1{fill:#B8CEE4;}
// .st2{fill:#7F9AB9;}
// .st3{fill:#FFFFFF;}
// .st4{fill:#E6EEF4;}
// .st5{fill:none;stroke:#E6EEF4;stroke-width:7.1773;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}

function CardSVG({ style, transform }: Props) {
    const transformAttrs = transform || {};
    return (
        <Svg style={style} viewBox={`0 0 ${scale(320)} ${scale(320)}`}>
            <G id="card" {...transformAttrs}>
                <Path fill="#E4E6EE" d="M264.5,239.8l-215.1,1.4c-10,0.1-18.1-7.9-18.1-17.9L30.5,103C30.4,93,38.4,85,48.4,84.9l215.1-1.4c10-0.1,18.1,7.9,18.1,17.9l0.7,120.3C282.4,231.7,274.4,239.7,264.5,239.8z" />
                <Path fill="#B8CEE4" d="M259.8,221.7l-216,1.3c-10,0.1-18.1-7.9-18.1-17.9L24.9,84.2c-0.1-10,7.9-18.1,17.9-18.1l216-1.3c10-0.1,18.1,7.9,18.1,17.9l0.8,120.9C277.8,213.5,269.8,221.6,259.8,221.7z" />
                <Rect fill="#7F9AB9" x="25.1" y="87.8" width="252" height="31.4" />
                <Rect fill="#FFFFFF" x="56.1" y="135.8" width="112.4" height="17.8" />
                <Ellipse fill="#E6EEF4" cx="61.7" cy="184.9" rx="12.7" ry="12.7" />
                <Line fill="none" stroke="#E6EEF4" strokeWidth={7.1773} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} x1="131.6" y1="176.4" x2="255.6" y2="175.7" />
                <Line fill="none" stroke="#E6EEF4" strokeWidth={7.1773} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} x1="184" y1="189.7" x2="255.7" y2="189.3" />
            </G>
        </Svg>
    );
};

export default CardSVG;

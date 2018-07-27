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

// .st0 fill="none" stroke={COLOR_PRIMARY} strokeWidth={4.3759} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10}

function SparkleFourSVG({ style, transform }: Props) {
    const transformAttrs = transform || {};
    return (
        <Svg style={style} viewBox="0 0 34 38">
            <G id="sparkle-four" {...transformAttrs}>
                <Line fill="none" stroke={COLOR_PRIMARY} strokeWidth={4.3759} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} class="st0" x1="27.9" y1="8.8" x2="22.4" y2="14.3"/>
                <Line fill="none" stroke={COLOR_PRIMARY} strokeWidth={4.3759} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} class="st0" x1="6.8" y1="8.8" x2="12.3" y2="14.3"/>
                <Line fill="none" stroke={COLOR_PRIMARY} strokeWidth={4.3759} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} class="st0" x1="6.8" y1="29.9" x2="12.3" y2="24.4"/>
                <Line fill="none" stroke={COLOR_PRIMARY} strokeWidth={4.3759} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} class="st0" x1="27.9" y1="29.9" x2="22.4" y2="24.4"/>
            </G>
        </Svg>
    );
};

export default SparkleFourSVG;

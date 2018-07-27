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

// 	.st0 fill="none" stroke="#6385DB" strokeWidth={4.3759} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10}

function SparkleSixSVG({ style, transform }: Props) {
    const transformAttrs = transform || {};
    return (
        <Svg style={style} viewBox="0 0 34.3 38">
            <G id="sparkle-six" {...transformAttrs}>
                <Line fill="none" stroke="#6385DB" strokeWidth={4.3759} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} class="st0" x1="16.9" y1="3.1" x2="16.9" y2="10.3"/>
                <Line fill="none" stroke="#6385DB" strokeWidth={4.3759} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} class="st0" x1="3.1" y1="11.1" x2="9.4" y2="14.7"/>
                <Line fill="none" stroke="#6385DB" strokeWidth={4.3759} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} class="st0" x1="3.1" y1="27.1" x2="9.4" y2="23.4"/>
                <Line fill="none" stroke="#6385DB" strokeWidth={4.3759} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} class="st0" x1="16.9" y1="35.1" x2="16.9" y2="27.8"/>
                <Line fill="none" stroke="#6385DB" strokeWidth={4.3759} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} class="st0" x1="30.8" y1="27.1" x2="24.5" y2="23.4"/>
                <Line fill="none" stroke="#6385DB" strokeWidth={4.3759} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} class="st0" x1="30.8" y1="11.1" x2="24.5" y2="14.7"/>
            </G>
        </Svg>
    );
};

export default SparkleSixSVG;

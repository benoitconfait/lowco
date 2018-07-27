import React from 'react';
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

// .st0 fill="none" stroke="#F7AFCF" strokeWidth={6.1183} strokelinecap="round" strokeLinejoin="round" strokeMiterlimit={10}
// .st1 fill="#F7AFCF"
// .st2 fill="#F9CFE2"
// .st3 fill="#E94390"
// .st4 clipPath="url(#SVGID_2_)" fill="#F7AFCF"
// .st5 fill="#FFFFFF"
// .st6 fill="#D4017A"
// .st7 fill="#E43388"

function PigSVG({ style, transform }: Props) {
    const transformAttrs = transform || {};
    return (
        <Svg style={style} viewBox="0 0 320 320">
            <G id="pig" {...transformAttrs}>
                <G>
                    <G>
                        <Path class="st0" fill="none" stroke="#F7AFCF" strokeWidth={6.1183} strokelinecap="round" strokeLinejoin="round" strokeMiterlimit={10} d="M95.3,161.9c-9.5,1.8-19.2-5-19.2-12.2c0-8.7,10.4-8.8,10.4-0.2c0,8.3-10,14.2-18.8,11.9"/>
                        <Path class="st1" fill="#F7AFCF" d="M220.6,132.5c-11.2-4.7-16.5-17.5-11.8-28.7s17.5-16.5,28.7-11.8L220.6,132.5z"/>
                        <Path class="st2" fill="#F9CFE2" d="M150.6,219.3l39.9,0c31.8,0,57.6-25.8,57.6-57.6v0c0-31.8-25.8-57.6-57.6-57.6l-39.9,0c-31.8,0-57.6,25.8-57.6,57.6v0C93,193.6,118.8,219.3,150.6,219.3z"/>
                        <Path class="st2" fill="#F9CFE2" d="M150,247.7l-13.9,0c-9,0-16.3-7.3-16.3-16.3l0-26.3l30.3,0L150,247.7z"/>
                        <Path class="st3" fill="#E94390" d="M140.7,105.1c2.1-0.4,4.3-0.6,6.5-0.8l3.4-0.1c0,0,0.1,0,0.1,0l33.1,0c0,4-3.2,7.2-7.2,7.2l-28.7,0.3C144,111.7,140.9,108.8,140.7,105.1z"/>
                        <G>
                            <Path class="st2" fill="#F9CFE2" d="M143.8,104.6c-1.1,0.1-2.1,0.3-3.1,0.5C141.7,104.9,142.8,104.7,143.8,104.6z"/>
                        </G>
                        <Path class="st2" fill="#F9CFE2" d="M206,247.7l-13.9,0c-9,0-16.3-7.3-16.3-16.3l0-26.3l30.3,0L206,247.7z"/>
                        <G>
                            <ClipPath id="SVGID_2_">
                                <Path id="SVGID_1_" d="M150.6,219.3l39.9,0c31.8,0,57.6-25.8,57.6-57.6v0c0-31.8-25.8-57.6-57.6-57.6l-39.9,0c-31.8,0-57.6,25.8-57.6,57.6v0C93,193.6,118.8,219.3,150.6,219.3z"/>
                            </ClipPath>
                            <Path class="st4" clipPath="url(#SVGID_2_)" fill="#F7AFCF" d="M329.1,203.8l43,56.6l-124.2,83.7L5.8,259l26.9-128l50-5l11,24.6c0,31.8,25.8,57.6,57.6,57.6l39.9,0c31.8,0,57.6-25.8,57.6-57.6l52.6-31.3l19.5,65.1L329.1,203.8z"/>
                        </G>
                        <Path class="st2" fill="#F9CFE2" d="M221.4,125.7c-11.8,2.6-23.5-4.9-26.2-16.7c-2.6-11.8,4.9-23.5,16.7-26.2L221.4,125.7z"/>
                        <Circle class="st5" fill="#FFFFFF" cx="214.3" cy="147.2" r="7.8"/>
                        <Path class="st2" fill="#F9CFE2" d="M264.9,146.6c-10.5,0-19.7-5.7-24.8-14.1l-4.2,2.1l6,12h0l-17.7,0l0,37.9l40.7,0L264.9,146.6z"/>
                    </G>
                </G>
                <G>
                    <Polygon class="st5" fill="#FFFFFF" points="115.6,97.4 119.2,120.1 115.6,120.1 111.9,120.1 		"/>
                    <Polygon class="st5" fill="#FFFFFF" points="92.9,120.1 115.6,116.5 115.6,120.1 115.6,123.7 		"/>
                    <Polygon class="st5" fill="#FFFFFF" points="115.6,142.8 111.9,120.1 115.6,120.1 119.2,120.1 		"/>
                    <Polygon class="st5" fill="#FFFFFF" points="138.3,120.1 115.6,123.7 115.6,120.1 115.6,116.5 		"/>
                    <Circle class="st5" fill="#FFFFFF" cx="115.6" cy="120.1" r="3.6"/>
                </G>
                <G>
                    <Polygon class="st5" fill="#FFFFFF" points="134,165.1 135.8,176.9 134,176.9 132.1,176.9 		"/>
                    <Polygon class="st5" fill="#FFFFFF" points="122.2,176.9 134,175 134,176.9 134,178.8 		"/>
                    <Polygon class="st5" fill="#FFFFFF" points="134,188.6 132.1,176.9 134,176.9 135.8,176.9 		"/>
                    <Polygon class="st5" fill="#FFFFFF" points="145.7,176.9 134,178.8 134,176.9 134,175 		"/>
                    <Circle class="st5" fill="#FFFFFF" cx="134" cy="176.9" r="1.9"/>
                </G>
                <G>
                    <G>
                        <Circle class="st6" fill="#D4017A" cx="161.2" cy="55.7" r="27.1"/>
                        <Circle class="st7" fill="#E43388" cx="161.2" cy="55.7" r="20.2"/>
                    </G>
                    <G>
                        <Path class="st5" fill="#FFFFFF" d="M148.4,58.4c0-1,0.4-1.5,1.5-1.5h0.7c-0.1-0.6-0.1-1.7,0-2.4h-0.6c-1.1,0-1.5-0.6-1.5-1.5s0.4-1.5,1.5-1.5h1.2c1.7-5.9,7-10.1,13.5-10.1c0.9,0,1.8,0.1,2.5,0.2c1.1,0.2,1.5,0.9,1.3,2l-0.4,1.5c-0.3,1-0.8,1.4-1.7,1.3c-0.5-0.1-1.2-0.2-1.8-0.2c-3.8,0-6.7,2.1-7.9,5.4h8.2c1.3,0,1.7,0.5,1.5,1.5c-0.2,1.1-0.7,1.5-1.8,1.5h-8.6c-0.1,0.7-0.1,1.7,0,2.4h7.8c1.3,0,1.7,0.6,1.5,1.5c-0.2,1.1-0.7,1.5-1.8,1.5h-6.7c1.3,3.3,4.3,5.5,7.9,5.5c0.8,0,1.5-0.1,2-0.2c1-0.2,1.7,0.2,1.9,1.2l0.3,1.5c0.2,1-0.2,1.7-1.3,1.9c-0.7,0.2-1.8,0.3-3.1,0.3c-6.8,0-11.8-4.2-13.5-10.3h-1.2C148.7,59.9,148.4,59.4,148.4,58.4z"/>
                    </G>
                </G>
            </G>
        </Svg>
    );
};

export default PigSVG;

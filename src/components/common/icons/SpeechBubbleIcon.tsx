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

function SpeechBubbleIcon({ style, color }: Props) {
    return (
        <Svg style={style} viewBox="0 0 60 60">
            <G id="speech_bubble">
                <Path fill={color || COLOR_PRIMARY} class="cls-1" d="M30,4.2A25.79,25.79,0,0,0,7.9,43.28l-3.6,9.83a2,2,0,0,0,2.57,2.56l9.82-3.59A25.8,25.8,0,1,0,30,4.2ZM30,51.8a21.69,21.69,0,0,1-12-3.6A2,2,0,0,0,16.24,48l-6.7,2.45L12,43.73a2,2,0,0,0-.21-1.79A21.79,21.79,0,1,1,30,51.8Z" />
                <Path fill={color || COLOR_PRIMARY} class="cls-1" d="M41.23,22.69h-22a1.5,1.5,0,0,0,0,3h22a1.5,1.5,0,0,0,0-3Z" />
                <Path fill={color || COLOR_PRIMARY} class="cls-1" d="M41.23,29.69h-22a1.5,1.5,0,0,0,0,3h22a1.5,1.5,0,0,0,0-3Z" />
                <Path fill={color || COLOR_PRIMARY} class="cls-1" d="M34.23,36.69h-15a1.5,1.5,0,0,0,0,3h15a1.5,1.5,0,0,0,0-3Z" />
            </G>
        </Svg>
    );
};
export default SpeechBubbleIcon;

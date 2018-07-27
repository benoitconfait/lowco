import React from 'react';
import * as Progress from 'react-native-progress';
import { COLOR_POSITIVE, COLOR_WARNING, COLOR_ERROR, COLOR_GRAY_20 } from '../../styles/commonStyles';
import progressBarStyles from '../../styles/progressBarStyles';
import { scale } from '../../helpers/scaleHelper';

interface Props {
  fixedColor?: string;
  height?: number;
  progress: number;
}

function ProgressBar({ fixedColor, height, progress }: Props) {
  let color = fixedColor || COLOR_POSITIVE;
  if (!fixedColor) {
    if (progress >= 1) {
      color = COLOR_ERROR;
    } else if (progress >= 0.8) {
      color = COLOR_WARNING;
    }
  }

  return (
    <Progress.Bar
      style={progressBarStyles.default}
      color={color}
      unfilledColor={COLOR_GRAY_20}
      progress={progress}
      width={null}
      height={height || scale(7.5)}
      borderRadius={scale(3)}
    />);
}

export default ProgressBar;

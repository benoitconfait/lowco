// https://blog.solutotlv.com/size-matters/
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on iphone 6
const guidelineBaseWidth = 320;
const guidelineBaseHeight = 568;

const getWidth = () => width;
const getHeight = () => height;
const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export {getWidth, getHeight, scale, verticalScale, moderateScale};
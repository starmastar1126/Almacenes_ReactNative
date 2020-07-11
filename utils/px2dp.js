import {Dimensions} from 'react-native';

// device width/height
//const deviceWidthDp = Dimensions.get('window').width;
const deviceW = Dimensions.get('window').width;
// design width/height
const baseW = 1080;

export default function px2dp(uiElementPx) {
  return (uiElementPx * deviceW) / baseW;
}

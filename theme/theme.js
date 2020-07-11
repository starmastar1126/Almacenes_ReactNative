import {Platform} from 'react-native';
import px2dp from '../utils/px2dp';
import Utils from '../utils/utils';

const globalTextColor = '#000';
// Screen Size
const screenWidth = Utils.size.width;
const screenHeight = Utils.size.height;
// indent (%)
const indent_width = screenWidth / 10;
const indent_height = screenHeight / 20;
// Wraper Size
const wrap_width = screenWidth - indent_width * 2;
// Route Button Size * Default width: Wraper width
const button_between = indent_height / 2;
const half_button_width = (wrap_width - button_between) / 2;
const button_height = (screenHeight - indent_height * 3) / 4;

export default {
  screenWidth: screenWidth,
  screenHeight: screenHeight,
  buttonBorderRadius: 14,
  themeColor: 'rgb(0,0,0)',
  grayColor: '#c4c4c4',
  buttonColor: '#2aace3',
  subtitleColor: '#313131',
  pageBackgroundColor: 'white',
  headerBackgroundColor: 'rgb(255,255,255)',
  footerIconColor: 'rgba(147,148,162,1)',
  footerIconSelectColor: 'rgba(255,255,255,1)',
  // headerFont: 'ArgentumSans_Black',
  title_font_size: ((screenHeight / 10) * 2.5) / 5,
  snap_title_size: ((screenHeight / 10) * 2) / 5,
  snap_text_size: ((screenHeight / 10) * 1.5) / 5,
  dashboad: {
    indent_width: indent_width,
    indent_height: indent_height,
    wrap_width: wrap_width,
    half_button_width: half_button_width,
    button_height: button_height,
    button_between: button_between,
    // font: 'ArgentumSans_Light',
  },
  order: {
    wrap_width: screenWidth - 20,
    indent_width: 10,
    indent_height: screenHeight / 25,
    pick_height: 40,
    button_height: 40,
  },
  iconBg: {
    justifyContent: 'center',
    marginRight: px2dp(10),
    height: px2dp(40),
    width: px2dp(40),
    borderRadius: px2dp(40),
    backgroundColor: 'rgba(196,196,196,0.3)',
    alignItems: 'center',
  },
  dashboard_button: {},
  headerTextColor: 'rgb(160, 160, 160)',
  searchColor: 'rgb(235,235,235)',

  titleColor: '#000',
  secondTitleColor: 'rgb(144,144,144)',
  btnActiveOpacity: 0.7,
  actionBar: {
    height: Platform.OS === 'android' ? px2dp(49) : px2dp(69),
    backgroundColor: 'rgb(22,131,251)',
    fontSize: px2dp(16),
    fontColor: 'white',
  },
  text: {
    color: globalTextColor,
    fontSize: px2dp(15),
  },
  scrollView: {
    fontSize: px2dp(15),
    underlineStyle: {
      height: 2,
      backgroundColor: 'rgb(108,140,194)',
    },
  },
};

import {StyleSheet} from 'react-native';
import theme from '../theme/theme';

export const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#f7f7f7',
  background2: '#21D4FD',
};

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f7f7f7',
  },
  container: {
    width: theme.screenWidth,
    height: theme.screenHeight,
    flex: 1,
    backgroundColor: colors.background1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollview: {
    flex: 1,
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 10,
  },
  detail_row: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    paddingBottom: 10,
  },
  detail_col: {
    borderTopWidth: 1,
    borderColor: '#000000',
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  detail_category: {
    fontSize: 16,
    color: '#7f7f7f',
    marginRight: 12,
    textAlign: 'center',
  },
  detail_value: {
    fontSize: 18,
    color: '#5f5f5f',
    fontWeight: 'bold',
    marginLeft: 12,
    textAlign: 'center',
  },
  detail_edit_icon: {
    marginLeft: 15,
    color: '#517fa4',
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleDark: {
    color: colors.black,
  },
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  slider: {
    marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
});

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './redux';
import Root from './navigation';
// import {View, Text} from 'react-native';

export default class App extends Component {
  state = {
    isReady: false,
  };

  // componentWillMount = async () => {
  // await Font.loadAsync({
  //   Roboto: require('native-base/Fonts/Roboto.ttf'),
  //   Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
  //   ArgentumSans_Black: require('./assets/fonts/ArgentumSans_Black.ttf'),
  //   ArgentumSans_BlackItalic: require('./assets/fonts/ArgentumSans_BlackItalic.ttf'),
  //   ArgentumSans_Bold: require('./assets/fonts/ArgentumSans_Bold.ttf'),
  //   ArgentumSans_BoldItalic: require('./assets/fonts/ArgentumSans_BoldItalic.ttf'),
  //   ArgentumSans_ExtraBold: require('./assets/fonts/ArgentumSans_ExtraBold.ttf'),
  //   ArgentumSans_ExtraBoldItalic: require('./assets/fonts/ArgentumSans_ExtraBoldItalic.ttf'),
  //   ArgentumSans_ExtraLight: require('./assets/fonts/ArgentumSans_ExtraLight.ttf'),
  //   ArgentumSans_ExtraLightItalic: require('./assets/fonts/ArgentumSans_ExtraLightItalic.ttf'),
  //   ArgentumSans_Italic: require('./assets/fonts/ArgentumSans_Italic.ttf'),
  //   ArgentumSans_Light: require('./assets/fonts/ArgentumSans_Light.ttf'),
  //   ArgentumSans_LightItalic: require('./assets/fonts/ArgentumSans_LightItalic.ttf'),
  //   ArgentumSans_Medium: require('./assets/fonts/ArgentumSans_Medium.ttf'),
  //   ArgentumSans_MediumItalic: require('./assets/fonts/ArgentumSans_MediumItalic.ttf'),
  //   ArgentumSans_Regular: require('./assets/fonts/ArgentumSans_Regular.ttf'),
  //   ArgentumSans_SemiBold: require('./assets/fonts/ArgentumSans_SemiBold.ttf'),
  //   ArgentumSans_SemiBoldItalic: require('./assets/fonts/ArgentumSans_SemiBoldItalic.ttf'),
  //   ArgentumSans_Thin: require('./assets/fonts/ArgentumSans_Thin.ttf'),
  //   ArgentumSans_ThinItalic: require('./assets/fonts/ArgentumSans_ThinItalic.ttf'),
  // })
  // this.setState({isReady: true});
  // StatusBar.setHidden(true);
  // };

  render() {
    // if (!this.state.isReady) {
    //   return <ActivityIndicator />;
    // }
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

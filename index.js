/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: ViewPagerAndroid has been extracted from react-native core',
  "Warning: Can't perform a React state update on an unmounted component",
  'Warning: Cannot update during an existing state transition',
  'Warning: Each child in a list should have a unique "key" prop',
  'Warning: RCTBridge required dispatch_sync to load RCTDevLoadingView',
  'Warning: Unsafe legacy lifecycles will not be called for components using new compnent APIs',
  "Accessing view manager configs directly off UIManager via UIManager['getConstants'] is no longer supported. Use UIManager.getViewManagerConfig('getConstants') instead.",
]);
AppRegistry.registerComponent(appName, () => App);

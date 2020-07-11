/**
 * @author Lyuba, sunearth.dolpin@outlook.com
 * @version 0.0.1
 */
import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../../theme/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Working_Time extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
  }

  go() {
    this.navigation.navigate('Working_Time');
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.working_time}
        onPress={() => {
          this.go();
        }}>
        <Icon name="av-timer" size={theme.snap_title_size} />
        <Text
          style={{
            // fontFamily: theme.dashboad.font,
            fontSize: theme.snap_title_size,
          }}>
          Working Time
        </Text>
        {/* <Text style={{fontFamily: theme.dashboad.font}}>Check WorkingTime</Text> */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  working_time: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    marginTop:
      theme.dashboad.indent_height +
      theme.dashboad.button_height * 2 +
      theme.dashboad.button_between * 2,
    marginLeft: theme.dashboad.indent_width,
    width: theme.dashboad.wrap_width,
    height: theme.dashboad.button_height,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    elevation: 19,
    borderRadius: theme.buttonBorderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // fontFamily: 'ArgentumSans_Black',
  },
});

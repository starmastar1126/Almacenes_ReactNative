/**
 * @author Lyuba, sunearth.dolpin@outlook.com
 * @version 0.0.1
 */
import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../../theme/theme';
import Icon from 'react-native-vector-icons/AntDesign';

export default class Tips extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
  }

  go() {
    this.navigation.navigate('Tips');
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.tips}
        onPress={() => {
          this.go();
        }}>
        <Icon name="home" size={theme.snap_title_size} />
        <Text
          style={{
            // fontFamily: theme.dashboad.font,
            fontSize: theme.snap_title_size,
          }}>
          Tips
        </Text>
        {/* <Text>Check Your Tips</Text> */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  tips: {
    backgroundColor: '#ffffff',
    width: theme.dashboad.half_button_width,
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
});

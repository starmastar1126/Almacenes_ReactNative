/**
 * @author Lyuba, sunearth.dolpin@outlook.com
 * @version 0.0.1
 */
import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../../theme/theme';
import Icon from 'react-native-vector-icons/AntDesign';

export default class Order_History extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
  }
  go() {
    this.navigation.navigate('Order_History');
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.order_history}
        onPress={() => {
          this.go();
        }}>
        <Icon name="shoppingcart" size={theme.snap_title_size} />
        <Text
          style={{
            // fontFamily: theme.dashboad.font,
            fontSize: theme.snap_title_size,
          }}>
          Orders
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  order_history: {
    backgroundColor: '#ffffff',
    // marginTop: theme.dashboad.indent_height,
    marginLeft:
      theme.dashboad.button_between + theme.dashboad.half_button_width,
    width: theme.dashboad.half_button_width,
    height: theme.dashboad.button_height,
    position: 'absolute',
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

/* eslint-disable react-native/no-inline-styles */
/**
 * @author Lyuba, sunearth.dolpin@outlook.com
 * @version 0.0.1
 */
import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../../theme/theme';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

class Order extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
  }
  static propTypes = {
    item: PropTypes.shape({
      order_id: PropTypes.string,
      customerfirstname: PropTypes.string,
      customerlastname: PropTypes.string,
      shipping_addresslocation: PropTypes.string,
      amount: PropTypes.string,
      // cash_unit: PropTypes.string,
      deliver_status: PropTypes.string,
      order_time: PropTypes.string,
    }),
  };

  static defaultProps = {
    item: {
      order_id: '123456',
      customerfirstname: 'Lyuba',
      customerlastname: 'Popov',
      shipping_addresslocation: 'Vladivostock',
      deliver_status: 'pending',
      amount: '150',
      // cash_unit: "$",
      order_time: '11:30 AM',
    },
  };
  go() {
    this.navigation.navigate('Order', {item: this.props.item});
  }

  render() {
    const item = this.props.item;
    let date_time = item.order_time;
    let array_dates = date_time.split(' ');
    return (
      <TouchableOpacity
        style={styles.order}
        onPress={() => {
          this.go();
        }}>
        <Text style={styles.order_text}>
          Order #{item.order_id}({array_dates[1]})
        </Text>
        <Text style={styles.explain_text}>
          Name: {item.customer_firstname + ' ' + item.customer_lastname}
        </Text>
        <Text style={styles.explain_text}>
          Address: {item.shipping_addresslocation}
        </Text>
        <Text style={styles.explain_text}>Amount: ${item.amount}</Text>
        {/* <Text style={styles.explain_text}>Order Time: {item.order_time}</Text> */}

        <TouchableOpacity style={styles.call_button}>
          <Icon name="md-call" size={20} color="#ffffff" />
          <Text style={{color: '#ffffff'}}>Call</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  order: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    // marginTop: 30,
    marginLeft: theme.dashboad.indent_width,
    width: theme.dashboad.wrap_width,
    height: theme.dashboad.button_height + theme.dashboad.indent_height / 2,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    elevation: 8,
    borderRadius: theme.buttonBorderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  explain_text: {
    color: theme.subtitleColor,
    fontSize: theme.dashboad.button_height / 12,
    paddingLeft: 10,
    paddingRight: 10,
    // fontFamily: theme.dashboad.font,
  },
  notify_text: {
    color: theme.subtitleColor,
    fontSize: theme.dashboad.button_height / 12,
  },
  order_text: {
    color: 'black',
    fontSize: theme.dashboad.button_height / 9,
    marginTop: theme.dashboad.button_height / 12,
    marginBottom: 0,
    // fontFamily: theme.dashboad.font,
  },

  text: {
    marginLeft: 16,
    flex: 1,
  },
  inputIcon: {
    flex: 1,
  },
  call_button: {
    backgroundColor: '#5ba31b',
    borderRadius: theme.buttonBorderRadius,
    width: theme.dashboad.wrap_width / 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.dashboad.button_height / 20,
  },
});

const mapStateToProps = state => {
  return {userinfo: state.userinfo};
};

export default connect(mapStateToProps)(Order);

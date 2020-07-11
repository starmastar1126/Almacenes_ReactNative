/* eslint-disable react-native/no-inline-styles */
/**
 * @author Lyuba, sunearth.dolpin@outlook.com
 * @version 0.0.1
 */
import React, {Component} from 'react';
import {View, Animated, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import theme from '../../theme/theme';

export default class PublishSnapshot extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.state = {
      opacity: new Animated.Value(0),
    };
  }
  static propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string,
      img: PropTypes.string,
      price: PropTypes.string,
      units: PropTypes.number,
      length: PropTypes.number,
    }),
  };
  static defaultProps = {
    item: {
      title: 'Class Routine',
      img: null,
      price: '100 USD',
      units: 5,
      length: 200,
    },
  };
  onLoad() {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 250,
    }).start();
  }
  getcontentscreen(item) {
    return (
      <View style={{width: theme.order.wrap_width, flexDirection: 'row'}}>
        <Image
          defaultSource={require('../../assets/pre_image_loading.png')}
          key="image01"
          source={{uri: item.img}}
          onLoad={event => this.onLoad(event)}
          style={{
            width: item.length / 4,
            height: item.length / 4,
            resizeMode: 'cover',
            backgroundColor: 'white',
            marginLeft: 5,
          }}
        />
        <View
          key="text01"
          style={{
            flexDirection: 'column',
            marginLeft: theme.order.wrap_width / 10,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              // fontFamily: theme.dashboad.font,
              color: theme.subtitleColor,
              fontSize: theme.order.wrap_width / 4 / 5,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              // fontFamily: theme.dashboad.font,
              color: theme.buttonColor,
              fontSize: theme.order.wrap_width / 4 / 6,
            }}>
            {item.price}
          </Text>
          <Text
            style={{
              // fontFamily: theme.dashboad.font,
              color: theme.subtitleColor,
              fontSize: theme.order.wrap_width / 4 / 6,
            }}>
            {item.units} Units
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const item = this.props.item;
    return (
      <View
        style={{
          flex: 1,
          height: item.length / 3,
          width: item.length,
          alignItems: 'center',
        }}>
        <View>{this.getcontentscreen(item)}</View>
      </View>
    );
  }
}

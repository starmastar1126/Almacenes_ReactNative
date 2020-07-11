/* eslint-disable react-native/no-inline-styles */
/**
 * @author irina, tissot20100101@outlook.com
 * @version 0.0.1
 */
import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import theme from '../../theme/theme';
import PropTypes from 'prop-types';

export default class PublishSnapshot extends Component {
  static propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string,
      price: PropTypes.string,
      icon: PropTypes.string,
      unit: PropTypes.number,
      page: PropTypes.string,
      length: PropTypes.number,
    }),
  };
  static defaultProps = {
    item: {
      title: 'Class Routine',
      price: '0USD',
      icon: null,
      unit: '0',
      page: 'Clas_Routine',
      length: '200',
    },
  };

  getcontentscreen(item) {
    var ret = [];
    var imgWidth = (item.length / 3) * 2;

    if (item.icon != null) {
      ret.push(
        <Image
          key="image01"
          source={{uri: item.icon}}
          // {uri: string, width: number, height: number, scale: number}

          defaultSource={require('../../assets/pre_image_loading.png')}
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            width: imgWidth,
            height: imgWidth,
            resizeMode: 'cover',
          }}
        />,
      );
    }

    ret.push(
      <View
        key="text01"
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 5,
          flexDirection: 'column',
          width: item.length,
          // height: item.length,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#ccc',
        }}>
        <Text
          numberOfLines={1}
          style={{
            color: theme.subtitleColor,
            textAlign: 'center',
            fontSize: 14,
          }}>
          {item.title}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              color: theme.subtitleColor,
              marginLeft: 10,
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: 12,
            }}>
            {item.price}$
          </Text>
          <Text
            style={{
              color: theme.subtitleColor,
              marginRight: 10,
              textAlign: 'right',
              fontWeight: 'bold',
              fontSize: 12,
            }}>
            {item.unit}
          </Text>
        </View>
      </View>,
    );
    return ret;
  }

  render() {
    const {item} = this.props;
    return (
      <View>
        <TouchableOpacity
          onPress={this.go.bind(this, item.page)}
          style={{
            marginLeft: 10,
            marginBottom: 20,
            flex: 1,
            height: item.length,
            width: item.length,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',

            //borderWidth: 1,
            //borderColor: '#ccc',
            // flex: 1,
          }}>
          <View>{this.getcontentscreen(item)}</View>
        </TouchableOpacity>
      </View>
    );
  }
  go(page) {
    if (page != null) {
      this.props.navigation.navigate(page, {
        productID: this.props.item.productID,
      });
    }
  }
}

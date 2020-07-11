/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import theme from '../../theme/theme';
import _ from 'lodash';
import {SelectMultipleButton} from 'react-native-selectmultiple-button';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class SubcategoryButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      multipleSelectedData: [],
      multipleSelectedDataLimited: [],
      selected: false,
    };
  }
  static propTypes = {
    item: PropTypes.shape({
      text: PropTypes.string,
      id: PropTypes.number,
      width: PropTypes.number,
      backcolor: PropTypes.string,
    }),
  };
  static defaultProps = {
    item: {
      title: 'test',
      id: 0,
      width: 5,
      backcolor: theme.buttonColor,
    },
  };

  render() {
    const {item, backcolor} = this.props;
    return (
      <TouchableOpacity>
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
            marginRight: 10,
          }}>
          <SelectMultipleButton
            key={item.text}
            buttonViewStyle={{
              borderRadius: 30,
              height: 30,
            }}
            textStyle={{
              fontSize: 15,
            }}
            highLightStyle={{
              // backgroundColor: theme.buttonColor,
              borderColor: backcolor,
              backgroundColor: backcolor,
              textColor: 'white',
              borderTintColor: theme.buttonColor,
              backgroundTintColor: theme.buttonColor,
              textTintColor: 'white',
            }}
            value={item.text}
            selected={this.props.item.isTap}
            // selected={this.state.multipleSelectedDataLimited.includes(item.text)}
            singleTap={valueTap => {
              this._singleTapRadioSelectedButtons(valueTap, item.text);
              //this.setState({selected: !this.state.selected});

              // this._singleTapMultipleSelectedButtons_limited(item.text)
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  _singleTapRadioSelectedButtons(valueTap, gender) {
    // Alert.alert('', valueTap)
    this.setState({
      radioSelectedData: gender,
    });
    this.props.selectSubCategory(this.props.item.id);
  }

  _singleTapMultipleSelectedButtons(interest) {
    if (this.state.multipleSelectedData.includes(interest)) {
      _.remove(this.state.multipleSelectedData, ele => {
        return ele === interest;
      });
    } else {
      this.state.multipleSelectedData.push(interest);
    }

    this.setState({
      multipleSelectedData: this.state.multipleSelectedData,
    });
  }

  _singleTapMultipleSelectedButtons_limited(interest) {
    if (this.state.multipleSelectedDataLimited.includes(interest)) {
      _.remove(this.state.multipleSelectedDataLimited, ele => {
        return ele === interest;
      });
    } else {
      if (this.state.multipleSelectedDataLimited.length < 1) {
        this.state.multipleSelectedDataLimited.push(interest);
      }
    }

    this.setState({
      multipleSelectedDataLimited: this.state.multipleSelectedDataLimited,
    });
  }
}

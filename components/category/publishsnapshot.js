/**
 * @author irina, tissot20100101@outlook.com
 * @version 0.0.1
 */
import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addSearchBar} from '../../redux/actions';

class PublishSnapshot extends Component {
  static propTypes = {
    item: PropTypes.shape({
      icon: PropTypes.string,
      page: PropTypes.string,
      length: PropTypes.number,
      height: PropTypes.number,
      bgcolor: PropTypes.string,
      category_id: PropTypes.number,
      index: PropTypes.number,
    }),
  };
  static defaultProps = {
    item: {
      icon: '',
      page: 'Clas_Routine',
      length: '200',
      height: '200',
      bgcolor: '#fa3232',
      category_id: '44',
      index: 0,
    },
  };
  getcontentscreen(item) {
    var ret = [];

    if (item.icon != null) {
      ret.push(
        <Image
          key="image01"
          source={{uri: item.icon}}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: item.length,
            height: item.height,
            resizeMode: 'stretch',
            borderRadius: 5,
          }}
        />,
      );
    }
    // ret.push(
    //   <Text key="text01" style={{
    //     marginLeft: "auto",
    //     marginRight: "auto",
    //     color: '#383838',
    //     fontSize: 14
    //   }}>{item.label}
    //   </Text>
    // );

    return ret;
  }

  render() {
    const {item} = this.props;

    return (
      <View>
        <TouchableOpacity
          onPress={this.go.bind(this, item.page, item.category_id)}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginBottom: 5,
            shadowColor: '#000000',
            shadowOpacity: 0.25,
            shadowOffset: {width: 0, height: 10},
            shadowRadius: 10,
            elevation: 19,
            height: item.height,
            width: item.length,
          }}>
          <View>{this.getcontentscreen(item)}</View>
        </TouchableOpacity>
      </View>
    );
  }
  go(page, category_id) {
    if (page != null) {
      this.props.add(false);
    }
    this.props.navigation.navigate(page, {category_id: category_id});
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add: visible => {
      dispatch(addSearchBar(visible));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(PublishSnapshot);

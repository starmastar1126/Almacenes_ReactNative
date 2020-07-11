/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */
/**
 * @author Lyuba, sunearth.dolpin@outlook.com
 * @version 0.0.1
 */
import React from 'react';
import {Text, View, StyleSheet, FlatList, Image} from 'react-native';
import theme from '../../theme/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LocationIcon from 'react-native-vector-icons/EvilIcons';
import PublishSnapshot from './publishsnapshot.js';
import Utils from '../../utils/utils';
import {connect} from 'react-redux';
import {setLoading} from '../../redux/actions';

class Order_Content extends React.Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.item = this.props.item;
    this.url = this.props.userinfo.url + 'getOrder_detail/' + this.item.id;
    this.image_url = this.props.userinfo.image_url;
    this.product_image_url =
      this.props.userinfo.image_url + 'product/thumbnail/';

    this.state = {
      dataSource: {},
      userinfo: this.props.userinfo,
    };
  }

  componentDidMount() {
    this.props.setLoading(false);
    Utils.get(this.url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({dataSource: responseJson.orderdata});
        this.props.setLoading(true);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getFlatListOfProducts(colwidth, height) {
    if (this.props.loading) {
      return (
        <View style={[styles.content, {height: (height * 6) / 10}]}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => (
              <PublishSnapshot
                navigation={this.navigation}
                item={{
                  title: item.product_name,
                  price: '$' + item.amount,
                  img: this.product_image_url + item.product_image,
                  units: parseInt(item.quantity),
                  length: colwidth,
                }}
              />
            )}
            //Setting the number of column
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    } else {
      return <View />;
    }
  }

  getCustomerInfoView(item, imgHeight, image, height) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: theme.order.wrap_width / 20,
          height: (height * 3) / 10,
        }}>
        <Image
          defaultSource={require('../../assets/pre_image_loading.png')}
          key="image01"
          source={{uri: image}}
          style={{
            width: imgHeight,
            height: imgHeight,
            resizeMode: 'cover',
            marginLeft: 10,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            marginLeft: theme.order.wrap_width / 10,
            justifyContent: 'center',
          }}>
          <View style={styles.view_status}>
            <Icon
              name="account"
              size={20}
              color="#989898"
              style={styles.inputIcon}
            />
            <Text style={styles.font_guest_user}>
              {item.customer_firstname + ' ' + item.customer_lastname}
            </Text>
          </View>
          <View style={styles.view_status}>
            <LocationIcon
              name="location"
              size={20}
              color="#989898"
              style={styles.inputIcon}
            />
            <Text style={styles.font_guest_user}>
              {item.shipping_addresslocation}
            </Text>
          </View>
          <View style={styles.view_status}>
            <Icon
              name="av-timer"
              size={20}
              color="#989898"
              style={styles.inputIcon}
            />
            <Text style={styles.font_guest_user}>{item.order_time}(Order)</Text>
          </View>
          <View style={styles.view_status}>
            <Text
              style={[
                styles.font_guest_user,
                {color: Utils.getstatuscolor(parseInt(item.status))},
              ]}>
              {Utils.getstatustitle(parseInt(item.status))}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  render() {
    var colwidth = theme.order.wrap_width;
    var imgHeight = theme.order.wrap_width / 4;
    const item = this.item;
    let image = item.customerimage;
    let height =
      theme.screenHeight -
      theme.order.pick_height -
      theme.order.indent_height * 5 -
      theme.order.button_height -
      10;
    const status = parseInt(item.status);
    if (status > 3) {
      height += theme.order.button_height + theme.order.pick_height + 10;
    } else if (
      (status === 1 && this.props.userinfo.userdata.user_type === '1') ||
      this.props.userinfo.userdata.user_type === '3'
    ) {
      height += theme.order.button_height + 10;
    }

    if (image.indexOf('http') < 0) {
      image =
        this.image_url +
        'http://mcflydelivery.com/mcflybackend/uploadfiles/images/';
    }
    return (
      <View style={[styles.container, {height: height}]}>
        <View style={[styles.title, {height: height / 10}]}>
          <Text style={styles.font_ref}>Ref {item.order_id}</Text>
          <Text style={styles.font_date}>2019.08.12</Text>
        </View>
        {this.getFlatListOfProducts(colwidth, height)}
        {this.getCustomerInfoView(item, imgHeight, image, height)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: theme.order.indent_height,
    width: theme.order.wrap_width,
    height:
      theme.screenHeight -
      theme.order.pick_height -
      theme.order.indent_height * 5 -
      theme.order.button_height,
    // backgroundColor: '#f1f1f1',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 0,
    // shadowColor: "#000000",
    // shadowOpacity: 0.25,
    // shadowOffset: { width: 0, height: 10 },
    // shadowRadius: 10,
    // elevation: 19,
  },
  inputIcon: {
    width: 22,
    height: 22,
    justifyContent: 'center',
  },
  view_subtitle: {
    // width: theme.order.wrap_width,
    flexDirection: 'row',
    // justifyContent: "center"
  },
  view_status: {
    // width: theme.order.wrap_width,
    alignSelf: 'baseline',
    flexDirection: 'row',
    // fontFamily: theme.dashboad.font,
    // justifyContent: "center"
  },
  font_guest_user: {
    color: theme.subtitleColor,
    // width: theme.dashboad.wrap_width,
    fontSize: theme.order.wrap_width / 4 / 7,
    flexWrap: 'wrap',
  },
  font_title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  font_date: {
    color: theme.buttonColor,
    fontSize: 14,
    textAlign: 'right',
    // fontFamily: theme.dashboad.font,
  },
  title: {
    width: theme.order.wrap_width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    // fontFamily: theme.dashboad.font,
  },
  font_ref: {
    color: theme.buttonColor,
    fontSize: 14,
    textAlign: 'left',
    // fontFamily: theme.dashboad.font,
  },
  content: {
    // marginLeft: "auto",
    // marginRight: "auto",
    width: theme.order.wrap_width,
    height:
      theme.screenHeight -
      theme.order.pick_height -
      theme.order.indent_height * 6 -
      theme.screenHeight / 4,
    borderBottomWidth: 1,
    borderBottomColor: '#bbbbbb',
    // backgroundColor: "#00ff00"
  },
});

const mapStateToProps = state => {
  return {userinfo: state.userinfo, loading: state.loading};
};

const mapDispatchToProps = dispatch => {
  return {
    setLoading: login_info => {
      dispatch(setLoading(login_info));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Order_Content);

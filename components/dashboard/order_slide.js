/**
 * @author Lyuba, sunearth.dolpin@outlook.com
 * @version 0.0.1
 */
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Order from './order';
import Swiper from 'react-native-swiper';
import theme from '../../theme/theme';
import {connect} from 'react-redux';
import Utils from '../../utils/utils';
import {setLoading} from '../../redux/actions';

class Order_Slide extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.url = this.props.userinfo.url + 'getAll_activeorders';
    this.state = {
      dataSource: {},
      userinfo: this.props.userinfo,
      loading: true,
    };
  }
  componentDidMount() {
    this.getContentFromServer();
  }

  getContentFromServer() {
    // ToastAndroid.show('ok-------', ToastAndroid.SHORT);
    const {userdata} = this.state.userinfo;
    this.setState({loading: true});
    if (userdata.user_type === '3') {
      this.setState({driver_user: true});
    } else {
      this.setState({
        driver_user: false,
        slideAnimationDialog: false,
        reportContent: '',
      });
    }
    this.props.setLoading(false);
    this.checkActiveOrders(userdata);
  }

  checkActiveOrders(userdata) {
    let senddata = {
      warehouseid: userdata.warehouse_id,
      userid: userdata.id,
      usertype: userdata.user_type,
    };
    Utils.post(this.url, senddata)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({dataSource: responseJson, loading: false});
        setTimeout(() => this.props.setLoading(true), 1000);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getContentScreen(datas) {
    let ret = [];
    for (let i = 0; i < datas.length; i++) {
      ret.push(
        <View key={i}>
          <Order navigation={this.navigation} item={datas[i]} />
        </View>,
      );
    }
    return ret;
  }

  render() {
    if (!this.state.loading) {
      const {orderdata} = this.state.dataSource;
      if (this.props.loading === false) {
        this.setState({loading: true});
        this.getContentFromServer();
      }
      return (
        <Swiper
          showsButtons={false}
          loop={false}
          showsPagination={false}
          style={styles.order}>
          {this.getContentScreen(orderdata)}
        </Swiper>
      );
    }
    return <View />;
  }
}

const styles = StyleSheet.create({
  order: {
    // top: theme.dashboad.indent_height,
    position: 'absolute',
    // backgroundColor: "#0000ff",
    marginTop: theme.dashboad.indent_height / 2,
    width: theme.screenWidth,
    height: theme.dashboad.button_height + theme.dashboad.indent_height + 30,
    // justifyContent: "flex-end",
    // alignItems: "center",
  },
});

const mapStateToProps = state => {
  return {userinfo: state.userinfo, loading: state.loading};
};
const mapDispatchToProps = dispatch => {
  return {
    setLoading: loading => {
      dispatch(setLoading(loading));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Order_Slide);

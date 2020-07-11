/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from 'native-base';
import Work_Template from '../../components/templates';
import theme from '../../theme/theme';
import Order_Content from '../../components/order/content';
import {connect} from 'react-redux';
import {setLogOut, setLoading} from '../../redux/actions';
import LinearGradient from 'react-native-linear-gradient';
import Utils from '../../utils/utils';
// import Spinner from 'react-native-loading-spinner-overlay';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.item = null;
    this.navigation = this.props.navigation;
    this.url = '';
    this.state = {
      selected_name_key: 'child0',
      selected_name_index: 0,
      drivers: [],
      loadData: false,
      saveLoading: false,
    };
    this.InitComponent();
  }

  InitComponent() {
    if (this.state.loadData === false) {
      this.item = this.navigation.getParam('item', null);
      this.props.setLogOutButton(false);
      this.url = this.props.userinfo.url + 'updateOrderstatus';
      this.state = {
        ...this.state,
        drivers: this.props.userinfo.drivers,
        loadData: true,
      };
      if (this.props.userinfo.drivers) {
        if (this.props.userinfo.drivers.length > 0) {
          this.state = {
            ...this.state,
            selected_name_key: this.props.userinfo.drivers[0].id,
          };
        }
      }
    }
  }

  getpickdataofguestname() {
    let ret = [];

    this.state.drivers.map((v, i) => {
      ret.push(<Picker.Item label={v.name} value={v.id} key={v.id} />);
    });
    return ret;
  }

  onNameGuest(value, index) {
    this.setState({
      selected_name_key: value,
      selected_name_index: index,
    });
  }

  getpickview() {
    return (
      <View style={styles.pickbox}>
        <Picker
          selectedValue={this.state.selected_name_key}
          onValueChange={this.onNameGuest.bind(this)}
          mode="dropdown"
          style={styles.pick}>
          {this.getpickdataofguestname()}
        </Picker>
      </View>
    );
  }

  getContentScreen() {
    if (this.state.loadData) {
      let info = this.getlabelofbutton(parseInt(this.item.status));
      return (
        <View style={styles.container}>
          {this.state.saveLoading === true && Utils.getLoadingView()}
          <Order_Content navigation={this.navigation} item={this.item} />
          {info.pick === 'yes' && this.getpickview()}
          {info.label !== '' && (
            <TouchableOpacity
              style={styles.picked_button_wrap}
              onPress={() => this.onPicked()}>
              <LinearGradient
                colors={['#2aace3', '#1d759b']}
                start={{
                  x: 0.1,
                  y: 0.1,
                }}
                end={{x: 0.9, y: 0.9}}
                style={styles.picked_button}>
                <Text style={{color: '#ffffff'}}>{info.label}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      );
    } else {
      return;
    }
  }

  getUpdateData(orderid, driverid, drivername, cur_status) {
    let status = parseInt(cur_status) + 1;
    if (cur_status === '3' && this.props.userinfo.userdata.user_type === '1') {
      status = cur_status;
    }
    if (cur_status === '4') {
      status = parseInt(cur_status) + 2;
    }
    return {
      orderid: orderid,
      driverid: driverid,
      drivername: drivername,
      status: parseInt(status),
    };
  }

  onPicked() {
    let {selected_name_index, selected_name_key, drivers} = this.state;
    const item = this.item;
    let drivername = '';
    if (
      this.props.userinfo.userdata.user_type === '1' &&
      (this.item.status === '2' || this.item.status === '3')
    ) {
      drivername = drivers[selected_name_index].name;
    } else {
      selected_name_key = '0';
    }
    let senddata = this.getUpdateData(
      item.id,
      selected_name_key,
      drivername,
      item.status,
    );
    this.props.setLoading(false);
    Utils.post(this.url, senddata)
      .then(response => response.json())
      .then(responseJson => {
        this.props.setLoading(true);
        this.navigation.navigate('Dashboard');
      })
      .catch(error => {
        console.log(error);
      });
  }

  // 1. Pendiente 2. Procesando 3. En Recolección 4. Recolectada 5. En Camino 6. Entregado, 7: completed
  getlabelofbutton(status) {
    const {userdata} = this.props.userinfo;
    switch (status) {
      case 1:
        return {label: 'Precesando', pick: 'no'}; // warehouse user (driver picker no) status update to 2
      case 2:
        return {label: 'En Recolección', pick: 'yes'}; // warehouse user(driver picker yes) status update to 3
      case 3:
        if (userdata.user_type === '3') {
          return {label: 'Recolectada', pick: 'no'};
        } else {
          return {label: 'Re En Recolección', pick: 'yes'}; // driver user (driver picker no)
        }
      case 4:
        if (userdata.user_type === '3') {
          return {label: 'En Camino', pick: 'no'};
        } else {
          return {label: '', pick: 'no'};
        }
      case 5:
        return {label: '', pick: 'no'};
      case 6:
        return {label: '', pick: 'no'}; // user_type "3"
      case 7:
        return {label: '', pick: 'no'}; // user_type "3"
    }
  }

  render() {
    return (
      <Work_Template
        navigation={this.navigation}
        item={{
          title: 'Order Details',
          content: this.getContentScreen(),
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: theme.screenWidth,
    height: (theme.screenHeight * 8.5) / 10,
    // backgroundColor: '#2aace3',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
  },

  empty_box: {
    height: 30,
  },

  pickbox: {
    borderRadius: theme.buttonBorderRadius,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    overflow: 'hidden',
    width: theme.order.wrap_width,
    backgroundColor: '#FFF',
    shadowColor: '#000', // IOS
    shadowOffset: {height: 7, width: 0}, // IOS
    elevation: 15, // Android
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    marginTop: theme.order.indent_height / 2,
    marginBottom: 5,
  },
  pick: {
    width: theme.order.wrap_width,
    height: theme.order.pick_height,
  },

  report_box: {
    marginTop: theme.order.indent_height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // color: '#2aace3',
    color: '#ffffff',
  },

  picked_button: {
    backgroundColor: theme.buttonColor,
    borderRadius: theme.buttonBorderRadius,
    width: theme.order.wrap_width,
    height: theme.order.button_height,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    elevation: 19,
  },
  picked_button_wrap: {
    borderRadius: theme.buttonBorderRadius,
    width: theme.order.wrap_width,
    height: theme.order.button_height,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 5,
    backgroundColor: '#0000ff',
    // marginTop: theme.order.indent_height / 3,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    elevation: 19,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    setLogOutButton: setlogout => {
      dispatch(setLogOut(setlogout));
    },
    setLoading: loading => {
      dispatch(setLoading(loading));
    },
  };
};
const mapStateToProps = state => {
  return {userinfo: state.userinfo, loading: state.loading};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Order);

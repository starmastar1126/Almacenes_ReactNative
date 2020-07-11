import React, {Component} from 'react';
import {Text, TextInput, View, StyleSheet, Image, Alert} from 'react-native';
import Work_Template from '../components/templates';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
} from 'react-native-popup-dialog';
import BellIcon from 'react-native-vector-icons/AntDesign';
import Order_Slide from '../components/dashboard/order_slide.js';
import Stock from '../components/dashboard/stock.js';
import Tips from '../components/dashboard/tips.js';
import Order_History from '../components/dashboard/order_history.js';
import Working_Time from '../components/dashboard/working_time.js';

import {setLogOut} from '../redux/actions';
import {connect} from 'react-redux';
import theme from '../theme/theme';
import Utils from '../utils/utils';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.props.setLogOutButton(true);
    const {userdata} = this.props.userinfo;
    let driver_user = false;
    if (userdata.user_type === '3') {
      driver_user = true;
    }
    this.state = {
      driver_user: driver_user,
      userinfo: this.props.userinfo,
      slideAnimationDialog: false,
      reportContent: '',
    };
    this.url = this.props.userinfo.url + 'getAll_activeorders';
    this.report_url = this.props.userinfo.url + 'sendgeneralreport';
  }

  showSlideAnimationDialog = () => {
    this.slideAnimationDialog.show();
  };

  sendReport() {
    const {userdata} = this.props.userinfo;
    const senddata = {
      warehouseid: userdata.warehouse_id,
      userid: userdata.id,
      report: this.state.reportContent,
    };
    Utils.post(this.report_url, senddata)
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert(
          'McFly',
          'Report Successfully',
          [
            {
              text: 'OK',
              onPress: () => this.setState({slideAnimationDialog: false}),
            },
          ],
          {cancelable: false},
        );
      })
      .catch(error => {
        Utils.showAlertWithOKButton('McFly', 'Network Error', null);
      });
  }
  getReportDialog() {
    return (
      <Dialog
        onDismiss={() => {
          this.setState({slideAnimationDialog: false});
        }}
        onTouchOutside={() => {
          this.setState({slideAnimationDialog: true});
        }}
        visible={this.state.slideAnimationDialog}
        dialogTitle={
          <DialogTitle
            title="Report to Admin"
            textStyle={{
              // fontFamily: theme.dashboad.font,
              color: theme.buttonColor,
            }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{backgroundColor: '#FFFFFF', alignItems: 'center'}}
            hasTitleBar={false}
            align="left"
          />
        }
        footer={
          <DialogFooter>
            <DialogButton
              text="CANCEL"
              bordered
              onPress={() => {
                this.setState({slideAnimationDialog: false});
              }}
              textStyle={{
                // fontFamily: theme.dashboad.font,
                color: theme.buttonColor,
              }}
              key="button-1"
            />
            <DialogButton
              text="Report"
              bordered
              onPress={() => {
                this.sendReport();
              }}
              textStyle={{
                // fontFamily: theme.dashboad.font,
                color: theme.buttonColor,
              }}
              key="button-2"
            />
          </DialogFooter>
        }
        dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}>
        <DialogContent style={styles.dialogContentView}>
          <TextInput
            style={styles.input_admin_report}
            onChangeText={reportContent =>
              this.setState({reportContent: reportContent})
            }
            placeholder="Report Content"
            multiline={true}
            autoFocus={true}
            placeholderTextColor="#002f6c"
          />
        </DialogContent>
      </Dialog>
    );
  }

  getDriverWareHouseScreen() {
    const {driver_user} = this.state;
    if (driver_user) {
      return <Tips navigation={this.navigation} />;
    } else {
      return <Stock navigation={this.navigation} />;
    }
  }

  getContentScreen() {
    return (
      <View style={styles.container}>
        {Utils.getLoadingView(!this.props.loading)}
        {this.getReportDialog()}
        <View style={styles.bellBox}>
          <View style={styles.notify}>
            <BellIcon name="bells" size={20} color="#ffffff" style={{}} />
          </View>
        </View>
        <Image
          style={styles.bar}
          source={require('../assets/back_order.png')}
          resizeMode="stretch"
        />
        <Order_Slide navigation={this.navigation} style={styles.order_view} />
        <View style={styles.order_working}>
          {this.getDriverWareHouseScreen()}
          <Order_History navigation={this.navigation} />
        </View>
        <Working_Time navigation={this.navigation} />
        <View style={styles.report_view}>
          <Text
            onPress={() => this.setState({slideAnimationDialog: true})}
            style={styles.report}>
            R E P O R T
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Work_Template
        navigation={this.navigation}
        item={{
          title: 'Dashboard',
          content: this.getContentScreen(),
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: theme.screenWidth,
    height: theme.screenHeight,
    // backgroundColor: "#2aace3"

    position: 'absolute',
  },

  order_view: {
    elevation: 19,
  },
  bellBox: {
    position: 'absolute',
    width: theme.screenWidth,
    alignItems: 'center',
    marginTop: theme.dashboad.indent_height + 10,
  },
  notify: {
    backgroundColor: theme.buttonColor,
    width: 30,
    height: 30,
    marginTop: -30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    elevation: 19,
  },
  bar: {
    position: 'absolute',
    // shadowColor: "#000000",
    // shadowOpacity: 0.25,
    // shadowOffset: { width: 0, height: 10 },
    // shadowRadius: 10,
    // elevation: 4,

    // backgroundColor: "#ffff00",
    width: theme.screenWidth,
    height: (theme.dashboad.button_height * 2) / 3,
    marginTop:
      theme.dashboad.indent_height + theme.dashboad.button_height / 3 - 30,
  },
  report_box: {
    marginTop: theme.dashboad.indent_height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // color: '#2aace3',
    color: '#ffffff',
  },

  report: {
    color: '#c11818',
    fontSize: theme.snap_text_size,
    textDecorationLine: 'underline',
    // fontFamily: theme.dashboad.font,
  },

  report_view: {
    position: 'absolute',
    marginTop:
      theme.dashboad.indent_height * 2 +
      theme.dashboad.button_height * 3 +
      theme.dashboad.button_between * 2,
    height: 40,
    width: theme.screenWidth,
    alignItems: 'center',
  },
  order_working: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    marginTop:
      theme.dashboad.indent_height +
      theme.dashboad.button_height +
      theme.dashboad.button_between,
    marginLeft: theme.dashboad.indent_width,
    width: theme.dashboad.wrap_width,
    height: theme.dashboad.button_height,
    justifyContent: 'center',
    // alignItems: "center",
  },
  dialogContentView: {
    paddingLeft: 18,
    paddingRight: 18,
    width: theme.screenWidth - 20,
    height: theme.screenHeight / 3,
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: '#000',
    // opacity: 0.4,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  text_admin_report: {
    flex: 1,
  },
  input_admin_report: {
    width: theme.screenWidth - 30,
    height: theme.screenHeight / 3,
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top',
  },
});

const mapStateToProps = state => {
  return {userinfo: state.userinfo, loading: state.loading};
};

const mapDispatchToProps = dispatch => {
  return {
    setLogOutButton: setlogout => {
      dispatch(setLogOut(setlogout));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

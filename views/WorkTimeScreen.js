/* eslint-disable prettier/prettier */
/* eslint-disable radix */
import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import Work_Template from '../components/templates';
import Swiper from 'react-native-swiper';
import theme from '../theme/theme';
import CustomWorkDay from '../components/worktime/CustomWorkDay';
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
  DialogTitle,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import {connect} from 'react-redux';
import Utils from '../utils/utils';
import DateTimePicker from 'react-native-modal-datetime-picker';

const styles = {
  container: {
    width: theme.screenWidth,
    height: theme.screenHeight - 60,
    backgroundColor: '#FCFCFC',
  },
  dot: {
    backgroundColor: 'rgba(55,156,216,.3)',
    width: 7,
    height: 7,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7,
  },
  actDot: {
    backgroundColor: 'rgba(55,156,216,1)',
    width: 7,
    height: 7,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7,
  },

  wrapper: {
    // backgroundColor: '#f00'
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FCFCFC',
  },
  weekday: {
    color: 'rgba(115, 115, 115, 1)',
    fontSize: 16,
    fontWeight: 'bold',
  },

  image: {
    width: theme.screenWidth,
    height: theme.screenHeight,
  },

  white: {
    color: '#ffffff',
    fontSize: 15,
    textAlign: 'center',
    margin: 8,
  },

  confirm: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    backgroundColor: 'rgba(40, 130, 170, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: theme.screenHeight / 10,
    height: 40,
    width: (theme.screenWidth * 2) / 3,
    flexDirection: 'row',
  },
  worktime_footer: {
    borderRadius: 10,
    marginLeft: 12,
    width: (theme.screenWidth * 2) / 3,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: theme.screenHeight / 10,
  },
};

class WorkTimeScreen extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.state = {
      dialogVisible: false,
      successVisible: false,
      showLoading: true,
      userID: this.props.user_info.userdata.id,
      fromTime: '8am',
      toTime: '8am',
      dataSource: [],
      isTimePickerVisible: false,
      isFromTime: true,
      allFromTime: [],
      allToTime: [],
      currentPageIndex: 0,
    };
    this.url = 'https://mcflydelivery.com/mcflybackend/index.php/api/getalltimesheet/';
    this.confirmUrl = 'https://mcflydelivery.com/mcflybackend/index.php/api/confirmworkingtime';
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({showLoading: true});
    this.getData();
  }

  getData() {
    Utils.post(this.url + this.state.userID)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({dataSource: responseJson.timesheetarray});
        this.getAllWorkTime(responseJson.timesheetarray);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getAllWorkTime(dataSource) {
    var workTime = dataSource;
    console.log(this.selectedID);
    var allFromTime = [];
    var allToTime = [];

    for (var t in workTime) {
      var fromTime = workTime[t].time_1;
      var toTime = workTime[t].time_2;
      allFromTime.push(fromTime);
      allToTime.push(toTime);
    }
    this.setState({
      allFromTime: allFromTime,
      allToTime: allToTime,
      showLoading: false,
    });
  }

  onMoveSwiper = (e, state, context) => {
    console.log(state, context.state);
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  handleOk = () => {
    let sendData = {
      userid: this.state.userID,
      fromtime: this.state.fromTime,
      totime: this.state.toTime,
    };
    this.setState({showLoading: true});
    Utils.post(this.confirmUrl, sendData)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({showLoading: false, dialogVisible: false});
        Alert.alert(
          'McFly',
          'Time confirmed successfully',
          [{text: 'OK', onPress: () => this.handleSuccessOk()}],
          {cancelable: false},
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleSuccessOk = () => {
    this.setState({dialogVisible: false, successVisible: false});
  }

  onPressConfirm = () => {
    this.setState({dialogVisible: true, successVisible: false});
  };

  showFromTimePicker = () => {
    this.setState({isTimePickerVisible: true, isFromTime: true});
  };

  showToTimePicker = () => {
    this.setState({isTimePickerVisible: true, isFromTime: false});
  };

  hideTimePicker = () => {
    this.setState({isTimePickerVisible: false});
  };

  handleTimePicked = time => {
    var strTime = time.toString();
    var pos = strTime.indexOf(':') - 2;
    var hour = parseInt(strTime.slice(pos, pos + 2));
    var realTime = '8am';

    if (hour > 11) {
      if (hour === 12) {
        realTime = '12pm';
      } else {
        realTime = hour - 12 + 'pm';
      }
    } else {
      if (hour === 0) {
        realTime = '12am';
      } else {
        realTime = hour + 'am';
      }
    }

    if (this.state.isFromTime) {
      this.setState({fromTime: realTime});
      let allTemp = this.state.allFromTime;
      for (var i = 0; i < allTemp.length; i++) {
        if (i === this.state.currentPageIndex) {
          allTemp[i] = realTime;
        }
      }
      this.setState({allFromTime: allTemp});
    } else {
      this.setState({toTime: realTime});
      let allTemp = this.state.allToTime;
      for (var i = 0; i < allTemp.length; i++) {
        if (i === this.state.currentPageIndex) {
          allTemp[i] = realTime;
        }
      }
      this.setState({allToTime: allTemp});
    }
    this.hideTimePicker();
  };

  getContentScreen () {
    return (
      <View style={styles.container}>
        {Utils.getLoadingView(this.state.showLoading)}
        <DateTimePicker
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this.handleTimePicked}
          onCancel={this.hideTimePicker}
          timePickerModeAndroid="spinner"
          titleStyle
          titleIOS="Pick a time"
          date={new Date()}
          mode="time"
          is24Hour={false}
        />
        <Swiper
          onMomentumScrollEnd={(e, state, context) => {
            this.setState({currentPageIndex: state.index});
          }}
          loop={false}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.actDot} />}
          paginationStyle={{
            bottom: theme.screenHeight / 7,
          }}>
          <CustomWorkDay weekday={1} fromTime={this.state.allFromTime[0]} toTime={this.state.allToTime[0]} userID={this.state.userID} confirm={this.onPressConfirm} showFromTimePicker={this.showFromTimePicker} showToTimePicker={this.showToTimePicker} />
          <CustomWorkDay weekday={2} fromTime={this.state.allFromTime[1]} toTime={this.state.allToTime[1]} userID={this.state.userID} confirm={this.onPressConfirm} showFromTimePicker={this.showFromTimePicker} showToTimePicker={this.showToTimePicker} />
          <CustomWorkDay weekday={3} fromTime={this.state.allFromTime[2]} toTime={this.state.allToTime[2]} userID={this.state.userID} confirm={this.onPressConfirm} showFromTimePicker={this.showFromTimePicker} showToTimePicker={this.showToTimePicker} />
          <CustomWorkDay weekday={4} fromTime={this.state.allFromTime[3]} toTime={this.state.allToTime[3]} userID={this.state.userID} confirm={this.onPressConfirm} showFromTimePicker={this.showFromTimePicker} showToTimePicker={this.showToTimePicker} />
          <CustomWorkDay weekday={5} fromTime={this.state.allFromTime[4]} toTime={this.state.allToTime[4]} userID={this.state.userID} confirm={this.onPressConfirm} showFromTimePicker={this.showFromTimePicker} showToTimePicker={this.showToTimePicker} />
          <CustomWorkDay weekday={6} fromTime={this.state.allFromTime[5]} toTime={this.state.allToTime[5]} userID={this.state.userID} confirm={this.onPressConfirm} showFromTimePicker={this.showFromTimePicker} showToTimePicker={this.showToTimePicker} />
          <CustomWorkDay weekday={0} fromTime="8am" toTime="8am"  />
        </Swiper>
        <Dialog
            visible={this.state.dialogVisible}
            dialogTitle={<DialogTitle title="Grabación de pantalla" />}
            onTouchOutside={() => {this.setState({ dialogVisible: false });}}
            dialogAnimation={new ScaleAnimation({
                initialValue: 0, // optional
                useNativeDriver: true, // optional
            })}
            footer={
                <DialogFooter>
                    <DialogButton text="Cancelar" onPress={this.handleCancel}/>
                    <DialogButton text="Detener" onPress={this.handleOk}/>
                </DialogFooter>
            }
        >
            <DialogContent>
                <View>
                    <Text>{'Detener grabación de pantalla?'}</Text>
                </View>
            </DialogContent>
        </Dialog>
        </View>
    );
}

    render() {
        return (
            <Work_Template
                navigation={this.navigation}
                item={{
                    title: 'Set Time',
                    content: this.getContentScreen(),
                }}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
      user_info: state.userinfo,
    };
  };
export default connect(mapStateToProps)(WorkTimeScreen);

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import MailIcon from 'react-native-vector-icons/AntDesign';
import Utils from '../../utils/utils';
import {connect} from 'react-redux';
import {regUserInfo} from '../../redux/actions';
import theme from '../../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import {openDatabase} from 'react-native-sqlite-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
} from 'react-native-popup-dialog';

const db = openDatabase({name: 'mcfly.db'});
const dialog_width = theme.screenWidth - 20;
const indent_width = dialog_width / 19;

class Forget extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.base_url = 'https://mcflydelivery.com/mcflybackend/index.php/api/';
    this.url =
      'https://mcflydelivery.com/mcflybackend/index.php/api/sendforgotemail';
    this.loginUrl =
      'https://mcflydelivery.com/mcflybackend/index.php/api/employeelogin';
    this.verifyInputs = [];
    this.state = {
      email: '',
      password: '',
      token: this.navigation.getParam('token', null),
      loading: false,
      isDatabase: false,
      slideAnimationDialog: false,
      verifycode: [],
      correctverifycode: '',
    };
  }

  componentDidMount() {
    // this.registerForPushNotificationsAsync();
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      token:
        'fVdbpkcDgAQ:APA91bFxmQs-4zwHrXS3djXL9FMj6I38Tcsl7CNY6bBaMu6Ekl9SsvOWFZhUbyu1T61PjDcnlrpgrxiSjxUjfzfEzWjKrCPw53CKdsY0myHmwq-Ay9AL9MfYB9qpOhE8nv1U7oESrIwE',
    });
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists users (id integer primary key not null, email text, password text, token text);',
      );
    });
  }

  checkUserDataInDatabase() {
    db.transaction(tx => {
      tx.executeSql('select * from users', [], (_, {rows}) => {
        console.log(rows);
        if (rows._array.length > 0) {
          this.setState({
            email: rows._array[0].email,
            password: rows._array[0].password,
            isDatabase: true,
            token: rows._array[0].token,
          });
          this.checkLogin();
        }
      });
    });
  }

  checkLogin = async () => {
    const {email, token} = this.state;
    let loginDetails = {
      email: email,
      token: token,
    };

    if (email === '') {
      Utils.showAlertWithOKButton('McFly', 'Please enter your email', null);
      return;
    } else {
      this.setState({loading: true});
      this.getUserInfoFromServer(loginDetails);
    }
  };
  goDashboard = () => {
    this.navigation.navigate('Dashboard');
  };
  insertUserInfoIntoDatabase(userinfo) {
    const {userdata} = userinfo;
    db.transaction(
      tx => {
        tx.executeSql('delete from users;', []);
        tx.executeSql(
          'insert into users (id, email, password, token) values (?, ?, ?, ?)',
          [userdata.id, userdata.email, userdata.password, userdata.token],
        );
        tx.executeSql('select * from users', [], (_, {rows}) =>
          console.log(JSON.stringify(rows)),
        );
      },
      null,
      this.goDashboard,
    );
  }

  checkUserInfo(response) {
    this.setState({
      slideAnimationDialog: true,
      correctverifycode: response.data.code,
      password: response.data.password,
    });
  }

  getUserInfoFromServerLogin(logindetail) {
    Utils.post(this.loginUrl, logindetail)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({loading: false});
        responseJson.url = this.base_url;
        responseJson.image_url = 'https://mcflydelivery.com/public/uploads/';
        this.props.reg(responseJson);
        this.insertUserInfoIntoDatabase(responseJson);
        this.goDashboard();
      })
      .catch(error => {
        Utils.showAlertWithOKButton('McFly', error, null);
      });
  }

  getUserInfoFromServer(logindetail) {
    Utils.post(this.url, logindetail)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        // this.checkUserInfo(responseJson);
        this.setState({loading: false});
        if (responseJson.message === 'success') {
          this.checkUserInfo(responseJson);
        } else {
          // eslint-disable-next-line no-alert
          alert(responseJson.message);
        }
      })
      .catch(() => {
        Utils.showAlertWithOKButton('McFly', 'Network Error', null);
      });
  }

  checkVerifyCode() {
    let verifycodes = '';
    for (var i = 0; i < this.state.verifycode.length; i++) {
      if (this.state.verifycode[i] != null) {
        verifycodes += this.state.verifycode[i];
      }
    }
    if (verifycodes === this.state.correctverifycode) {
      this.checkLoginUser();
    } else {
      // eslint-disable-next-line no-alert
      alert('Please enter correct verify code');
    }
  }

  checkLoginUser = async () => {
    const {email, password, token} = this.state;
    let loginDetails = {
      email: email,
      password: password,
      token: token,
    };

    this.setState({loading: true, slideAnimationDialog: false});
    this.getUserInfoFromServerLogin(loginDetails);
  };

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
            title="Please enter verify code from your email"
            textStyle={{
              // fontFamily: theme.dashboad.font,
              color: theme.buttonColor,
            }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
            }}
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
              text="OK"
              bordered
              onPress={() => {
                this.checkVerifyCode();
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
          {this.showVerifyCode()}
        </DialogContent>
      </Dialog>
    );
  }

  showVerifyCode() {
    let ret = [];
    ret.push(
      <TextInput
        style={styles.verifyInput}
        key={0}
        onChangeText={verifyCode => this.putVerifyCode(verifyCode, 0)}
        ref={input => (this.verifyInputs[0] = input)}
      />,
    );
    ret.push(
      <TextInput
        style={styles.verifyInput}
        key={1}
        onChangeText={verifyCode => this.putVerifyCode(verifyCode, 1)}
        ref={input => (this.verifyInputs[1] = input)}
      />,
    );
    ret.push(
      <TextInput
        style={styles.verifyInput}
        key={2}
        onChangeText={verifyCode => this.putVerifyCode(verifyCode, 2)}
        ref={input => (this.verifyInputs[2] = input)}
      />,
    );
    ret.push(
      <TextInput
        style={styles.verifyInput}
        key={3}
        onChangeText={verifyCode => this.putVerifyCode(verifyCode, 3)}
        ref={input => (this.verifyInputs[3] = input)}
      />,
    );
    ret.push(
      <TextInput
        style={styles.verifyInput}
        key={4}
        onChangeText={verifyCode => this.putVerifyCode(verifyCode, 4)}
        ref={input => (this.verifyInputs[4] = input)}
      />,
    );
    ret.push(
      <TextInput
        style={styles.verifyInput}
        key={5}
        onChangeText={verifyCode => this.putVerifyCode(verifyCode, 5)}
        ref={input => (this.verifyInputs[5] = input)}
      />,
    );
    return ret;
  }
  putVerifyCode(code, index) {
    if (this.verifyInputs[index + 1] != null) {
      this.verifyInputs[index + 1].focus();
    }
    let verifycodes = this.state.verifycode;
    verifycodes[index] = code;
    this.setState({verifycode: verifycodes});
  }

  render() {
    const {email} = this.state;
    return (
      <View style={styles.container}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={this.state.loading}
          //Text with the Spinner
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />
        {this.getReportDialog()}
        <View style={styles.logoBox}>
          <Image
            style={styles.logo}
            source={require('../../assets/logo_transparent.png')}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.inputBox_email}>
          <Text>
            Please enter your email
          </Text>
        </View>
        <View style={styles.inputBox}>
          <MailIcon name="mail" size={26} style={styles.inputIcon} />
          <TextInput
            style={styles.inputs}
            // eslint-disable-next-line no-shadow
            onChangeText={email => this.setState({email})}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Email"
            placeholderTextColor="#818181"
            selectionColor="#fff"
            keyboardType="email-address"
            value={email}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.checkLogin();
          }}>
          <LinearGradient
            colors={['#2aace3', '#1d759b']}
            style={styles.button_content}
            start={{
              x: 0.1,
              y: 0.1,
            }}
            end={{x: 0.9, y: 0.9}}>
            <Text style={styles.buttonText}>Send to Email</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoBox: {
    width: theme.screenWidth,
    marginTop: theme.screenHeight / 8,
    height: Utils.size.width / 9,
  },
  logo: {
    width: Utils.size.width / 2,
    height: Utils.size.width / 6,
    alignSelf: 'stretch',
    alignContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  inputBox_email: {
    backgroundColor: '#FFFFFF',
    width: Utils.size.height / 2,
    height: 45,
    marginTop: theme.screenHeight / 4,
    alignItems: 'center',
  },
  inputBox: {
    borderColor: '#eeeeee',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderWidth: 1,
    width: Utils.size.height / 2,
    height: 45,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    borderBottomColor: '#FFFFFF',
    textAlign: 'center',
    marginLeft: -50,
    flex: 1,
    // fontFamily: theme.dashboad.font,
  },
  button: {
    width: (Utils.size.width / 3) * 2,
    // backgroundColor: '#2aace3',
    borderRadius: 25,
    marginTop: theme.screenHeight / 6,
    height: 40,
    // shadowColor: "#000000",
    // shadowOpacity: 0.25,
    // shadowOffset: { width: 0, height: 10 },
    // shadowRadius: 10,
    // elevation: 19,
  },
  button_content: {
    width: (Utils.size.width / 3) * 2,
    paddingVertical: 10,
    borderRadius: 25,
    height: 40,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
    // fontFamily: theme.dashboad.font,
  },
  verifyInput: {
    width: indent_width * 2,
    height: theme.screenHeight / 6,
    borderWidth: 1,
    borderColor: theme.buttonColor,
    fontSize: 24,
    color: theme.buttonColor,
    textAlign: 'center',
  },
  dialogContentView: {
    paddingLeft: 18,
    paddingRight: 18,
    width: theme.screenWidth - 20,
    height: theme.screenHeight / 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: '#000',
    // opacity: 0.4,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  codetext: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    reg: login_info => {
      dispatch(regUserInfo(login_info));
    },
  };
};
const mapStateToProps = state => {
  return {userinfo: state.userinfo, loading: state.loading};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Forget);

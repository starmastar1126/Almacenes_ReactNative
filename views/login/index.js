import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Utils from '../../utils/utils';
import {connect} from 'react-redux';
import {regUserInfo} from '../../redux/actions';
import theme from '../../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import {openDatabase} from 'react-native-sqlite-storage';
import Spinner from 'react-native-loading-spinner-overlay';

var db = openDatabase({name: 'mcfly.db'});

class Login extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.base_url = 'https://mcflydelivery.com/mcflybackend/index.php/api/';
    this.url =
      'https://mcflydelivery.com/mcflybackend/index.php/api/employeelogin';
    this.state = {
      // splash: false,
      email: '',
      password: '',
      loading: false,
      isDatabase: false,
      token:
        'fVdbpkcDgAQ:APA91bFxmQs-4zwHrXS3djXL9FMj6I38Tcsl7CNY6bBaMu6Ekl9SsvOWFZhUbyu1T61PjDcnlrpgrxiSjxUjfzfEzWjKrCPw53CKdsY0myHmwq-Ay9AL9MfYB9qpOhE8nv1U7oESrIwE',
    };
    // setTimeout(() => {
    //   this.setState({splash: true});
    // }, 1000);
  }

  componentDidMount() {
    // this.registerForPushNotificationsAsync();
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(255), password VARCHAR(255), token VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
    this.checkUserDataInDatabase();
  }

  checkUserDataInDatabase() {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (_tx, results) => {
        var len = results.rows.length;

        if (len > 0) {
          this.setState({
            email: results.rows.item(0).email,
            password: results.rows.item(0).password,
            isDatabase: true,
            token: results.rows.item(0).token,
          });
          this.checkLogin();
        } else {
          this.setState({
            email: '',
            password: '',
          });
        }
      });
    });
  }

  checkLogin = async () => {
    const {email, password, token} = this.state;
    // this.navigation.navigate("Dashboard");
    // let loginDetails={
    //     email: "juan@admin.com",
    //     password: "12345",
    //     token: "fVdbpkcDgAQ:APA91bFxmQs-4zwHrXS3djXL9FMj6I38Tcsl7CNY6bBaMu6Ekl9SsvOWFZhUbyu1T61PjDcnlrpgrxiSjxUjfzfEzWjKrCPw53CKdsY0myHmwq-Ay9AL9MfYB9qpOhE8nv1U7oESrIwE"
    // }
    let loginDetails = {
      email: email,
      password: password,
      token: token,
    };

    if (email === '' || password === '') {
      Utils.showAlertWithOKButton(
        'McFly',
        'Please enter your email and password',
        null,
      );
      return;
    } else {
      this.setState({loading: true});
      this.getUserInfoFromServer(loginDetails);
    }
  };
  goDashboard = () => {
    // alert('Go Dashboard');
    this.navigation.navigate('Dashboard');
  };
  insertUserInfoIntoDatabase(userinfo) {
    const {userdata} = userinfo;
    db.transaction(tx => {
      tx.executeSql('DELETE FROM  table_user', [], (_tx, results) => {});
      tx.executeSql(
        'INSERT INTO table_user (email, password, token) VALUES (?,?,?)',
        [userdata.email, userdata.password, userdata.token],
        (__tx, _results) => {
          if (_results.rowsAffected > 0) {
            this.props.navigation.navigate('Dashboard');
          }
        },
      );
    });
  }

  //   registerForPushNotificationsAsync = async () => {
  //     const {status: existingStatus} = await Permissions.getAsync(
  //       Permissions.NOTIFICATIONS,
  //     );
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       // Android remote notification permissions are granted during the app
  //       // install, so this will only ask on iOS
  //       const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //       finalStatus = status;
  //     }

  //     if (finalStatus !== 'granted') {
  //       return;
  //     }

  //     // Get the token that uniquely identifies this device
  //     let token = await Notifications.getExpoPushTokenAsync();
  //     this.subscription = Notifications.addListener(this.handleNotification);
  //     this.setState({token: token});;
  //   };

  // handleNotification = notification => {
  //   // alert(notification);
  // };

  checkUserInfo(response) {
    const {message} = response;
    this.setState({loading: false});
    if (message === 'success') {
      response.url = this.base_url;
      response.image_url = 'https://mcflydelivery.com/public/uploads/';
      this.props.reg(response);
      this.insertUserInfoIntoDatabase(response);
      // this.goDashboard();
    } else {
      Utils.showAlertWithOKButton('McFly', message, null);
    }
  }

  getUserInfoFromServer(logindetail) {
    Utils.post(this.url, logindetail)
      .then(response => response.json())
      .then(responseJson => {
        this.checkUserInfo(responseJson);
      })
      .catch(error => {
        Utils.showAlertWithOKButton('McFly', 'Network Error', null);
      });
  }

  showData = async () => {};

  render() {
    // ToastAndroid.show(this.state.splash.toString(), ToastAndroid.SHORT);
    const {email, password} = this.state;
    // if (this.state.splash) {
      return (
        <View style={styles.container}>
          <Spinner
            //visibility of Overlay Loading Spinner
            visible={this.state.loading}
            //Text with the Spinner
            //Text style of the Spinner Text
            textStyle={styles.spinnerTextStyle}
          />
          <View style={styles.logoBox}>
            <Image
              style={styles.logo}
              source={require('../../assets/logo_transparent.png')}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.inputBox_email}>
            <Icon name="mail" size={26} style={styles.inputIcon} />
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
              onSubmitEditing={() => this.password.focus()}
            />
          </View>
          <View style={styles.inputBox}>
            <Icon name="user" size={26} style={styles.inputIcon} />
            <TextInput
              style={styles.inputs}
              // eslint-disable-next-line no-shadow
              onChangeText={password => this.setState({password})}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#818181"
              value={password}
              ref={input => (this.password = input)}
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
              <Text style={styles.buttonText}>Sign in</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text
            style={styles.forget}
            onPress={() => {
              this.navigation.navigate('ForgetPassword', {
                token: this.state.token,
              });
            }}>
            Forget Password
          </Text>
        </View>
      );
    // } else {
    //   return (
    //     <Image
    //       source={require('../../assets/splash.png')}
    //       // eslint-disable-next-line react-native/no-inline-styles
    //       style={{
    //         marginLeft: 'auto',
    //         marginRight: 'auto',
    //         width: theme.screenWidth,
    //         height: theme.screenHeight,
    //         resizeMode: 'stretch',
    //       }}
    //     />
    //   );
    // }
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
    borderColor: '#eeeeee',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderWidth: 1,
    width: (Utils.size.width * 3) / 4,
    height: 45,
    marginTop: theme.screenHeight / 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputBox: {
    borderColor: '#eeeeee',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderWidth: 1,
    width: (Utils.size.width * 3) / 4,
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
  forget: {
    marginTop: 40,
    color: '#2aace3',
    textDecorationLine: 'underline',
    // fontFamily: theme.dashboad.font,
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
)(Login);

/**
 * @author Lyuba, sunearth.dolpin@outlook.com
 * @version 0.0.1
 */
import React, {Component} from 'react';
import {TouchableOpacity, Alert} from 'react-native';
import {Header, View, Title} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {regUserInfo, addSearchBar, setLogOut} from '../../redux/actions';
import theme from '../../theme/theme';

class Class_Header extends Component {
  static propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string,
    }),
  };
  static defaultProps = {
    item: {
      title: 'Class Routine',
    },
  };
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.state = {
      logoutbutton: this.props.logoutbutton,
      status: 'login',
      add_searchbar: false,
    };
  }

  showSearchBar() {
    if (this.props.toggleSearch === false) {
      this.props.add(true);
      this.setState({add_searchbar: true});
    } else {
      this.props.add(false);
      this.setState({add_searchbar: false});
    }
  }

  getLogoutSearchButton(fontsize) {
    const {item} = this.props;
    if (item.title === 'Dashboard') {
      return (
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Alert',
              'Are you logout?',
              [
                {text: 'Cancel', onPress: () => null},
                {text: 'OK', onPress: () => this.worklogout()},
              ],
              {cancelable: false},
            );
          }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginRight: 10}}>
          <AntIcon name={'poweroff'} color={'black'} size={fontsize} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  worklogout() {
    this.props.reg({email: '', password: '', token: ''});
    this.navigation.navigate('Login');
  }

  getBackButton(fontsize) {
    const {item} = this.props;
    if (item.title !== 'Dashboard') {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.add(false);
            this.navigation.goBack();
          }}>
          <Icon name={'chevron-left'} color={'black'} size={fontsize} />
        </TouchableOpacity>
      );
    }
  }

  getSearchButton(fontsize) {
    const {item} = this.props;
    if (
      item.title === 'Order History' ||
      item.title === 'Stock' ||
      item.title === 'Products'
    ) {
      return (
        <TouchableOpacity onPress={() => this.showSearchBar()}>
          <Icon name={'search'} color={'black'} size={fontsize} />
        </TouchableOpacity>
      );
    }
  }
  render() {
    const {item} = this.props;
    const fontsize = theme.title_font_size;
    return (
      <Header
        // eslint-disable-next-line react-native/no-inline-styles
        style={{backgroundColor: 'white', height: theme.screenHeight / 10}}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flexDirection: 'row',
            flex: 1,
            marginTop: theme.screenHeight / 50,
          }}>
          {this.getBackButton(theme.title_font_size)}
          <Title
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              color: '#363636',
              fontWeight: 'bold',
              fontSize: fontsize,
              // fontFamily: theme.headerFont,
            }}>
            {item.title}
          </Title>
          {this.getSearchButton(theme.title_font_size)}
          {this.getLogoutSearchButton(theme.title_font_size)}
        </View>
      </Header>
    );
  }
}

const mapStateToProps = state => {
  return {
    logoutbutton: state.logoutbutton,
    toggleSearch: state.searchBar,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    reg: login_info => {
      dispatch(regUserInfo(login_info));
    },
    add: isAdd => {
      dispatch(addSearchBar(isAdd));
    },
    setLogOutButton: logout => {
      dispatch(setLogOut(logout));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Class_Header);

/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Work_Template from '../components/templates';
import theme from '../theme/theme';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {connect} from 'react-redux';
import Utils from '../utils/utils';

const DayRoute = () => (
  <View style={[styles.scene, {backgroundColor: 'rgba(235,235,235,1)'}]} />
);
const MonthRoute = () => (
  <View style={[styles.scene, {backgroundColor: 'rgba(235,235,235,1)'}]} />
);
const YearRoute = () => (
  <View style={[styles.scene, {backgroundColor: 'rgba(235,235,235,1)'}]} />
);

class TipScreen extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.state = {
      showLoading: false,
      userID: this.props.user_info.userdata.id,
      dataSource: [],
      index: 0,
      routes: [
        {key: 'first', title: 'Day'},
        {key: 'second', title: 'Month'},
        {key: 'third', title: 'Year'},
      ],
    };
    this.tipsURL =
      'http://mcflydelivery.com/mcflybackend/index.php/api/getalltips/';
  }

  componentDidMount() {
    this.setState({showLoading: true});
    this.getAllTips();
  }

  getAllTips() {
    Utils.post(this.tipsURL + this.state.userID)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({dataSource: responseJson.tips, showLoading: false});
      })
      .catch(error => {
        console.log(error);
      });
  }

  getContentScreen() {
    return (
      <View style={styles.container}>
        {Utils.getLoadingView(this.state.showLoading)}
        <View style={styles.header}>
          <Text style={styles.common_text}>Total Balance</Text>
          <Text style={styles.cash_text}>00</Text>
          <Text style={styles.unit_text}>USD</Text>
        </View>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: DayRoute,
            second: MonthRoute,
            third: YearRoute,
          })}
          style={{
            borderTopColor: 'rgba(235,235,235,1)',
            borderRightColor: 'rgba(48, 156, 213, 1)',
            borderLeftColor: 'rgba(48, 156, 213, 1)',
            borderWidth: 1,
          }}
          onIndexChange={index => this.setState({index: index})}
          initialLayout={{width: theme.screenWidth}}
          renderTabBar={props => (
            <TabBar
              {...props}
              //scrollEnabled
              indicatorStyle={styles.indicator}
              indicatorContainerStyle={styles.indicatorContainer}
              contentContainerStyle={styles.contentContainer}
              style={styles.tabbar}
              labelStyle={styles.tab_label}
              tabStyle={styles.tabStyle}
            />
          )}
        />
      </View>
    );
  }

  render() {
    return (
      <Work_Template
        navigation={this.navigation}
        item={{
          title: 'Tips',
          content: this.getContentScreen(),
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    toggleSearch: state.searchBar,
    user_info: state.userinfo,
  };
};

export default connect(mapStateToProps)(TipScreen);

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(48, 156, 213, 1)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  common_text: {
    fontSize: 11,
    color: 'rgba(235, 235, 235, 1)',
    marginTop: 15,
    marginBottom: 10,
  },
  unit_text: {
    fontSize: 11,
    color: 'rgba(235, 235, 235, 1)',
    marginTop: 10,
    marginBottom: 10,
  },
  cash_text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgba(235, 235, 235, 1)',
  },
  container: {
    width: theme.screenWidth,
    height: theme.screenHeight,
  },

  scene: {
    width: theme.screenWidth,
    height: theme.screenHeight,
  },
  tabbar: {
    //backgroundColor: '#3f51b5',
    //backgroundColor: 'pink'
  },
  indicator: {
    backgroundColor: '#ff0000',

    height: 2,
  },
  indicatorContainer: {
    backgroundColor: 'rgba(48, 156, 213, 1)',
  },
  contentContainer: {
    //backgroundColor: 'rgba(48, 156, 213, 1)',
  },
  tab_label: {
    //fontWeight: '400',
  },
  tabStyle: {
    //width: 'auto',
  },
});

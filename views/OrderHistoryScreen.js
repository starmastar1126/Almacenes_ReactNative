/* eslint-disable radix */
/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import CustomListview from '../components/CustomListview';
import Work_Template from '../components/templates';
import theme from '../theme/theme';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import Utils from '../utils/utils';

import {StyleSheet, View} from 'react-native';

class OrderHistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.state = {
      searchValue: '',
      userData: this.props.user_info.userdata,
      dataSource: [],
      searchResult: [],
      showLoading: true,
    };
    this.url =
      'https://mcflydelivery.com/mcflybackend/index.php/api/getOrderhistory_driver';
    this.arrayholder = [];
  }

  componentDidMount() {
    this.setState({showLoading: true});
    this.getData();
  }

  /* Return object for populate the list */
  getData() {
    let senddata = {
      userid: this.state.userData.id,
      usertype: this.state.userData.user_type,
    };
    Utils.post(this.url, senddata)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({dataSource: responseJson.orderdata, showLoading: false});
        this.arrayholder = responseJson.orderdata;
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateSearch = search => {
    this.setState({searchValue: search});

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.order_id.toUpperCase()}   
      ${item.customer_firstname.toUpperCase()}
      ${item.customer_lastname.toUpperCase()}
      ${item.shipping_addresslocation.toUpperCase()}
      ${item.order_time.toUpperCase()}
      ${item.warehouse_drivername.toUpperCase()}
      ${item.amount.toUpperCase()}
      ${Utils.getstatustitle(parseInt(item.status)).toUpperCase()}`;

      const searchData = search.toUpperCase();

      return itemData.indexOf(searchData) > -1;
    });

    this.setState({dataSource: newData});
  };

  getContentScreen() {
    return (
      <View style={styles.container}>
        {this.props.toggleSearch && (
          <SearchBar
            placeholder="Type Here..."
            lightTheme
            round
            onChangeText={this.updateSearch}
            value={this.state.searchValue}
            autoCorrect={false}
          />
        )}
        {Utils.getLoadingView(this.state.showLoading)}
        <CustomListview
          navigation={this.navigation}
          itemList={this.state.dataSource}
        />
      </View>
    );
  }

  render() {
    return (
      <Work_Template
        navigation={this.navigation}
        item={{
          title: 'Order History',
          content: this.getContentScreen(),
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: theme.screenWidth,
    height: theme.screenHeight - theme.screenHeight / 8,
    backgroundColor: '#FCFCFC',
  },
});

const mapStateToProps = state => {
  return {
    toggleSearch: state.searchBar,
    user_info: state.userinfo,
  };
};

export default connect(mapStateToProps)(OrderHistoryScreen);

import React from 'react';
import {StyleSheet, Dimensions, View, Image, ScrollView} from 'react-native';
import PublishSnapshot from '../../components/category/publishsnapshot';
import theme from '../../theme/theme';
import Work_Template from '../../components/templates';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import Utils from '../../utils/utils';

const screenWidth = Math.round(Dimensions.get('window').width);
const colwidth = (4 * screenWidth) / 9;
class Category extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.url = this.props.userinfo.url + 'getcategories/';
    this.image_url = this.props.userinfo.image_url + 'category/thumbnail/';
    this.state = {
      searchValue: '',
      userinfo: this.props.userinfo,
      categories: [],
      showLoading: false,
      all_height: 0,
      height_done: false,
      image_index: 0,
      image_width: 0,
      dataArray: [],
    };
    this.arrayholder = [];
  }

  componentWillMount() {
    this.setState({showLoading: true});
    this.getCategoriesFromServer();
  }
  updateSearch = search => {
    this.setState({searchValue: search});
  };

  getCategoriesFromServer() {
    Utils.get(this.url + '0', null)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({categories: responseJson.categories});
        this.setState({showLoading: false});
        this.arrayholder = responseJson.categories;
        this.getSnapScreen();
      })
      .catch(error => {
        Utils.showAlertWithOKButton('McFly', 'Network Error');
      });
  }

  updateSearch = search => {
    this.setState({searchValue: search});

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const searchData = search.toUpperCase();
      return itemData.indexOf(searchData) > -1;
    });
    this.setState({categories: newData});
  };

  getSnapScreen() {
    const datas = this.state.categories;
    Image.getSize(
      this.image_url + datas[this.state.image_index].image,
      (width, height) => {
        if (this.state.image_width === 0) {
          this.setState({image_width: width});
        }
        let tempHeight = height;
        // alert(tempHeight);
        if (tempHeight / this.state.image_width > 1.1) {
          tempHeight = 1.5 * colwidth;
        }
        datas[this.state.image_index].width = this.state.image_width;
        datas[this.state.image_index].height = tempHeight;

        this.state.dataArray.push(datas[this.state.image_index]);
        // this.setState({dataArray: tempArray});
        var temp_height = tempHeight + this.state.all_height;
        this.setState({all_height: temp_height});
        this.setState({image_index: this.state.image_index + 1});
        if (this.state.image_index === datas.length) {
          this.setState({height_done: true});
        } else {
          this.getSnapScreen();
        }
      },
      error => {
        console.log(error);
      },
    );
    // alert(tempArray.length);
    this.setState({dataArray: this.state.dataArray});
  }

  getContentWrap() {
    const items = this.state.categories;
    let ret = [];
    ret[0] = [];
    ret[1] = [];
    let ret_index = 0;
    let all_height = 0;
    for (var i = 0; i < items.length; i++) {
      let item = items[i];
      ret[ret_index].push(
        <PublishSnapshot
          navigation={this.navigation}
          item={{
            title: item.name,
            icon: this.image_url + item.image,
            page: 'Sub_Category',
            price: 0,
            length: colwidth,
            height: this.state.dataArray[i].height,
            bgcolor: 'item.bgcolor',
            // eslint-disable-next-line radix
            category_id: parseInt(item.category_id),
          }}
        />,
      );
      all_height += this.state.dataArray[i].height;
      // eslint-disable-next-line radix
      if (all_height > parseInt(this.state.all_height / 2)) {
        ret_index++;
        all_height = 0;
      }
    }
    return ret;
  }

  getContentScreen() {
    if (this.state.height_done) {
      // alert(this.state.all_height);
      //this.state.categories
      const wraps = this.getContentWrap();
      return (
        <View style={styles.container}>
          {Utils.getLoadingView(this.state.showLoading)}
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
          <View style={styles.snap_wrap}>
            <ScrollView
            // horizontal={true} contentContainerStyle={styles.snap_wrap_content}
            >
              {wraps[0]}
            </ScrollView>
            <ScrollView
            // horizontal={true} contentContainerStyle={styles.snap_wrap_content}
            >
              {wraps[1]}
            </ScrollView>
          </View>
        </View>
      );
    } else {
      return Utils.getLoadingView(true);
    }
  }
  render() {
    return (
      <Work_Template
        navigation={this.navigation}
        item={{
          title: 'Stock',
          content: this.getContentScreen(),
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: theme.screenWidth,
    height: theme.screenHeight - theme.screenHeight / 10,
    alignContent: 'center',
  },
  snap_wrap: {
    width: theme.screenWidth - (theme.screenWidth * 2) / 27,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    // backgroundColor: '#0000ff',
    height: theme.screenHeight - (theme.screenHeight * 1.4) / 10,
    alignContent: 'space-between',
  },
  snap_wrap_content: {
    width: (4 * screenWidth) / 9,
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: '#0000ff',
    height: theme.screenHeight - (theme.screenHeight * 1.4) / 10,
  },
});

const mapStateToProps = state => {
  return {toggleSearch: state.searchBar, userinfo: state.userinfo};
};

export default connect(mapStateToProps)(Category);

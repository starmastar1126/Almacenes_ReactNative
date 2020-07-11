/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Dimensions, FlatList, View} from 'react-native';
import PublishSnapshot from '../../components/category/subcategory_snap';
import SubcategoryButton from '../../components/category/subcategorybutton';
import Work_Template from '../../components/templates';
import theme from '../../theme/theme';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import Utils from '../../utils/utils';

const screenWidth = Math.round(Dimensions.get('window').width);

class Category extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.url = null;

    this.url =
      'https://mcflydelivery.com/mcflybackend/index.php/api/getcategories/' +
      this.navigation.getParam('category_id', null);
    this.productUrl =
      'https://mcflydelivery.com/mcflybackend/index.php/api/getallproducts/2/0/1';

    this.state = {
      dataSource: {},
      subcategoryLbl: {},
      subcategories: [],
      products: [],
      selectedOption: {},
      searchValue: '',
      selectedCategory: 0,
      isAllTapState: [],
      showLoading: true,
      buttonColors: [],
    };

    this.preAllTapState = [];
    this.arrayholder = [];
  }

  componentWillMount() {
    this.setState({showLoading: true});
    this.getSubcategoryFromServer();
    this.getProductsFromServer();
  }
  setAllSubCategoryState(length) {
    this.preAllTapState.push(true);
    for (var i = 0; i < length; i++) {
      this.preAllTapState.push(false);
    }
    this.setState({isAllTapState: this.preAllTapState});
  }

  getProductsFromServer() {
    Utils.get(this.productUrl, null)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({products: responseJson.products});
        this.setState({showLoading: false});
        this.arrayholder = responseJson.products;
      })
      .catch(error => {
        Utils.showAlertWithOKButton('McFly', 'Network Error');
        this.setState({showLoading: false});
      });
  }

  getSubcategoryFromServer() {
    Utils.get(this.url, null)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({subcategories: responseJson.categories});
        this.setAllSubCategoryState(this.state.subcategories.length);
        this.getButtonColors(this.state.subcategories.length + 1);
      })
      .catch(error => {
        Utils.showAlertWithOKButton('McFly', 'Network Error');
      });
  }

  getRandomColor() {
    var colorArray = [
      '42fc03',
      'ff0000',
      '03fcab',
      '0234fd',
      'f20db9',
      'f807a4',
      'e9fb04',
      '02fdfd',
      '03fc80',
      '16f955',
      'de21aa',
      'e96a16',
    ];
    var color = '#';
    var length = colorArray.length;
    var randomNum = Math.floor(Math.random() * length);

    color += colorArray[randomNum];
    return color;
  }

  getButtonColors(buttonCount) {
    if (this.state.buttonColors.length > 0) {
      return;
    }
    var ret = [];
    for (var i = 0; i < buttonCount; i++) {
      ret.push(this.getRandomColor());
    }
    this.setState({buttonColors: ret});
  }

  updateSearch = search => {
    this.setState({searchValue: search});
  };

  onBtnClickSubCategory = categoryID => {
    var subcateList = this.state.subcategories;

    if (!categoryID) {
      this.preAllTapState[0] = true;
    } else {
      this.preAllTapState[0] = false;
    }

    for (var i = 0; i < subcateList.length; i++) {
      if (subcateList[i].category_id === categoryID) {
        this.preAllTapState[i + 1] = true;
      } else {
        this.preAllTapState[i + 1] = false;
      }
    }
    this.setState({
      selectedCategory: categoryID,
      isAllTapState: this.preAllTapState,
    });
  };

  updateSearch = search => {
    this.setState({searchValue: search});

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.quantity.toUpperCase()}
                        ${item.product_price.toUpperCase()}
                        ${item.productname.toUpperCase()}`;

      const searchData = search.toUpperCase();

      return itemData.indexOf(searchData) > -1;
    });

    this.setState({products: newData});
  };
  getContentScreen() {
    var colwidth = (screenWidth / 10) * 3;
    var subcateList = this.state.subcategories;
    var ProductList = this.state.products;
    var subcategoryList = [{category_id: 0, name: 'All'}];
    var selectProductList = [];

    for (var i = 0; i < subcateList.length; i++) {
      subcategoryList.push(subcateList[i]);
    }
    for (var i = 0; i < ProductList.length; i++) {
      if (!this.state.selectedCategory) {
        selectProductList.push(ProductList[i]);
      } else {
        if (ProductList[i].subcategory_id === this.state.selectedCategory) {
          selectProductList.push(ProductList[i]);
        }
      }
    }
    var backcolor = 'white';
    return (
      <View>
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
        <View
          style={{
            backgroundColor: '#f1f1f1',
            elevation: 19,
            width: screenWidth,
            height: (screenWidth / 7) * 2,
          }}>
          <FlatList
            data={subcategoryList}
            renderItem={({item, index}) => (
              <SubcategoryButton
                selectSubCategory={this.onBtnClickSubCategory}
                navigation={this.navigation}
                backcolor={
                  this.state.buttonColors.length > 0
                    ? this.state.buttonColors[index]
                    : backcolor
                }
                item={{
                  text: item.name,
                  id: parseInt(item.category_id),
                  width: screenWidth / 4,
                  isTap: this.state.isAllTapState[index],
                }}
              />
            )}
            numColumns={4}
            keyExtractor={(item, index) => index}
          />
        </View>
        <View style={styles.container}>
          <FlatList
            data={selectProductList}
            renderItem={({item}) => (
              <PublishSnapshot
                navigation={this.navigation}
                item={{
                  title: item.productname,
                  icon:
                    'https://mcflydelivery.com/public/uploads/product/thumbnail/' +
                    item.productimage,
                  page: 'Product_Detail',
                  productID: item.productid,
                  price: item.product_price,
                  unit: parseInt(item.avail_qty),
                  length: colwidth,
                  bgcolor: item.bgcolor,
                }}
              />
            )}
            //Setting the number of column
            numColumns={3}
            keyExtractor={(item, index) => index}
          />
        </View>
      </View>
    );
  }
  render() {
    return (
      <Work_Template
        navigation={this.navigation}
        item={{
          title: 'Products',
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
    alignContent: 'center',
    marginTop: 30,
  },
});

const mapStateToProps = state => {
  return {toggleSearch: state.searchBar};
};

export default connect(mapStateToProps)(Category);

import React from 'react';
import {StyleSheet, Dimensions , FlatList, ImageBackground, View} from 'react-native';
import PublishSnapshot from "../../components/category/subcategory_snap";
import SubcategoryButton from "../../components/category/subcategorybutton";
import Work_Template from "../../components/templates";
import theme from "../../theme/theme";
import { SearchBar } from 'react-native-elements';
import { connect } from "react-redux";
import Utils from '../../utils/utils';

const screenWidth = Math.round(Dimensions.get('window').width);
const component1 = () => <Text>Hello</Text>
const component2 = () => <Text>World</Text>
const component3 = () => <Text>ButtonGroup</Text>

class Category extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.url = null; 
    
    this.url = "https://mcflydelivery.com/mcflybackend/index.php/api/getcategories/" + this.navigation.getParam('category_id', null);
    this.productUrl = "https://mcflydelivery.com/mcflybackend/index.php/api/getallproducts/2/0/1";
    
    
    this.state = {
      dataSource: {},
      subcategoryLbl: {},
      subcategories: [],
      products: [],
      selectedOption: {},
      searchValue: '',
      selectedCategory: 0,
    };
    this.getSubcategoryFromServer();
    this.getProductsFromServer();
  }

  componentDidMount() {
  }

  getProductsFromServer() {
    Utils.get(this.productUrl, null)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({products: responseJson.products});
      })
      .catch(error => {
        Utils.showAlertWithOKButton("McFly", "Network Error");
      })
  };

  getSubcategoryFromServer() {
    Utils.get(this.url, null)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({subcategories: responseJson.categories});
      })
      .catch(error => {
        Utils.showAlertWithOKButton("McFly", "Network Error");
      })
  };

  updateSearch = search => {
    this.setState({ searchValue: search });
  };

  onBtnClickSubCategory = (categoryID) => {
    this.setState({selectedCategory: categoryID});
  };

  getContentScreen(){
    var colwidth = screenWidth / 10 * 3;
    var subcateList = this.state.subcategories;
    var ProductList = this.state.products;
    var subcategoryList = [{category_id: 0, name: 'All'}];
    var selectProductList = [];
    const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]


    for (var i = 0; i < subcateList.length; i ++)
      subcategoryList.push(subcateList[i]);
    for (var i = 0; i < ProductList.length; i ++)      
    {
      if (!this.state.selectedCategory) {
        selectProductList.push(ProductList[i]);
      } else {
        if (ProductList[i].subcategory_id == this.state.selectedCategory)
          selectProductList.push(ProductList[i]);
      }
    }
 
    return <View>

            {this.props.toggleSearch && <SearchBar placeholder="Type Here..." onChangeText={this.updateSearch} value={this.state.searchValue}/>}
            <View style={{backgroundColor: "#f1f1f1", elevation: 19, width: screenWidth, height: screenWidth / 7 * 2}}>

              <FlatList
                data={subcategoryList}
                renderItem={({ item }) => (
                  <SubcategoryButton
                    selectSubCategory={this.onBtnClickSubCategory}
                    navigation={this.navigation}
                    item={{
                      text: item.name,
                      id:   item.category_id,
                      width: screenWidth / 4
                    }}
                  />
                )}
                numColumns={4}
              />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={selectProductList}
                    renderItem={({ item }) => (
                        <PublishSnapshot
                          navigation={this.navigation}
                          item={{
                              title: item.productname,
                              icon: "https://mcflydelivery.com/public/uploads/product/thumbnail/" + item.productimage,
                              page: item.product_description,
                              price: item.product_price,
                              unit: parseInt(item.quantity),
                              length: colwidth,
                              bgcolor: item.bgcolor,
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        />
                    )}
                    //Setting the number of column
                    numColumns={3}
                    keyExtractor={(item, index) => index}
                />
            </View>
          </View>
  }
  render() {
    return (
        <Work_Template 
          navigation={this.navigation}
          item={{
            title: "Products",
            content: this.getContentScreen()
          }}
        />
    );
  }
}

const styles = StyleSheet.create({
  container:{
    width: theme.screenWidth,
    height: theme.screenHeight,
    alignContent: "center",
    marginTop: 30,
  },
});

const mapStateToProps = state => {
  return { toggleSearch: state.searchBar };
};

export default connect(mapStateToProps)(Category);



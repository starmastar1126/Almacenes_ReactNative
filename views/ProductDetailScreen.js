import React, {Component} from 'react';
import {
  //   Platform,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from '../styles/SliderEntryStyle';
import SliderEntry from '../components/SliderEntry';
import styles from '../styles/indexStyle';
import Work_Template from '../components/templates';
import theme from '../theme/theme';
import Utils from '../utils/utils';
import Dialog from 'react-native-dialog';
import {connect} from 'react-redux';

// const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

class ProductDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      allImageUrl: [],
      product: [],
      userData: this.props.user_info.userdata,
      showLoading: true,
      editDialogVisible: false,
      quantity: 0,
      comment: '',
    };
    this.selectedID = this.navigation.getParam('productID', null);
    this.productUrl =
      'https://mcflydelivery.com/mcflybackend/index.php/api/getallproducts/2/0/1';
    this.editDetailUrl =
      'https://mcflydelivery.com/mcflybackend/index.php/api/sendProduct_qtychange_report';
  }

  componentDidMount() {
    this.getAllProducts();
  }

  getAllProducts() {
    Utils.get(this.productUrl, null)
      .then(response => response.json())
      .then(responseJson => {
        this.getAllProductImages(responseJson.products);
      })
      .catch(error => {
        Utils.showAlertWithOKButton('McFly', 'Network Error');
      });
  }

  getAllProductImages(dataSource) {
    var products = dataSource;
    var allUrls = [];
    console.log(this.selectedID);

    for (var p in products) {
      if (this.selectedID === dataSource[p].productid) {
        var productimage = {
          illustration:
            'https://mcflydelivery.com/public/uploads/product/thumbnail/' +
            dataSource[p].productimage,
        };
        //var cat_image = {illustration: "https://mcflydelivery.com/public/uploads/product/thumbnail/" + dataSource[p].cat_image};
        allUrls.push(productimage); //, cat_image);
        this.setState({product: dataSource[p]});
      }
    }

    this.setState({allImageUrl: allUrls, showLoading: false});
  }

  _renderItem({item, index}) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  _renderItemWithParallax({item, index}, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  productCarousel(number, title) {
    const {slider1ActiveSlide} = this.state;

    return (
      <View>
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={this.state.allImageUrl}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={false}
          loopClonesPerSide={2}
          autoplay={false}
          onSnapToItem={index => this.setState({slider1ActiveSlide: index})}
        />
        <Pagination
          dotsLength={this.state.allImageUrl.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(81, 141, 239, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={'rgba(10, 47, 107, 0.92)'}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    );
  }

  productDetail() {
    return (
      <View style={styles.detailContainer}>
        <View style={styles.detail_row}>
          <Text style={styles.detail_category}>{'Quantity'}</Text>
          <Text style={styles.detail_value}>
            {this.state.product.avail_qty}
          </Text>
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={this.editProdcutDetail}>
            <Icon
              name="edit"
              //backgroundColor="#3b5998"
              style={styles.detail_edit_icon}
              size={28}
              onPress={this.editProdcutDetail}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.detail_col}>
          <Text style={styles.detail_category}>
            {this.state.product.productname}
          </Text>
          <Text style={styles.detail_value}>
            {'$' + this.state.product.product_price}
          </Text>
        </View>
        <View style={styles.detail_col}>
          <Text style={styles.detail_category}>{'Specification'}</Text>
          <Text style={styles.detail_category}>
            {this.state.product.productname}
          </Text>
        </View>
      </View>
    );
  }

  editProdcutDetail = () => {
    this.setState({editDialogVisible: true});
  };

  handleCancel = () => {
    this.setState({editDialogVisible: false});
  };

  checkResponse(responseJson) {
    const {message} = responseJson;
    if (message === 'success') {
      this.getAllProducts();
      this.setState({editDialogVisible: false});
    } else {
      Utils.showAlertWithOKButton('McFly', message, null);
      this.setState({showLoading: false, editDialogVisible: false});
    }
  }

  handleSubmit = () => {
    this.setState({showLoading: true});
    let sendData = {
      userid: this.state.userData.id,
      warehouseid: this.state.userData.warehouse_id,
      comment: this.state.comment,
      productid: this.selectedID,
      prev_qty: this.state.product.avail_qty,
      changed_qty: this.state.quantity,
    };

    Utils.post(this.editDetailUrl, sendData)
      .then(response => response.json())
      .then(responseJson => {
        this.checkResponse(responseJson);
      })
      .catch(error => {
        console.log('error code: ' + error);
        Utils.showAlertWithOKButton('McFly', 'Network Error');
        this.setState({showLoading: false, editDialogVisible: false});
      });
  };

  //   customExample(number, title, refNumber, renderItemFunc) {
  //     const isEven = refNumber % 2 === 0;

  //     // Do not render examples on Android; because of the zIndex bug, they won't work as is
  //     return !IS_ANDROID ? (
  //       <View
  //         style={[
  //           styles.detailContainer,
  //           isEven ? styles.detailContainerDark : styles.detailContainerLight,
  //         ]}>
  //         <Text
  //           style={[
  //             styles.title,
  //             isEven ? {} : styles.titleDark,
  //           ]}>{`Product ${number}`}</Text>
  //         <Text style={[styles.subtitle, isEven ? {} : styles.titleDark]}>
  //           {title}
  //         </Text>
  //         <Carousel
  //           data={isEven ? ENTRIES : ENTRIES}
  //           renderItem={renderItemFunc}
  //           sliderWidth={sliderWidth}
  //           itemWidth={itemWidth}
  //           containerCustomStyle={styles.slider}
  //           contentContainerCustomStyle={styles.sliderContentContainer}
  //           scrollInterpolator={
  //             scrollInterpolators[`scrollInterpolator${refNumber}`]
  //           }
  //           slideInterpolatedStyle={animatedStyles[`animatedStyles${refNumber}`]}
  //           useScrollView={true}
  //         />
  //       </View>
  //     ) : (
  //       false
  //     );
  //   }

  getContentScreen() {
    const carousel = this.productCarousel(1, '');
    const detail = this.productDetail();

    return (
      <View style={local_styles.container}>
        {Utils.getLoadingView(this.state.showLoading)}
        <Dialog.Container visible={this.state.editDialogVisible}>
          <Dialog.Title>Edit quantity</Dialog.Title>
          <Dialog.Input
            borderRadius={10}
            borderWidth={1}
            bordercolor="rgba(50, 50, 50, 1)"
            defaultValue={this.state.product.avail_qty}
            placeholder="Add quantity"
            onChangeText={quantity => this.setState({quantity: quantity})}
          />
          <Dialog.Input
            borderRadius={10}
            hegiht={100}
            borderWidth={1}
            bordercolor="rgba(50, 50, 50, 1)"
            placeholder="Add comment"
            onChangeText={comment => this.setState({comment: comment})}
          />
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Submit" onPress={this.handleSubmit} />
        </Dialog.Container>
        <ScrollView
          style={styles.scrollview}
          scrollEventThrottle={200}
          directionalLockEnabled={true}>
          {carousel}
          {detail}
        </ScrollView>
      </View>
    );
  }

  render() {
    return (
      <Work_Template
        navigation={this.navigation}
        item={{
          title: 'Product Detail',
          content: this.getContentScreen(),
        }}
      />
    );
  }
}

const local_styles = StyleSheet.create({
  container: {
    width: theme.screenWidth,
    height: theme.screenHeight,
    backgroundColor: '#FCFCFC',
  },
});

const mapStateToProps = state => {
  return {
    user_info: state.userinfo,
  };
};

export default connect(mapStateToProps)(ProductDetailScreen);

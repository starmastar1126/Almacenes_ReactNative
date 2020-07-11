/**
 * @author sunearth.dolpin@outlook.com
 * @version 0.0.1
 */

import {createAppContainer, createStackNavigator} from 'react-navigation';
import LoginScreen from '../views/login';
import ForgetPasswordScreen from '../views/login/forget';
import DashboardScreen from '../views/dashboard';
import OrderScreen from '../views/order';
import CategeryScreen from '../views/stock';
import SubCategoryScreen from '../views/stock/subcategory';
import OrderHistoryScreen from '../views/OrderHistoryScreen';
import ProductDetailScreen from '../views/ProductDetailScreen';
import TipScreen from '../views/TipScreen';
import WorkTimeScreen from '../views/WorkTimeScreen';

const RootStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    ForgetPassword: {
      screen: ForgetPasswordScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },

    Dashboard: {
      screen: DashboardScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Order: {
      screen: OrderScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Category: {
      screen: CategeryScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Sub_Category: {
      screen: SubCategoryScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Order_History: {
      screen: OrderHistoryScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Product_Detail: {
      screen: ProductDetailScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Tips: {
      screen: TipScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Working_Time: {
      screen: WorkTimeScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
  },
  {
    initialRouteName: 'Login',
  },
);

const Page = createAppContainer(RootStack);
export default Page;

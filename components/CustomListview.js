/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import CustomRow from './CustomRow';
import Utils from '../utils/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const CustomListview = ({navigation, itemList}) => (
  <View style={styles.container}>
    <FlatList
      key
      style={{flex: 1}}
      data={itemList}
      renderItem={({item}) => (
        <CustomRow
          title={item.order_id}
          order_date={Utils.splitString(item.order_time)[0]}
          order_time={Utils.splitString(item.order_time)[1]}
          client_name={item.customer_firstname + ' ' + item.customer_lastname}
          address={item.shipping_addresslocation}
          cash={item.amount}
          driver_name={item.warehouse_drivername}
          order_state={item.status}
          item={item}
          navigation={navigation}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
);

export default CustomListview;

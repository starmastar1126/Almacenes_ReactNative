/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable radix */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../theme/theme';
import Utils from '../utils/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    elevation: 19,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    shadowOpacity: 0.25,
  },
  order_content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  order_footer: {
    borderRadius: 10,
    marginLeft: 12,
    width: (theme.screenWidth * 2) / 3,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  order_left: {
    width: (theme.screenWidth * 1) / 2,
    flexDirection: 'column',
    marginLeft: 12,
  },
  order_right: {
    flexDirection: 'column',
  },
  order_datetime: {},
  order_date: {
    fontSize: 13,
    color: 'rgba(88, 88, 88, 1)',
    textAlign: 'right',
    marginTop: 7,
    marginBottom: 5,
  },
  order_time: {
    fontSize: 11,
    color: 'rgba(88, 88, 88, 1)',
    textAlign: 'right',
  },
  order_header: {},
  order_title: {
    fontSize: 14,
    color: 'rgba(88, 88, 88, 1)',
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 7,
    marginBottom: 5,
  },
  order_address_row: {
    flexDirection: 'row',
  },
  order_address_row_key: {
    width: 60,
  },
  order_address_content: {},
  order_payment_row: {
    flexDirection: 'row',
  },
  order_payment_row_key: {
    width: 60,
  },
  order_payment_content: {},
  order_state: {
    marginLeft: 12,
    flexDirection: 'row',
    flex: 1,
  },
  text_common: {
    fontSize: 11,
    color: 'rgba(88, 88, 88, 1)',
    textAlign: 'left',
    marginBottom: 4,
  },
  text_cyan: {
    fontSize: 13,
    color: 'rgba(15, 191, 210, 1)',
    fontWeight: 'bold',
    marginTop: 3,
    marginBottom: 5,
  },
  text_green: {
    fontSize: 13,
    color: '#00ff00',
    fontWeight: 'bold',
    marginTop: 3,
    marginBottom: 5,
  },
  text_blue: {
    fontSize: 13,
    color: '#0000ff',
    fontWeight: 'bold',
    marginTop: 3,
    marginBottom: 5,
  },
  text_red: {
    fontSize: 13,
    color: '#ff0000',
    fontWeight: 'bold',
    marginTop: 3,
    marginBottom: 5,
  },
  text_white: {
    fontSize: 14,
    textAlign: 'center',
    margin: 7,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  view_map: {
    backgroundColor: '#518def',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    height: 30,
    flex: 1,
    flexDirection: 'row',
  },
});

function onRow(item, navigation) {
  navigation.navigate('Order', {item: item});
}

function onViewMap(item, navigation) {
  navigation.navigate('View_Map', {item: item});
}

const CustomRow = ({
  title,
  order_date,
  order_time,
  client_name,
  address,
  cash,
  driver_name,
  order_state,
  item,
  navigation,
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => onRow(item, navigation)}>
    {/* <Image source={{ uri: image_url }} style={styles.photo} /> */}
    <View style={styles.order_content}>
      <View style={styles.order_left}>
        <View style={styles.order_header}>
          <Text style={styles.order_title}>{'Orden ' + title}</Text>
        </View>
        <View style={styles.order_address_row}>
          <View style={styles.order_address_row_key}>
            <Text style={styles.text_common}>{'Client: '}</Text>
          </View>
          <View style={styles.order_address_content}>
            <Text style={styles.text_common}>{client_name}</Text>
          </View>
        </View>
        <View style={styles.order_address_row}>
          <View style={styles.order_address_row_key}>
            <Text style={styles.text_common}>{'Dirección: '}</Text>
          </View>
          <View style={styles.order_address_content}>
            <Text style={styles.text_common}>{address}</Text>
          </View>
        </View>
        <View style={styles.order_payment_row}>
          <View style={styles.order_payment_row_key}>
            <Text style={styles.text_common}>{'Precio: '}</Text>
          </View>
          <View style={styles.order_payment_content}>
            <Text style={styles.text_common}>{'$' + cash}</Text>
          </View>
        </View>
        <View style={styles.order_address_row}>
          <View style={styles.order_address_row_key}>
            <Text style={styles.text_common}>{'Driver: '}</Text>
          </View>
          <View style={styles.order_address_content}>
            <Text style={styles.text_common}>{driver_name}</Text>
          </View>
        </View>
      </View>
      <View style={styles.order_right}>
        <View style={styles.order_datetime}>
          <Text style={styles.order_date}>{order_date}</Text>
          <Text style={styles.order_time}>{order_time}</Text>
        </View>
      </View>
    </View>
    <View style={styles.order_state}>
      <Text style={{color: Utils.getstatuscolor(parseInt(order_state))}}>
        {Utils.getstatustitle(parseInt(order_state))}
      </Text>
    </View>
    <View style={styles.order_footer}>
      {(order_state === 3 || order_state === 4) && (
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => {
            onViewMap(item, navigation);
          }}>
          <LinearGradient
            colors={['#2aace3', '#1d759b']}
            style={styles.button_content}
            start={{
              x: 0.1,
              y: 0.1,
            }}
            end={{x: 0.9, y: 0.9}}
            style={{borderRadius: 15}}>
            <Text style={styles.text_white}>View on Map</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  </TouchableOpacity>
);

export default CustomRow;

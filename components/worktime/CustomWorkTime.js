import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 15,
      height: 15,
    },
    width: (Dimensions.get('window').width * 90) / 100,
    height: Dimensions.get('window').height / 3.5,
    shadowRadius: 8,
    shadowOpacity: 1.0,
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: 'rgba(25, 25, 25, 1)',
    textAlign: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
  descripe: {
    flex: 1,
    fontSize: 11,
    color: 'rgba(123, 123, 123, 1)',
    textAlign: 'center',
    justifyContent: 'center',
  },
  order_date: {
    fontSize: 13,
    color: '#7f7f7f',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  container_text: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
  },
  header_text: {
    flexDirection: 'column',
    marginBottom: 15,
    justifyContent: 'center',
  },
  view_time: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(111, 111, 111, 1)',
    borderRadius: 15,
    borderWidth: 1,
    // shadowColor: 'rgba(0, 0, 0, .4)', // IOS
    // shadowOffset: { height: 1, width: 1 }, // IOS
    // shadowOpacity: 1, // IOS
    // shadowRadius: 1, //IOS
    // elevation: 2, // Android
    height: 40,
    //width: theme.screenWidth * 65 / 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
  },

  time: {
    fontSize: 14,
    color: 'rgba(70,70,70,1)',
    textAlign: 'center',
  },
  clock_icon: {
    color: 'rgba(177, 177, 177, 1)',
    marginLeft: 10,
  },
});

const CustomWorkTime = ({category, time}) => (
  <View style={styles.container}>
    {category === 'start' && <Text style={styles.title}>Starting From</Text>}
    {category === 'start' && (
      <Text style={styles.descripe}>SPECIFY THE TIME AT WHICH WORK STARTS</Text>
    )}
    {category === 'start' && (
      // <TouchableOpacity activeOpacity={.6} onPress = {() => {}}>
      <View style={styles.view_time}>
        <Icon name="clock-o" style={styles.clock_icon} size={18} />
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.time} />
      </View>
    )}
    {/* </TouchableOpacity> */}

    {category === 'end' && <Text style={styles.title}>Finishing At</Text>}
    {category === 'end' && (
      <Text style={styles.descripe}>
        SPECIFY THE TIME AT WHICH WORK FINISHES
      </Text>
    )}
    {category === 'end' && (
      <View style={styles.view_time}>
        {/* <TouchableOpacity activeOpacity={.6} onPress = {() => {}}> */}

        <Icon name="clock-o" style={styles.clock_icon} size={18} />
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.time} />
      </View>
    )}
    {/* </TouchableOpacity> */}
  </View>
);

export default CustomWorkTime;

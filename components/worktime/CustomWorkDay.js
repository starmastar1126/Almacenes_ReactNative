/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CustomWorkTime from './CustomWorkTime';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../theme/theme';

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
  slide: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FCFCFC',
  },
  worktime_footer: {
    borderRadius: 10,
    marginLeft: 12,
    width: (theme.screenWidth * 2) / 3,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: theme.screenHeight / 10,
  },
  white: {
    color: '#ffffff',
    fontSize: 15,
    textAlign: 'center',
    margin: 8,
  },
});

export default class CustomWorkDay extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showFromTimePicker = () => {
    this.props.showFromTimePicker();
  };

  showToTimePicker = () => {
    this.props.showToTimePicker();
  };

  onPressConfirm = () => {
    this.props.confirm();
  };

  getContentScreen() {
    let weekday = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    let d = new Date();
    let day = d.getDay();

    return (
      <View style={styles.slide}>
        <View style={{marginTop: 15, marginBottom: 15}}>
          <Text style={styles.weekday}>{weekday[this.props.weekday]}</Text>
        </View>
        {day === this.props.weekday && day !== 0 && (
          <View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.showFromTimePicker}>
              <CustomWorkTime category={'start'} time={this.props.fromTime} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={this.showToTimePicker}>
              <CustomWorkTime category={'end'} time={this.props.toTime} />
            </TouchableOpacity>
            <View style={styles.worktime_footer}>
              <TouchableOpacity
                activeOpacity={0.4}
                onPress={this.onPressConfirm}>
                <LinearGradient
                  colors={['#2aace3', '#1d759b']}
                  style={styles.button_content}
                  start={{
                    x: 0.1,
                    y: 0.1,
                  }}
                  end={{x: 0.9, y: 0.9}}
                  style={{borderRadius: 15}}>
                  <Text style={styles.white}>Confirm</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {day !== this.props.weekday && (
          <View>
            <CustomWorkTime category={'start'} time={this.props.fromTime} />
            <CustomWorkTime category={'end'} time={this.props.toTime} />
          </View>
        )}
      </View>
    );
  }

  render() {
    return this.getContentScreen();
  }
}

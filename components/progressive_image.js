import React, {Component} from 'react';
import {Animated, View} from 'react-native';

export default class ProgressiveImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
    };
  }
  onLoad() {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 250,
    }).start();
  }
  render() {
    return (
      <View
        width={this.props.style.width}
        height={this.props.style.height}
        backgroundColor={'#ffffff'}>
        <Animated.Image
          resizeMode={'contain'}
          key={this.props.key}
          style={[
            {
              opacity: this.state.opacity,
            },
            this.props.style,
          ]}
          source={this.props.source}
          onLoad={event => this.onLoad(event)}
        />
      </View>
    );
  }
}

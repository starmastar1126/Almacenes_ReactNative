import React, {Component} from 'react';
import {View, Image} from 'react-native';
import PropTypes from 'prop-types';
import {ParallaxImage} from 'react-native-snap-carousel';
import styles from '../styles/SliderEntryStyle';

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };

  get image() {
    const {
      data: {illustration},
      parallax,
      parallaxProps,
      even,
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{uri: illustration}}
        containerStyle={[
          styles.imageContainer,
          even ? styles.imageContainerEven : {},
        ]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image
        defaultSource={require('../assets/pre_image_loading.png')}
        source={{uri: illustration}}
        style={styles.image}
      />
    );
  }

  render() {
    const {even} = this.props;

    return (
      <View
        activeOpacity={1}
        style={styles.slideInnerContainer}
        //onPress={() => { alert(`You've clicked '${title}'`); }}
      >
        {/* <View style={styles.shadow} /> */}
        <View
          style={[
            styles.imageContainer,
            even ? styles.imageContainerEven : {},
          ]}>
          {this.image}
          {/* <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} /> */}
        </View>
        {/* <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    { uppercaseTitle }
                    <Text
                      style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                      numberOfLines={2}
                    >
                        { subtitle }
                    </Text>
                </View> */}
      </View>
    );
  }
}

/**
 * @author Lyuba, sunearth.dolpin@outlook.com
 * @version 0.0.1
 */
import React, { Component } from "react";
import { View, Text } from "react-native";
import Class_Header from "./class_header";
import PropTypes from "prop-types";

export default class Work_Template extends Component {
  static propTypes = {
    
    item: PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.object
    })
  };
  static defaultProps = {
    item: {
      title: "Class Routine",
      content: "Content"
    }
  };
  
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
  }

  render() {
    const { item } = this.props;
    return (
        <View>
            <Class_Header navigation={this.navigation} item={{title: item.title}} />
            <View>{item.content}</View>
            
        </View>
    );
  }
  
  }


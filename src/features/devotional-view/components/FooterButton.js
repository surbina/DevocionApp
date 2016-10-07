import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity 
} from 'react-native';
import {
  Icon,
  Text
} from 'native-base';
import shallowCompare from 'react-addons-shallow-compare';
class FooterButton extends Component {
  constructor(props) {
    super(props);

    this.handleButtonPress = this._handleButtonPress.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _handleButtonPress() {
    this.props.onPress();
  }

  render() {
    return(
      <TouchableOpacity
        style={styles.container}
        onPress={this.handleButtonPress}>
        <Icon name={this.props.iconName} />
        <Text style={styles.text}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {

  },
  text: {
    fontWeight: 'bold'
  }
});

export default FooterButton;
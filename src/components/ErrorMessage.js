import React, { Component } from 'react';

import {
  View,
  StyleSheet
} from 'react-native';
import {
  Text
} from 'native-base';

class ErrorMessage extends Component {
  render() {
    return(
      this.props.showMessage && !!this.props.children ?
        <Text style={styles.text}>{this.props.children}</Text> :
        false
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'red',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 5
  }
});

export default ErrorMessage;
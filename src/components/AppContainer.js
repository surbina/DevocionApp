import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={styles.container}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});

export default AppContainer;
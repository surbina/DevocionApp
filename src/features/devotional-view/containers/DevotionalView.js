import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import Drawer from '../../../components/drawer/Drawer.js'

class DevotionalView extends Component {
  render() {
    return (
      <Drawer navigator={this.props.navigator}>
        <View>
          <Text>
            DevotionalView!
          </Text>
        </View>
      </Drawer>
    );
  }
}

export default DevotionalView;

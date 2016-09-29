import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import shallowCompare from 'react-addons-shallow-compare';

import { DrawerContainer } from '../../../components/drawer/Drawer.js'

class DevotionalNotFound extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  
  render() {
    return (
      <DrawerContainer navigator={this.props.navigator}>
        <View>
          <Text>
            No hemos encontrado un devocional para esa fecha.
          </Text>
        </View>
      </DrawerContainer>
    );
  }
}

export default DevotionalNotFound;

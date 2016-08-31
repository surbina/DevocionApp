import React, { Component } from 'react';
import {
  DrawerLayoutAndroid,
  Text,
  View
} from 'react-native';

import DrawerMenu from './DrawerMenu.js'

class Drawer extends Component {
  prueba() {
    return 'esto es una prueba';
  }

  _renderDrawerMenu() {
    return <DrawerMenu navigator={this.props.navigator} />;
  }

  render() {

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this._renderDrawerMenu.bind(this)}>
        
      { this.props.children }

      </DrawerLayoutAndroid>
    );
  }
}

export default Drawer;

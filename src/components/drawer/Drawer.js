import React, { Component } from 'react';
import {
  DrawerLayoutAndroid,
  Text,
  View
} from 'react-native';
import shallowCompare from 'react-addons-shallow-compare';

import { DrawerMenuContainer } from './DrawerMenu.js'

class Drawer extends Component {
  constructor(props) {
    super(props);

    this.renderDrawerMenu = this._renderDrawerMenu.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  _renderDrawerMenu() {
    return <DrawerMenuContainer navigator={this.props.navigator} />;
  }

  render() {

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={this.renderDrawerMenu}>
        
      { this.props.children }

      </DrawerLayoutAndroid>
    );
  }
}

export default Drawer;

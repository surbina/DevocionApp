import React, { Component } from 'react';
import {
  DrawerLayoutAndroid,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Drawer from '../../../components/drawer/Drawer.js';
import Navigation from '../../../Navigation.js';

class DevocionApp extends Component {
  render() {
    return (
      <Navigation />
    );
  }
}

export default DevocionApp;

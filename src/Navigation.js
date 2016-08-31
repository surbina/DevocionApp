import React, { Component } from 'react';

import {
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

import CalendarView from './features/calendar-view/containers/CalendarView.js';
import DevotionalView from './features/devotional-view/containers/DevotionalView.js';

class Navigation extends Component {
  _renderScene(route, navigator) {
    switch(route.index) {
      case 0:
        return <CalendarView navigator={navigator} />;
      case 1:
        return <DevotionalView navigator={navigator} />;
      default:
        return <DevotionalView navigator={navigator} />;
    }
  }

  render() {
    const routes = [
      {title: 'Calendar View', index: 0},
      {title: 'Devotional View', index: 1},
    ];

    return (
      <Navigator
        initialRoute={routes[1]}
        renderScene={this._renderScene}
      />
    );
  }
}

export default Navigation;
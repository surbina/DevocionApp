import React, { Component } from 'react';

import {
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

import CalendarView from './features/calendar-view/containers/CalendarView.js';
import { DevotionalViewContainer } from './features/devotional-view/containers/DevotionalView.js';

export const DEVOTIONAL_VIEW_ROUTE_INDEX = 'DEVOTIONAL_VIEW';
export const CALENDAR_VIEW_ROUTE_INDEX = 'CALENDAR_VIEW';

class Navigation extends Component {
  _renderScene(route, navigator) {
    switch(route.index) {
      case CALENDAR_VIEW_ROUTE_INDEX:
        return <CalendarView navigator={navigator} />;
      case DEVOTIONAL_VIEW_ROUTE_INDEX:
      default:
        return <DevotionalViewContainer navigator={navigator}  params={route.params} />;
    }
  }

  render() {
    const initialRoute = {
      index: DEVOTIONAL_VIEW_ROUTE_INDEX,
      params: {}
    };

    return (
      <Navigator
        initialRoute={initialRoute}
        renderScene={this._renderScene}
      />
    );
  }
}

export default Navigation;
import React, { Component } from 'react';

import {
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

import CalendarView from './features/calendar-view/containers/CalendarView.js';
import { DevotionalViewContainer } from './features/devotional-view/containers/DevotionalView.js';
import { SignInContainer } from './features/auth/containers/SignIn.js';
import { SplashScreenViewContainer } from './features/splash-screen-view/containers/SplashScreenView.js';

export const SPLASH_SCREEN_VIEW_ROUTE_INDEX = 'SPLASH_SCREEN_VIEW';
export const DEVOTIONAL_VIEW_ROUTE_INDEX = 'DEVOTIONAL_VIEW';
export const CALENDAR_VIEW_ROUTE_INDEX = 'CALENDAR_VIEW';
export const SIGN_IN_ROUTE_INDEX = 'SIGN_IN';

class Navigation extends Component {
  _renderScene(route, navigator) {
    switch(route.index) {
      case SPLASH_SCREEN_VIEW_ROUTE_INDEX:
        return <SplashScreenViewContainer navigator={navigator} />;
      case CALENDAR_VIEW_ROUTE_INDEX:
        return <CalendarView navigator={navigator} />;
      case SIGN_IN_ROUTE_INDEX:
        return <SignInContainer navigator={navigator} params={route.params} />;
      case DEVOTIONAL_VIEW_ROUTE_INDEX:
      default:
        return <DevotionalViewContainer navigator={navigator}  params={route.params} />;
    }
  }

  render() {
    const initialRoute = {
      index: SPLASH_SCREEN_VIEW_ROUTE_INDEX,
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
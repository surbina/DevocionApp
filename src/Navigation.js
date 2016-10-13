import React, { Component } from 'react';

import {
  Text,
  View,
  Navigator,
  TouchableHighlight,
  BackAndroid
} from 'react-native';

import DevotionalNotFoundView from './features/devotional-not-found-view/containers/DevotionalNotFoundView.js';
import { DevotionalViewContainer } from './features/devotional-view/containers/DevotionalView.js';
import { CommentViewContainer } from './features/comment-view/containers/CommentView.js';
import { SignInContainer } from './features/auth/containers/SignIn.js';
import { SignUpContainer } from './features/auth/containers/SignUp.js';
import { ResetPasswordContainer } from './features/auth/containers/ResetPassword.js';
import { SplashScreenViewContainer } from './features/splash-screen-view/containers/SplashScreenView.js';

export const SPLASH_SCREEN_VIEW_ROUTE_INDEX = 'SPLASH_SCREEN_VIEW';
export const DEVOTIONAL_VIEW_ROUTE_INDEX = 'DEVOTIONAL_VIEW';
export const COMMENT_VIEW_ROUTE_INDEX = 'COMMENT_VIEW';
export const DEVOTIONAL_NOT_FOUND_VIEW_ROUTE_INDEX = 'DEVOTIONAL_NOT_FOUND_VIEW';
export const SIGN_IN_ROUTE_INDEX = 'SIGN_IN';
export const SIGN_UP_ROUTE_INDEX = 'SIGN_UP';
export const RESET_PASSWORD_ROUTE_INDEX = 'RESET_PASSWORD';

class Navigation extends Component {
  constructor(props) {
    super(props);

    BackAndroid.addEventListener('hardwareBackPress', this._handleHardwareBackPress.bind(this));
  }

  _handleHardwareBackPress() {
    if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
      this.navigator.pop();
      return true;
    }
    return false;
  }

  _renderScene(route, navigator) {
    switch(route.index) {
      case SPLASH_SCREEN_VIEW_ROUTE_INDEX:
        return <SplashScreenViewContainer navigator={navigator} />;
      case DEVOTIONAL_NOT_FOUND_VIEW_ROUTE_INDEX:
        return <DevotionalNotFoundView navigator={navigator} />;
      case COMMENT_VIEW_ROUTE_INDEX:
        return <CommentViewContainer navigator={navigator} />;
      case SIGN_IN_ROUTE_INDEX:
        return <SignInContainer navigator={navigator} params={route.params} />;
      case SIGN_UP_ROUTE_INDEX:
        return <SignUpContainer navigator={navigator} params={route.params} />;
      case RESET_PASSWORD_ROUTE_INDEX:
        return <ResetPasswordContainer navigator={navigator} />;
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
        ref={(nav) => { this.navigator = nav; }}
        initialRoute={initialRoute}
        renderScene={this._renderScene}
      />
    );
  }
}

export default Navigation;
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Text,
  View
} from 'react-native';

import { DEVOTIONAL_VIEW_ROUTE_INDEX } from '../../../Navigation.js';
import { retrieveCurrentUserAction } from '../../../reducers/user/actions.js';

class SplashScreenView extends Component {
  constructor(props) {
    super(props);
    this.onLoaded = this._onLoaded.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(retrieveCurrentUserAction(this.onLoaded));
  }

  _onLoaded() {
    const item = {
      index: DEVOTIONAL_VIEW_ROUTE_INDEX
    };
    this.props.navigator.replaceAtIndex(item, 0);
  }

  render() {

    return (
      <View>
        <Text>Bienvenido a DevocionApp</Text>
        <Text>Cargando ...</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export const SplashScreenViewContainer = connect(mapStateToProps)(SplashScreenView);

export default SplashScreenView;

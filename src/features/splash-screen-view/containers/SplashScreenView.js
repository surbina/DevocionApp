import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Text,
  Spinner
} from 'native-base';
import shallowCompare from 'react-addons-shallow-compare';

import { DEVOTIONAL_VIEW_ROUTE_INDEX } from '../../../Navigation.js';
import { retrieveCurrentUserAction } from '../../../reducers/user/actions.js';

class SplashScreenView extends Component {
  constructor(props) {
    super(props);
    this.onLoaded = this._onLoaded.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
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
    <Container> 
      <Content contentContainerStyle={contentContainerStyle}>
        <Text>Bienvenido a DevocionApp</Text>
        <Spinner color='blue' />
      </Content>
    </Container>
    );
  }
}

const contentContainerStyle = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

function mapStateToProps(state) {
  return {};
}

export const SplashScreenViewContainer = connect(mapStateToProps)(SplashScreenView);

export default SplashScreenView;
